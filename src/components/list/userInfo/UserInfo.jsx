import style from "./UserInfo.module.css";
const UserInfo = () => {
  return (
    <>
      <div className={`${style.UserInfo}`}>
        <div className={`${style.user}`}>
          <img  src="./avatar.png" alt="" />
          <p>John Doe</p>
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
