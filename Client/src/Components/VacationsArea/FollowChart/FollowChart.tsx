import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import store from '../../../Redux/Store';
import notify from '../../../Services/NotifyService';
import vacationService from '../../../Services/VacationsService';
import './FollowChart.css';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FollowChart(): JSX.Element {
  const [vacationsWithFollowers, setVacationsWithFollowers] = useState<
    VacationModel[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    vacationService
      .getVacations(false)
      .then((allVacations) => {
        // sort by popularity.
        allVacations.sort(function (a, b) {
          return b.numOfFollowers - a.numOfFollowers;
        });
        setVacationsWithFollowers(
          allVacations.filter((v) => v.numOfFollowers > 0)
        );
      })
      .catch((err: any) => {
        if (err.response?.data === 'You are not logged in') {
          navigate('/logout/');
        } else {
          notify.error(err);
        }
      });

    const unsubscribeVacations = store.subscribe(() => {
      setVacationsWithFollowers(store.getState().vacationsState.vacations);
    });
    return () => unsubscribeVacations();
  }, []);

  const labels = vacationsWithFollowers.map((v) => v.destination);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Vacations Followers Chart - Chart.js',
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Number Of Followers ',
        data: vacationsWithFollowers.map((v) => v.numOfFollowers),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(153, 102, 255)',
          // 'rgb(201, 203, 207)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className='chart'>
      {vacationsWithFollowers && <Bar options={options} data={data}></Bar>}
    </div>
  );
}

export default FollowChart;
