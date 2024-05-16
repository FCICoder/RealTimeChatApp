import { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

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
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { userName, email, password } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Add a new document in collection "cities"
   
      await setDoc(doc(db, "users",res.user.uid), {
        username:userName,
        email,id:res.user.uid,
       blocked:[],
      });
      await setDoc(doc(db, "userchats",res.user.uid), {
   
        chats:[],
       });
       toast.success("Account created! you can login now!")
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
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
          <form onSubmit={handleRegister}>
            <label htmlFor="file">
              <img src={avatar.URL || "./avatar.png"} alt="" />
              Uplaod an Image
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => handleAvatar(e)}
            />
            <input type="text" placeholder="userName" name="userName" />
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
