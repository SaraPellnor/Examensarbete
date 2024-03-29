/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {


  // ----- State variables for users, loggedinUser, and errorMessage

  const [users, setUsers] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState(false);
  const [userErrorMessage, setErrorMessage] = useState();
  const [comfirmedPassword, setComfirmedPassword] = useState("");
  const [user, setUser] = useState();




  // ----- Access navigate function from react-router-dom

  const navigateTo = useNavigate();

  const getUser = async () => {
    try {
      const data = await fetch(`http://localhost:3000/app/user/${loggedinUser.user_id}`);
      const res = await data.json();
      console.log(res.ok);
      setUser(res);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };


  // ----- Function to fetch all users

  const getUsers = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/user/");
      const res = await data.json();
      setUsers(res);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- Function to log in a user

  const login = async (user) => {
    try {
      const data = await fetch("http://localhost:3000/app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const res = await data.json();
      if (typeof res === "string") {
        window.alert(res);
        return;
      }
      setLoggedinUser(res);
      navigateTo("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- Function to register a new user

  const registrate = async (user) => {
    try {
      if (comfirmedPassword !== user.password) {
        window.alert("Lösenorden måste vara lika!");
        return;
      }
      const data = await fetch("http://localhost:3000/app/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const res = await data.json();
      if (typeof res === "string") {
        window.alert(res);
        return;
      }
      setLoggedinUser(res);
      navigateTo("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- Function that updates user in user page

  const updateUser = async (udatedUser) => {
    try {
      const data = await fetch(`http://localhost:3000/app/user/update/${loggedinUser.user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(udatedUser),
      });
      const res = await data.json();
      if (typeof res === "string") {
        window.alert(res);
        return;
      }
      logOutUser()    
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };


  // ----- Function to check if the user is authenticated

  const auth = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/user/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const res = await data.json();
      setLoggedinUser(res);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- Function to log out the user

  const logOutUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/app/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = res.json();
      if (!data) {
        setErrorMessage(data.status);
        navigateTo("/error");
      }
      setLoggedinUser();
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  // ----- useEffect hook to perform authentication and fetch users on component mount

  useEffect(() => {
    auth();
    getUsers();
  }, []);

  // ----- Provide user-related context to children components

  return (
    <UserContext.Provider
      value={{
        users,
        login,
        registrate,
        loggedinUser,
        logOutUser,
        userErrorMessage,
        setErrorMessage,
        setComfirmedPassword,
        auth,
        getUser,
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
