import { useEffect, useState } from 'react';
import vacationService from '../../../Services/VacationsService';
import VacationModel from '../../../Models/VacationModel';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import notify from '../../../Services/NotifyService';

import './AddVacation.css';

import { IoIosArrowBack } from 'react-icons/io';

function AddVacation(): JSX.Element {
  const [badDate, setBadDate] = useState<boolean>(false);
  const [today, setToday] = useState<string>('');

  const { register, handleSubmit, formState, watch } = useForm<VacationModel>();
  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA');

    setToday(today);
  }, []);

  const submit = async (vacationData: VacationModel) => {
    try {
      if (watch('startDate') > watch('endDate')) {
        setBadDate(true);
        return;
      }
      setBadDate(false);
      await vacationService.addVacation(vacationData);
      notify.success('New vacation is added successfully!');
      navigate('/home/');
    } catch (error: any) {
      notify.error(error);
    }
  };

  return (
    <div className='AddVacation'>
      <h2>New Vacation</h2>

      <form onSubmit={handleSubmit(submit)}>
        <input
          placeholder='Destination..'
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

        <input
          placeholder='Description..'
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
          className='dateInput'
          type='date'
          min={today}
          {...register('startDate', {
            required: { value: true, message: 'start date required.' },
          })}
        />
        <span>{errors.startDate?.message}</span>
        <br />

        <label>End Date:</label>
        <input
          className='dateInput'
          type='date'
          min={today}
          {...register('endDate', {
            required: { value: true, message: 'endDate required.' },
          })}
        />
        <span>{errors.endDate?.message}</span>
        {badDate && <span>End date is before Start date.</span>}
        <br />

        <input
          placeholder='Price..'
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

        <label>Upload Image:</label>
        <input
          type='file'
          accept='image/*'
          id='imageUpload'
          // style={{ display: "none" }}
          {...register('image', {
            required: { value: true, message: 'image required.' },
          })}
        />
        <span>{errors.image?.message}</span>
        <br />
        <input type='submit' value='Submit' />
      </form>
      <h2>
        <IoIosArrowBack
          className='icon'
          onClick={() => {
            navigate('/home');
          }}
        />
      </h2>
    </div>
  );
}

export default AddVacation;
