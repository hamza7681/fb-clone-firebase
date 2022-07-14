import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import { Button } from "@mui/material";
import { auth } from "../../Firebase/firebase";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        localStorage.setItem("token", res.user.accessToken);
        dispatch({ type: "LOGIN", paylaod: res.user.accessToken });
        navigate("/");
        toast.success("Login Successfully");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login_logo">
          <img src={logo} alt="fb" />
          <img src={logo2} alt="fb2" />
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="show_pass" onClick={() => setShow(!show)}>
          Show Password?
        </div>
        <Button type="submit" onClick={signIn}>
          {loading ? "loading..." : "Login"}
        </Button>
        <Link to="/register">Create New Account</Link>
      </div>
    </>
  );
};

export default Login;
