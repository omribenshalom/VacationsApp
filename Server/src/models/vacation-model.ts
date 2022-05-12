import Joi from 'joi';
import { UploadedFile } from 'express-fileupload';

class VacationModel {
  public id: number;
  public destination: string;
  public description: number;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public image: UploadedFile;
  public imageName: string;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.image = vacation.image;
    this.imageName = vacation.imageName;
  }

  private static schemaPost = Joi.object({
    id: Joi.forbidden(),
    destination: Joi.string().required().min(2).max(20),
    description: Joi.string().required().min(2).max(400),
    startDate: Joi.date().required().min('now').max(new Date(2039, 12, 31)),
    endDate: Joi.date()
      .required()
      .greater(Joi.ref('startDate'))
      .max(new Date(2039, 12, 31)),
    price: Joi.number().required().integer().min(0).max(1000000),
    image: Joi.object().optional(),
    imageName: Joi.string().optional(),
  });

  private static schemaPut = Joi.object({
    id: Joi.required(),
    destination: Joi.string().required().min(2).max(20),
    description: Joi.string().required().min(2).max(400),
    startDate: Joi.date().required().min('now').max(new Date(2039, 12, 31)),
    endDate: Joi.date()
      .required()
      .greater(Joi.ref('startDate'))
      .max(new Date(2039, 12, 31)),
    price: Joi.number().required().integer().min(0).max(1000000),
    image: Joi.object().optional(),
    imageName: Joi.string().optional(),
  });

  public validatePost(): string {
    const result = VacationModel.schemaPost.validate(this, {
      abortEarly: false,
    });
    return result.error?.message;
  }

  public validatePut(): string {
    const result = VacationModel.schemaPut.validate(this, {
      abortEarly: false,
    });
    return result.error?.message;
  }
}

export default VacationModel;
