import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import store from '../../../Redux/Store';

import './Navbar.css';

function Navbar(): JSX.Element {
  const [user, setUser] = useState<UserModel>(null);

  // Register
  useEffect(() => {
    // Once - update user at component load:
    setUser(store.getState().authState.user);

    // Subscribe to store changes - whenever AuthState change - report it:
    const unsubscribeMe = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });

    // When component destroyed:
    return () => {
      unsubscribeMe();
    };
  }, []);

  return (
    <div className='Navbar'>
      {user === null ? (
        <div className='nav'>
          <span>Hello Guest </span>
          <NavLink to='/login/' className='navlink'>
            Login
          </NavLink>
          <NavLink to='/register/' className='navlink'>
            Register
          </NavLink>
        </div>
      ) : (
        <div className='nav'>
          <span>Hello {user.firstName} </span>
          <NavLink to='/home/' className='navlink'>
            Home
          </NavLink>
          <NavLink to='/chart/' className='navlink'>
            Chart
          </NavLink>
          <NavLink to='/logout'>Logout</NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
