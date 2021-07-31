import React from "react";
import {useUser} from "components/contexts/UserContext";


const LandingPage = () => {

  const [user] = useUser();

  return (
    <div>
      <h1>This is landing page!</h1>
      <h2>Welcome {user.name}!</h2>
      {user.avatar && <img src={`/storage/avatars/${user.avatar}`} alt="avatar" />}
    </div>
  );
}

export default LandingPage;
