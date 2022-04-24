import { useEffect, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import dateFormat from 'dateformat';
import { useNavigate } from 'react-router-dom';
import vacationService from '../../../Services/VacationsService';
import UserModel from '../../../Models/UserModel';
import { useSelector } from 'react-redux';
import notify from '../../../Services/NotifyService';
import './VacationCard.css';

//react icons
import { GiAirplaneArrival } from 'react-icons/gi';
import { GiAirplaneDeparture } from 'react-icons/gi';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { MdThumbUp } from 'react-icons/md';
import { MdThumbUpOffAlt } from 'react-icons/md';

interface VacationCardProps {
  vacation: VacationModel;
  user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  // console.log("user from state" , store.getState().authState.user)
  // console.log("vacations from state" , store.getState().vacationsState.vacations)
  const isAdmin = useSelector((state: any) => state.authState.user?.role);

  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [numOfFollowers, setNumOfFollowers] = useState<number>(0);

  const navigate = useNavigate();

  const startDate = dateFormat(props.vacation.startDate, 'dd.mm.yy');
  const endDate = dateFormat(props.vacation.endDate, 'dd.mm.yy');

  useEffect(() => {
    if (props.vacation.isUserFollow) setIsFollow(true);
    setNumOfFollowers(props.vacation.numOfFollowers);
  }, []);

  const clickInfo = () => {
    navigate(`/info/${props.vacation.id}`);
  };

  const followVacation = async () => {
    try {
      vacationService.followVacation(props.vacation.id);
      setIsFollow(!isFollow);
      setNumOfFollowers(numOfFollowers + 1);

      // notify.success("Follow!")
    } catch (error: any) {
      notify.error(error);
    }
  };

  const unFollowVacation = () => {
    try {
      vacationService.unFollowVacation(props.vacation.id);
      setIsFollow(!isFollow);
      setNumOfFollowers(numOfFollowers - 1);

      // notify.success("Un-Follow!")
    } catch (error: any) {
      notify.error(error);
    }
  };

  const deleteVacation = async () => {
    try {
      await vacationService.deleteVacation(props.vacation.id);
      notify.success('Vacation Deleted Successfully.');
      navigate(`/home/`);
    } catch (error: any) {
      notify.error(error);
    }
  };

  return (
    <div className='VacationCard'>
      {props.vacation.imageName && (
        <img
          onClick={clickInfo}
          src={`http://localhost:7070/api/vacations/images/${props.vacation.imageName}`}
          alt={'picture related to ' + props.vacation.destination}
        />
      )}

      <h2>{props.vacation.destination.toUpperCase()}</h2>

      <p>{props.vacation.description}</p>
      <h5>
        {' '}
        <GiAirplaneDeparture className='icon airIcon' /> {startDate}
        <br /> <GiAirplaneArrival className='icon airIcon' /> {endDate}
      </h5>
      {/* <br /> */}
      <h3>{props.vacation.price} $$</h3>
      {/* <br /> */}

      <div className='bottomContainer'>
        <h5>Number of followers: {numOfFollowers}</h5>
        {isAdmin === 1 ? (
          <div className='actionsOnCard'>
            <AiFillEdit
              className='icon editIcon'
              onClick={() => {
                navigate(`/edit-vacation/${props.vacation.id}`);
              }}
            />

            <MdDeleteForever
              className='icon deleteIcon'
              onClick={deleteVacation}
            >
              Delete
            </MdDeleteForever>
          </div>
        ) : (
          <div className='actionsOnCard'>
            {isFollow ? (
              <MdThumbUp onClick={unFollowVacation} />
            ) : (
              <MdThumbUpOffAlt onClick={followVacation} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VacationCard;
