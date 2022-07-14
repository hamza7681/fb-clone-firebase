import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import PrivateRoutes from "./Routes/PrivateRoute";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase/firebase";
import ProfilePage from "./Pages/ProfilePage";
import Header from "./Components/Headers/Header";
import RegisterPage from "./Pages/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";


function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            dispatch({
              type: "GET_USER",
              payload: {
                displayname: user.displayName,
                email: user.email,
                id: user.uid,
                pic: user.photoURL,
              },
            });
            const querySnapshots = await getDocs(collection(db, "users"));
            querySnapshots.docs
              .filter((doc) => doc.data().userId === user.uid)
              .map((doc) => {
                dispatch({
                  type: "GET_FULL_USER",
                  payload: { data: doc.data(), id: doc.id },
                });
              });
          } else {
            console.log("Something went wrong!");
          }
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      const getPost = async () => {
        const querySnapshots = await getDocs(collection(db, "post"));
        const allPost = querySnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({
          type: "GET_ALL_POST",
          payload: allPost,
        });
      };
      const getAllStories = async () => {
        const querySnapshots = await getDocs(collection(db, "stories"));
        const allStories = querySnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({
          type: "ALL_STORIES",
          payload: allStories,
        });
      };
      getPost();
      getAllStories();
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        {token ? <Header /> : ""}
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:name" element={<ProfilePage />} />
           
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
