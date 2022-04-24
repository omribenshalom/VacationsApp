import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import vacationService from '../../../Services/VacationsService';

import VacationModel from '../../../Models/VacationModel';
import './UpdateVacation.css';
import notify from '../../../Services/NotifyService';

function UpdateVacation(): JSX.Element {
  const [badDate, setBadDate] = useState<boolean>(false);

  const { register, handleSubmit, formState, setValue, watch } =
    useForm<VacationModel>();
  const { errors } = formState;

  const navigate = useNavigate();
  const params = useParams();
  const vacationId = +params.id!;

  useEffect(() => {
    vacationService
      .getOneVacation(vacationId)
      .then((vaca) => {
        setValue('destination', vaca.destination);
        setValue('description', vaca.description);
        setValue('startDate', vaca.startDate);
        setValue('endDate', vaca.endDate);
        setValue('price', vaca.price);
      })
      .catch((err: any) => console.log(err.message));
  }, []);

  const submit = async (vacationData: VacationModel) => {
    vacationData.id = vacationId;
    try {
      if (watch('startDate') > watch('endDate')) {
        setBadDate(true);
        return;
      }
      setBadDate(false);
      await vacationService.updateVacation(vacationData);

      notify.success('Edit vacation is successful!');
      navigate('/home/');
    } catch (error: any) {
      notify.error(error);
    }
  };

  return (
    <div className='EditVacation'>
      <form onSubmit={handleSubmit(submit)}>
        <label>Destination:</label>
        <input
          type='text'
          {...register('destination', {
            required: { value: true, message: 'destination required.' },
            minLength: {
              value: 2,
              message: 'destination too short - min 2 notes.',
            },
            maxLength: {
              value: 30,
              message: 'destination too long - max 30 notes.',
            },
          })}
        />
        <span>{errors.destination?.message}</span>
        <br />

        <label>Description:</label>
        <input
          type='text'
          {...register('description', {
            required: { value: true, message: 'description required.' },
            minLength: {
              value: 2,
              message: 'description too short - min 2 notes.',
            },
            maxLength: {
              value: 400,
              message: 'description too long - max 400 notes.',
            },
          })}
        />
        <span>{errors.description?.message}</span>
        <br />

        <label>Start Date:</label>
        <input
          type='date'
          min='2022-03-22'
          {...register('startDate', {
            required: { value: true, message: 'start date required.' },
          })}
        />
        <span>{errors.startDate?.message}</span>
        <br />

        <label>End Date:</label>
        <input
          type='date'
          min='2022-03-22'
          {...register('endDate', {
            required: { value: true, message: 'endDate required.' },
          })}
        />
        <span>{errors.endDate?.message}</span>
        {badDate && <span>End date is before Start date.</span>}
        <br />

        <label>Price:</label>
        <input
          type='number'
          min='0'
          {...register('price', {
            required: { value: true, message: 'price required.' },
            min: {
              value: 10,
              message: 'price cant be under 10$.',
            },
          })}
        />
        <span>{errors.price?.message}</span>
        <br />

        <label>Image:</label>
        <input
          type='file'
          accept='image/*'
          {...register('image', {
            required: { value: true, message: 'image required.' },
          })}
        />
        <span>{errors.image?.message}</span>
        <br />

        <button>Send</button>
      </form>
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

export default UpdateVacation;
