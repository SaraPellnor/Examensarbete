/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await fetch("http://localhost:3000/app/user/");
    const res = await data.json();
    setUsers(res);
  };

  const login = async (user) => {
    try {
      const data = await fetch("http://localhost:3000/app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });
      const res = await data.json();
      console.log(res);
      // document.cookie = `user=${JSON.stringify(user)}; path=/`;

    } catch (error) {
      console.log(error);
    }
  };

  const registrate = async (user) => {
    try {
      const data = await fetch("http://localhost:3000/app/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });
      const res = await data.json();
      console.log(res);
      // document.cookie = `user=${JSON.stringify(user)}; path=/`;

    } catch (error) {
      console.log(error);
    }
  };

  const auth = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/user/auth")
      const res = await data.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth();
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, login, registrate }}>
      {children}
    </UserContext.Provider>
  );
};
