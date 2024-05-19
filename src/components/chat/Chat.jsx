import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStor";

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [open, setopen] = useState(false);
  const [Text, setText] = useState("");
  const [image, setImage] = useState("");

  const endRef = useRef(null);
  const { chatId, user } = useChatStore();
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

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          Text,
          createdAt: new Date(),
          senderId: currentUser.id,
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
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id? true: false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="chat">
        <div className="top">
          <div className="user">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <span>Jhone Dhoe</span>
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
          {chat?.messages?.map((message) => <div className="message own" key={message.createdAt}>
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p>{message.Text}</p>
                <span>1 min ago</span>
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>

        <div className="bottom">
          <div className="icons">
            <img src="./img.png" alt="" />
            <img src="./camera.png" alt="" />
            <img src="./mic.png" alt="" />
          </div>
          <input
            value={Text}
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setText(e.target.value)}
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
          <button className="sendButton" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};
export default Chat;
