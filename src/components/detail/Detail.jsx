import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStor";
import style from "./Detail.module.css";
const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={`${style.detail}`}>
        <div className={`${style.user}`}>
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <h2>{user?.username}</h2>
          <p>Lorem ipsum dolor sit.</p>
        </div>
        <div className={`${style.info}`}>
          <div className={`${style.option}`}>
            <div className={`${style.title}`}>
              <span>Chat settings</span>
              <img src="./arrowUp.png" alt="" />
            </div>
          </div>
          <div className={`${style.option}`}>
            <div className={`${style.title}`}>
              <span>Privacy & help</span>
              <img src="./arrowUp.png" alt="" />
            </div>
          </div>
          <div className={`${style.option}`}>
            <div className={`${style.title}`}>
              <span>Shared photos</span>
              <img src="./arrowDown.png" alt="" />
            </div>
            <div className={`${style.photos}`}>
              <div className={`${style.photoItem}`}>
                <div className={`${style.photoDetail}`}>
                  <img src="https://as2.ftcdn.net/v2/jpg/07/08/85/03/1000_F_708850388_WRDsbQCVZF2sYW6Y4qSlMLvzKDJhB6VQ.jpg" />
                  <span>photo name</span>
                </div>

                <img src="./download.png" className={`${style.icon}`} />
              </div>
              <div className={`${style.photoItem}`}>
                <div className={`${style.photoDetail}`}>
                  <img src="https://as2.ftcdn.net/v2/jpg/07/08/85/03/1000_F_708850388_WRDsbQCVZF2sYW6Y4qSlMLvzKDJhB6VQ.jpg" />
                  <span>photo name</span>
                </div>

                <img src="./download.png" className={`${style.icon}`} />
              </div>
            </div>
          </div>
          <div className={`${style.option}`}>
            <div className={`${style.title}`}>
              <span>Shared files</span>
              <img src="./arrowUp.png" alt="" />
            </div>
          </div>
          <button onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are now blocked"
              : isReceiverBlocked
              ? "User blocked"
              : "Block User"}
          </button>
          <button onClick={() => auth.signOut()} className={`${style.logout}`}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
