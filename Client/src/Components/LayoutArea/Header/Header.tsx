import { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import store from '../../../Redux/Store';
import Navbar from '../Navbar/Navbar';

import './Header.css';

function Header(): JSX.Element {
  const [user, setUser] = useState<UserModel>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(store.getState().authState.user);

    const unsubscribeMe = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });

    return () => {
      unsubscribeMe();
    };
  }, []);

  const clickOnTitle = () => {
    navigate('/home');
  };

  return (
    <div className='HeaderContainer'>
      <div className='Header'>
        <h3 className='title' onClick={clickOnTitle}>
          VACATIONS APP
        </h3>
        <div className='greeting'>
          {user === null ? (
            <p>Hello Guest </p>
          ) : (
            <>
              <p>Hello {user.firstName} </p>
              <NavLink
                to='/logout'
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
                Logout <BiLogOut></BiLogOut>
              </NavLink>
            </>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
