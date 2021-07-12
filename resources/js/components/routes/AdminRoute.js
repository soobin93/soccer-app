import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useUser} from 'components/contexts/UserContext';

const AdminRoute = ({component: Component, ...rest}) => {
  const user = useUser();

  return (

    <Route {...rest} render={
      props => {
        if (!user || user[0].userType !== "admin") {
          return <Redirect to={
            {
              pathname: '/unauthorized',
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

export default AdminRoute;
