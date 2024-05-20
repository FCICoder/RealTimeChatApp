import { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "../../../lib/userStor";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input , setInput ] = useState("")
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats;
        const promisses = items?.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap?.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promisses);
        setChats(chatData?.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
      console.log(chats);
    } catch (err) {
      console.log(err);
    }
  
  };

  const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase())) 

  return (
    <>
      <div className="ChatList">
        <div className="search">
          <div className="searchBar">
            <img src="/search.png" alt="" />
            <input type="text" placeholder="Search" onChange={(e)=> setInput(e.target.value)}  />
          </div>
          <img
            src={addMode ? "./minus.png" : "./plus.png"}
            alt=""
            className="add"
            onClick={() => setAddMode((prev) => !prev)}
          />
        </div>

        {filteredChats?.map((chats) => (
          <div
            className="item"
            key={chats.chatId}
            onClick={() => handleSelect(chats)}
            style={{
              backgroundColor: chats?.isSeen ? "transparent" : "#5183fe",
            }}
          >
            <img src={chats.user.blocked.includes(currentUser?.id)?"./avatar.png" :  chats.user.avatar || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{chats.user.blocked.includes(currentUser?.id) ? "User" : chats.user.username}</span>
              <p>{chats.lastMessage}</p>
            </div>
          </div>
        ))}

        {addMode && <AddUser />}
      </div>
    </>
  );
};

export default ChatList;
