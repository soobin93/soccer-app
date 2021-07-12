import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useUser} from 'components/contexts/UserContext';

const UserRoute = ({component: Component, ...rest}) => {
  const [user, setUser] = useUser();

  return (
    <Route {...rest} render={
      props => {
        if (!user) {
          return <Redirect to={
            {
              pathname: '/error/unauthorized',
              state: {
                from: props.location
              }
            }
          }/>
        } else {
          return <Component {...rest} {...props} />
        }
      }
    }/>
  )
}

export default UserRoute;
