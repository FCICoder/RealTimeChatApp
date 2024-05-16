import { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    URL: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        URL: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
   
  };

  return (
    <>
      <div className="login">
        <div className="item">
          <h2>Welcome back,</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign In</button>
          </form>
        </div>

        <div className="separator"></div>

        <div className="item">
          <h2>Create an Account,</h2>
          <form >
            <label htmlFor="file">
              <img src={avatar.URL || "./avatar.png"} alt=""  />
              Uplaod an Image
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e)=>handleAvatar(e)}
            />
            <input type="text" placeholder="UserName" name="UserName" />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
