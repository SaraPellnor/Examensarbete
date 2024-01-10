/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await fetch("http://localhost:3000/user/");
    const res = await data.json();
    setUsers(res);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{users}}>
      {children}
    </UserContext.Provider>
  );
};
