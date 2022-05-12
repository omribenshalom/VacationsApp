import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import "./FollowChart.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FollowChart(): JSX.Element {
  const isAdmin = useSelector((state: any) => state.authState.user?.role);
  const [vacationsWithFollowers, setVacationsWithFollowers] = useState<
    VacationModel[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAdmin);

    if (isAdmin !== 1) {
      navigate(`/home/`);
    }
    // get vacations from store, sort and filter. on initial.
    setVacationsWithFollowers(
      store
        .getState()
        .vacationsState.vacations.sort(function (a, b) {
          return b.numOfFollowers - a.numOfFollowers;
        })
        .filter((v) => v.numOfFollowers > 0)
    );

    // get vacations from store, sort and filter. listening to changes is global state - redux.
    const unsubscribeVacations = store.subscribe(() => {
      setVacationsWithFollowers(
        store
          .getState()
          .vacationsState.vacations.sort(function (a, b) {
            return b.numOfFollowers - a.numOfFollowers;
          })
          .filter((v) => v.numOfFollowers > 0)
      );
    });
    return () => unsubscribeVacations();
  }, []);

  const labels = vacationsWithFollowers.map((v) => v.destination);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Vacations Followers Chart - Chart.js",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number Of Followers ",
        data: vacationsWithFollowers.map((v) => v.numOfFollowers),
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(153, 102, 255, 0.4)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chartContainer">
      <div className="chart">
        {vacationsWithFollowers && <Bar options={options} data={data}></Bar>}
      </div>
    </div>
  );
}

export default FollowChart;
