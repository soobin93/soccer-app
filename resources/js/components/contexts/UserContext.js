import React, {useState, useContext, useEffect} from "react";

const UserContext = React.createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}) => {

  let initialValue = null;

  // Setting a initial avatar version to avoid cache issue
  if (localStorage.getItem('user')) {
    initialValue = JSON.parse(localStorage.getItem('user'));
    initialValue['avatar_version'] = 1;
  }

  const [user, setUser] = useState(initialValue);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
};
