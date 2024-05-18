import { useUserStore } from "../../../lib/userStor";
import style from "./UserInfo.module.css";
const UserInfo = () => {
  const {currentUser } = useUserStore();

  return (
    <>
      <div className={`${style.UserInfo}`}>
        <div className={`${style.user}`}>
          <img  src={currentUser.avatar || "./avatar.png"} alt="" />
          <p>{currentUser.username}</p>
        </div>
        <div className={` ${style.icons}  `}>
          <img  src="./more.png" alt="" />
          <img  src="./video.png" alt="" />
          <img  src="./edit.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default UserInfo;
