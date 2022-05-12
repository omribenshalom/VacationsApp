import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import vacationService from "../../../Services/VacationsService";

import VacationModel from "../../../Models/VacationModel";
import "./UpdateVacation.css";
import notify from "../../../Services/NotifyService";
import { IoIosArrowBack } from "react-icons/io";

function UpdateVacation(): JSX.Element {
  const [badDate, setBadDate] = useState<boolean>(false);
  const [today, setToday] = useState<string>("");
  const [vacation, setVacation] = useState<VacationModel>(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");

    setToday(today);
  }, []);

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
        // update State
        setVacation(vaca);

        // update form fields
        setValue("destination", vaca.destination);
        setValue("description", vaca.description);
        setValue("startDate", vaca.startDate);
        setValue("endDate", vaca.endDate);
        setValue("price", vaca.price);
      })
      .catch((err: any) => console.log(err.message));
  }, []);

  const submit = async (vacationData: VacationModel) => {
    try {
      if (watch("startDate") > watch("endDate")) {
        setBadDate(true);
        return;
      }
      setBadDate(false);

      vacationData.id = vacationId;
      // If There is no new image - The old image will remain.
      vacationData.imageName = vacation.imageName;

      await vacationService.updateVacation(vacationData);

      notify.success("Update vacation is successful!");
      navigate("/home/");
      console.log("vacationData - ", vacationData);
    } catch (error: any) {
      notify.error(error);
    }
  };

  return (
    <div className="EditVacation">
      <h2>Update Vacation</h2>

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
              message: "Invalid Destination Name.",
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

        <label>Update Image ?</label>
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          {...register("image")}
        />

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

export default UpdateVacation;
