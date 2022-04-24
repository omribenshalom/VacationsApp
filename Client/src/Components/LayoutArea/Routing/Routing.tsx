import { Navigate, Route, Routes } from "react-router-dom";

import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import VacationInfo from "../../VacationsArea/VacationInfo/VacationInfo";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";

import "./Routing.css";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import Logout from "../../AuthArea/Logout/Logout";

import FollowChart from "../../VacationsArea/FollowChart/FollowChart";



function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home/" element={<VacationsList />} />
            <Route path="/info/:id/" element={<VacationInfo />} />
            <Route path="/edit-vacation/:id/" element={<EditVacation />} />
            <Route path="/add-vacation/" element={<AddVacation />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />

            <Route path="/chart/" element={<FollowChart />} />

            <Route path="/logout/" element={<Logout />} />
            
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<VacationsList />} />
        </Routes>
    );
}

export default Routing;
