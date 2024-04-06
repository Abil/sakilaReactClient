import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux"; //Redux

import { /*useHistory*/ Navigate } from "react-router-dom";

//Redux Toolkit Slice options
import { setUser, setToken } from "../../store/slices/authSlice.js";

//Context
import { useAuth } from "../../context/auth";

const CallbackPage = () => {
  //Redux
  const dispatch = useDispatch();

  //const history = useHistory();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract token from query parameters
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const admin = params.get("admin");

    const authData = {
      user: {
        name,
        email,
        admin,
      },
      token,
    };

    //setAuth({ ...auth, token: data.token, user: data.user });

    const authCheck = async () => {
      try {
        //console.log("Token: ", token);
        const headers = {
          Authorization: token,
          "Content-Type": "application/json",
        };

        const { data } = await axios.get(`/auth/auth-check`, { headers });
        //console.log("data: ", data);
        if (data.ok) {
          setAuth({ ...auth, token: authData.token, user: authData.user });

          ///Redux calling slice actions directly
          dispatch(setUser(authData.user));
          dispatch(setToken(authData.token));
          ///

          localStorage.setItem("auth", JSON.stringify(authData));
          // Update loading state
          setLoading(false);
        } else {
          toast.error("Invalid auth token");
          // Update loading state
          setLoading(false);
        }
      } catch (err) {
        console.log("Error in auth check: ", err);
      }
    };

    authCheck();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigate to="/" />
    </>
  );
};

export default CallbackPage;
