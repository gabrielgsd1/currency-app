import React, { createContext, useState } from "react";

export const InputsContext = createContext();

export function InputsProvider({ children }) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  return (
    <InputsContext.Provider value={{ to, setTo, from, setFrom }}>
      {children}
    </InputsContext.Provider>
  );
}

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [route] = useState("login");

  return (
    <UserContext.Provider
      value={{
        user: { user, setUser },
        login: { isLogged, setIsLogged },
        route: route,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
