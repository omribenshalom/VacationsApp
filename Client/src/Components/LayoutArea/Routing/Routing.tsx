import { Navigate, Route, Routes } from "react-router-dom";

import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";

import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import Logout from "../../AuthArea/Logout/Logout";

import FollowChart from "../../VacationsArea/FollowChart/FollowChart";
import PageNotFound404 from "../../GeneralArea/PageNotFound404/PageNotFound404";
import AboutUs from "../../GeneralArea/AboutUs/AboutUs";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/register/" element={<Register />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/logout/" element={<Logout />} />

      <Route path="/edit-vacation/:id/" element={<EditVacation />} />
      <Route path="/add-vacation/" element={<AddVacation />} />
      <Route path="/chart/" element={<FollowChart />} />
      <Route path="/about-us/" element={<AboutUs />} />

      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/home/" element={<Navigate to="/" />} />

      <Route path="/" element={<VacationsList />} />
      <Route path="*" element={<PageNotFound404 />} />
    </Routes>
  );
}

export default Routing;
