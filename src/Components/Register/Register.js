import React, { useState } from "react";
import "../Login/login.css";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import { Button } from "@mui/material";
import { auth, db } from "../../Firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        password: password,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      toast.success("Register Successfully");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
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
        <Button type="submit" onClick={register}>
          {loading ? "loading..." : "Register"}
        </Button>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Register;
