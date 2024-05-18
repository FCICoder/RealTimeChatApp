import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [open, setopen] = useState(false);
  const [Text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats" , "85VNNfexa8RB2x3XKJ2t") , (res) => {
      setChat(res.data())
    })
    return () => {
      unSub();
    }
  }, []);
  console.log(chat);
  const handleEmoji = (event) => {
    setText((prev) => prev + event.emoji);
    setopen(false);
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
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                modi veritatis similique minus rerum.
              </p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message own">
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                modi veritatis similique minus rerum.
              </p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                modi veritatis similique minus rerum.
              </p>
              <span>1 min ago</span>
            </div>
          </div>

          <div className="message own">
            <div className="texts">
              <img
                src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                modi veritatis similique minus rerum.
              </p>
              <span>1 min ago</span>
            </div>
          </div>
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
          <button className="sendButton">Send</button>
        </div>
      </div>
    </>
  );
};
export default Chat;
