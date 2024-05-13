import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import { useState } from "react";

const Chat = () => {
  const [open, setopen] = useState(false);
  const [Text, setText] = useState("");

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
              <img src="data:image/jpeg;base64,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" alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                modi veritatis similique minus rerum.
              </p>
              <span>1 min ago</span>
            </div>
          </div>
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
