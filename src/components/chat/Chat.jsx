import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import { useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStor";
import upload from "../../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [open, setopen] = useState(false);
  const [Text, setText] = useState("");
  const [image, setImage] = useState({
    file: null,
    URL: "",
  });

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        URL: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const endRef = useRef(null);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const { currentUser } = useUserStore();
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chat);
  const handleEmoji = (event) => {
    setText((prev) => prev + event.emoji);
    setopen(false);
  };

  const handleSend = async () => {
    if (Text === "") return;
    let imgUrl = null;
    try {
      if (image.file) {
        imgUrl = await upload(image.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          Text,
          createdAt: new Date(),
          senderId: currentUser.id,
          ...(imgUrl && { image: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (chat) => chat.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = Text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    setImage({
      file: null,
      URL: "",
    });
    setText("");
  };
  return (
    <>
      <div className="chat">
        <div className="top">
          <div className="user">
            <img src={user?.avatar || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{user?.username}</span>
              <p>Lorem ipsum dolor sit amet consectetur .</p>
            </div>
          </div>
          <div className="icons">
            <img src="./phone.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./info.png" alt="" />
          </div>
        </div>
        <div className="center">
          {chat?.messages?.map((message) => (
            <div
              className={
                message?.senderId === currentUser?.id
                  ? "message own"
                  : "message"
              }
              key={message.createdAt}
            >
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p>{message.Text}</p>
                <span>1 min ago</span>
              </div>
            </div>
          ))}
          {image.URL && (
            <div className="message own">
              <div className="texts">
                <img src={image.URL} alt="" />
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>

        <div className="bottom">
          <div className="icons">
            <label htmlFor="file">
              <img src="./img.png" alt="" />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImage}
            />
            <img src="./camera.png" alt="" />
            <img src="./mic.png" alt="" />
          </div>
          <input
            value={Text}
            type="text"
            placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message" : "Type a message..."}
            onChange={(e) => setText(e.target.value)}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
          <div className="emoji">
            <img
              src="./emoji.png"
              alt=""
              onClick={() => setopen((prev) => !prev)}
            />
            <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked} >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
export default Chat;
