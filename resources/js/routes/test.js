import React from 'react';
import {useUser} from 'components/contexts/UserContext';


const Test = () => {

  const user = useUser();
  console.log(user[0].userType);

  return (
    <h1>You are not authorised!</h1>
  )
}

export default Test;
