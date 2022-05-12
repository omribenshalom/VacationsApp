import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import store from '../../../Redux/Store';

import { BiLogOut } from 'react-icons/bi';
import './Navbar.css';

function Navbar(): JSX.Element {
  const isAdmin = useSelector((state: any) => state.authState.user?.role);
  const [user, setUser] = useState<UserModel>(null);

  useEffect(() => {
    setUser(store.getState().authState.user);

    const unsubscribeMe = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });

    return () => {
      unsubscribeMe();
    };
  }, []);

  return (
    <div className='Navbar'>
      {user !== null && (
        <div className='nav'>
          <NavLink
            to='/home/'
            className='navlink'
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#fff',
                    background: '#bf1650',
                  }
                : { color: '#bf1650' }
            }
          >
            Home
          </NavLink>

          {isAdmin === 1 && (
            <NavLink
              to='/chart/'
              className='navlink'
              style={({ isActive }) =>
                isActive
                  ? {
                      color: '#fff',
                      background: '#bf1650',
                    }
                  : { color: '#bf1650' }
              }
            >
              Chart
            </NavLink>
          )}

          <NavLink
            to='/about-us'
            className='navlink'
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#fff',
                    background: '#bf1650',
                  }
                : { color: '#bf1650' }
            }
          >
            About Us
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
