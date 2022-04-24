import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import notify from '../../../Services/NotifyService';
import vacationService from '../../../Services/VacationsService';

import './VacationInfo.css';

function VacationInfo(): JSX.Element {
  const isAdmin = useSelector((state: any) => state.authState.user?.role);
  
  const [vacationInfo, setVacationInfo] = useState<VacationModel>();
  const params = useParams();
  const vacationId = +params.id!;

  const navigate = useNavigate();

  useEffect(() => {
    vacationService
      .getOneVacation(vacationId)
      .then((vacation) => setVacationInfo(vacation))
      .catch((err) => console.log(err.message));
  }, []);

  const deleteVacation = async () => {
    try {
      await vacationService.deleteVacation(vacationId);
      notify.success('Vacation Deleted Successfully.');
      navigate(`/home/`);
    } catch (error: any) {
      notify.error(error);
    }
  };

  return (
    <div className='VacationInfo'>
      {vacationInfo && (
        <div className='infoContainer'>
          <h3>{vacationInfo.destination}</h3>
          <h5>{vacationInfo.description}</h5>

          <p>{vacationInfo.price} $</p>
          <img
            // src={vacationInfo.imageName}
            src={`http://localhost:7070/api/vacations/images/${vacationInfo.imageName}`}
            alt={'picture related to ' + vacationInfo.destination}
          />
        </div>
      )}

      <button
        onClick={() => {
          navigate(`/edit-vacation/${vacationId}`);
        }}
      >
        Edit
      </button>
      <button onClick={deleteVacation}>Delete</button>

      
      <button
        onClick={() => {
          navigate('/home');
        }}
      >
        Back
      </button>
    </div>
  );
}

export default VacationInfo;
