import { useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import vacationService from "../../../Services/VacationsService";
import UserModel from "../../../Models/UserModel";
import { useSelector } from "react-redux";
import notify from "../../../Services/NotifyService";
import "./VacationCard.css";

//react icons
import { GiAirplaneArrival } from "react-icons/gi";
import { GiAirplaneDeparture } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";
import { MdThumbUpOffAlt } from "react-icons/md";
import config from "../../../Utils/Config";

interface VacationCardProps {
  vacation: VacationModel;
  user: UserModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const isAdmin = useSelector((state: any) => state.authState.user?.role);

  const [isFollow, setIsFollow] = useState<boolean>(
    props.vacation.isUserFollow
  );
  const [numOfFollowers, setNumOfFollowers] = useState<number>(
    props.vacation.numOfFollowers
  );

  const startDate = dateFormat(props.vacation.startDate, "dd.mm.yy");
  const endDate = dateFormat(props.vacation.endDate, "dd.mm.yy");

  const navigate = useNavigate();

  const followVacation = async () => {
    try {
      vacationService.followVacation(props.vacation.id);
      setIsFollow(true);
      setNumOfFollowers((curState) => curState + 1);
    } catch (error: any) {
      notify.error(error);
    }
  };

  const unFollowVacation = () => {
    try {
      vacationService.unFollowVacation(props.vacation.id);
      setIsFollow(false);
      setNumOfFollowers((curState) => curState - 1);
    } catch (error: any) {
      notify.error(error);
    }
  };

  const deleteVacation = async () => {
    try {
      await vacationService.deleteVacation(props.vacation.id);
      notify.success("Vacation Deleted Successfully.");
      navigate(`/home/`);
    } catch (error: any) {
      notify.error(error);
    }
  };

  return (
    <div className="VacationCard">
      {props.vacation.imageName && (
        <img
          src={config.vacationImageUrl + props.vacation.imageName}
          alt={"picture related to " + props.vacation.destination}
        />
      )}

      <h1>{props.vacation.destination.toUpperCase()}</h1>

      <p>{props.vacation.description}</p>
      <h4>
        <GiAirplaneDeparture className="icon airIcon" /> {startDate}
        <br />
        <GiAirplaneArrival className="icon airIcon" /> {endDate}
      </h4>

      <h3>{props.vacation.price} $$</h3>

      <div className="bottomContainer">
        <h5>Number of followers: {numOfFollowers}</h5>

        {/* Different options on card for Admin and for Users. */}
        {isAdmin === 1 ? (
          <div className="actionsOnCard">
            <AiFillEdit
              className="icon editIcon"
              size={20}
              onClick={() => {
                navigate(`/edit-vacation/${props.vacation.id}`);
              }}
            />
            <MdDeleteForever
              className="icon deleteIcon"
              size={20}
              onClick={deleteVacation}
            >
              Delete
            </MdDeleteForever>
          </div>
        ) : (
          <div className="actionsOnCard">
            {isFollow ? (
              <MdThumbUp className="icon" onClick={unFollowVacation} />
            ) : (
              <MdThumbUpOffAlt className="icon" onClick={followVacation} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VacationCard;
