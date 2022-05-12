import Joi from 'joi';
import RoleModel from './role-model';

class UserModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role: RoleModel;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }

  private static schemaPost = Joi.object({
    id: Joi.forbidden(),
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(5).max(20),
    role: Joi.forbidden(),
  });

  public validateRegister(): string {
    const result = UserModel.schemaPost.validate(this, { abortEarly: false });
    return result.error?.message;
  }
}

export default UserModel;
