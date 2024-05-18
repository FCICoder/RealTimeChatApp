import { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "../../../lib/userStor";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const {currentUser } = useUserStore();
  useEffect(()=>{
    const unSub = onSnapshot (doc(db, "userchats" , currentUser.id),async (res)=>{
      const items =  res.data().chats;
      const promisses =items.map( async (item) => {
        const userDocRef = doc(db, "users", item.receverId)
        const userDocSnap = await getDoc(userDocRef);
        
        const user = userDocSnap.data();

        return {...item, user}
      })
      const chatData = await Promise.all(promisses);
      setChats(chatData.sort( (a , b)=> b.updatedAt - a.updatedAt ));
    });

    return ()=>{
      unSub();
    }
  },[currentUser.id])

  return (
    <>
      <div className="ChatList">
        <div className="search">
          <div className="searchBar">
            <img src="/search.png" alt="" />
            <input type="text" placeholder="Search" />
          </div>
          <img
            src={addMode ? "./minus.png" : "./plus.png"}
            alt=""
            className="add"
            onClick={() => setAddMode((prev) => !prev)}
          />
        </div>

        {chats.map((chats, index) =><>
          <div className="item" key={index} >
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>John Doe</span>
            <p>{chats.lastMessage}</p>
          </div>
        </div>

        </>
        )}
        
        {addMode &&  <AddUser />}        
      </div>
    </>
  );
};

export default ChatList;
