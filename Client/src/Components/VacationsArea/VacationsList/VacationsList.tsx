import { useEffect, useState } from 'react';
import VacationCard from '../VacationCard/VacationCard';
import VacationModel from '../../../Models/VacationModel';
import vacationService from '../../../Services/VacationsService';

import './VacationsList.css';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import store from '../../../Redux/Store';
import { useSelector } from 'react-redux';
import SocketService from '../../../Services/SocketService';
import notify from '../../../Services/NotifyService';

import { RiAddLine } from 'react-icons/ri';
import { IconButton } from '@mui/material';

function VacationsList(): JSX.Element {
  const [user, setUser] = useState<UserModel>(null);
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  let isAdmin = useSelector((state: any) => state.authState.user?.role);
  // let user = useSelector((state: any) => state.authState.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!store.getState().authState.user) {
      navigate('/login/');
      return;
    }
    setUser(store.getState().authState.user);

    const unsubscribeUser = store.subscribe(() => {
      setUser(store.getState().authState.user);
    });
    return () => unsubscribeUser();
  }, []);

  useEffect(() => {
    vacationService
      .getVacations(false)
      .then((allVacations) => {
        setVacations(allVacations);
      })
      .catch((err: any) => {
        if (err.response?.data === 'You are not logged in') {
          navigate('/logout/');
        } else {
          notify.error(err);
        }
      });

    const unsubscribeVacations = store.subscribe(() => {
      setVacations(store.getState().vacationsState.vacations);
    });
    return () => unsubscribeVacations();
  }, []);

  useEffect(() => {
    SocketService.connect();
  }, []);

  return (
    <div className='VacationsList'>
      {isAdmin === 1 && (
        <NavLink
          to='/add-vacation/'
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
          Add Vacation
        </NavLink>
      )}

      <div className='listContainer'>
        {vacations &&
          vacations.map((vac) => (
            <VacationCard key={vac.id} vacation={vac} user={user} />
          ))}
      </div>
    </div>
  );
}

export default VacationsList;
