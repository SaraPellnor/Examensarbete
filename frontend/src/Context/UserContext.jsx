/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */


import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {


  // ----- State variables for users, loggedinUser, and errorMessage

  const [users, setUsers] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState();
  const [errorMessage, setErrorMessage] = useState();


  // ----- Access navigate function from react-router-dom

  const navigateTo = useNavigate();


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
      const data = await fetch("http://localhost:3000/app/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const res = await data.json();
      setLoggedinUser(res);
      navigateTo("/");
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
      await fetch("http://localhost:3000/app/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setLoggedinUser();
      navigateTo("/");
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
        errorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
