/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await fetch("http://localhost:3000/user/");
    const res = await data.json();
    setUsers(res);
  };

  const login = async (user) => {
    try {
      const data = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const auth = async () => {
    try {
      const data = await fetch("http://localhost:3000/user/auth", {
        method: "POST"
        // credentials: "include", // Lägg till detta för att inkludera sessionsinformation
        // headers: {
        //   "Content-Type": "application/json",
        //   // Lägg till eventuella andra autentisering headers här
        // },
      });
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
    <UserContext.Provider value={{ users, login }}>
      {children}
    </UserContext.Provider>
  );
};
