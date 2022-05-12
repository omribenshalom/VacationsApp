import { useEffect, useState } from "react";
import vacationService from "../../../Services/VacationsService";
import VacationModel from "../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notify from "../../../Services/NotifyService";

import "./AddVacation.css";

import { IoIosArrowBack } from "react-icons/io";

function AddVacation(): JSX.Element {
  const [badDate, setBadDate] = useState<boolean>(false);
  const [today, setToday] = useState<string>("");

  const { register, handleSubmit, formState, watch } = useForm<VacationModel>();
  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    setToday(today);
  }, []);

  const submit = async (vacationData: VacationModel) => {
    try {
      if (watch("startDate") > watch("endDate")) {
        setBadDate(true);
        return;
      }
      setBadDate(false);

      await vacationService.addVacation(vacationData);
      notify.success("New vacation is added successfully!");
      navigate("/home/");
    } catch (error: any) {
      notify.error(error);
    }
  };

  return (
    <div className="AddVacation">
      <h2>New Vacation</h2>

      <form onSubmit={handleSubmit(submit)}>
        <input
          placeholder="Destination.."
          type="text"
          {...register("destination", {
            required: { value: true, message: "Destination required." },
            minLength: {
              value: 2,
              message: "Destination is too short - min length is 2 notes.",
            },
            maxLength: {
              value: 30,
              message: "Destination is too long, max length is 30 notes.",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/i,
              message: "Invalid Destination Name",
            },
          })}
        />

        <span>{errors.destination?.message}</span>
        <br />

        <input
          placeholder="Description.."
          type="text"
          {...register("description", {
            required: { value: true, message: "Description required." },
            minLength: {
              value: 2,
              message: "Description is too short - min length is 2 notes.",
            },
            maxLength: {
              value: 400,
              message: "Description is too long, max length is 400 notes.",
            },
            pattern: {
              value: /\s+|,\s+/,
              message: "Invalid Description text.",
            },
          })}
        />
        <span>{errors.description?.message}</span>
        <br />

        <label>Start Date:</label>
        <input
          className="dateInput"
          type="date"
          min={today}
          {...register("startDate", {
            required: { value: true, message: "Start date is required." },
          })}
        />
        <span>{errors.startDate?.message}</span>
        <br />

        <label>End Date:</label>
        <input
          className="dateInput"
          type="date"
          min={today}
          {...register("endDate", {
            required: { value: true, message: "End date is required." },
          })}
        />
        <span>{errors.endDate?.message}</span>
        {badDate && <span>End date is before Start date.</span>}
        <br />

        <input
          placeholder="Price.."
          type="number"
          min="0"
          {...register("price", {
            required: { value: true, message: "Price is required." },
            min: {
              value: 10,
              message: "Price cant be under 10$.",
            },
            max: {
              value: 1000001,
              message:
                "Price is over 1 million dollars, that is not possible when you are flying with us :-) .",
            },
          })}
        />
        <span>{errors.price?.message}</span>
        <br />

        <label>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          {...register("image", {
            required: { value: true, message: "image required." },
          })}
        />
        <span>{errors.image?.message}</span>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h2>
        <IoIosArrowBack
          className="icon"
          onClick={() => {
            navigate("/home");
          }}
        />
      </h2>
    </div>
  );
}

export default AddVacation;
