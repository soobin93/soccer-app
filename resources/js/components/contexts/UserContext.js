import React, {useState, useContext} from "react";

const UserContext = React.createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
};
