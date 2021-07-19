import React, {useState, useContext, useEffect} from "react";

const UserContext = React.createContext(null);

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
