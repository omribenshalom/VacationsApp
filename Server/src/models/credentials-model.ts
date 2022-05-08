import Joi from 'joi';

class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(user: CredentialsModel) {
    this.email = user.email;
    this.password = user.password;
  }

  private static schemaPost = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(5).max(20),
  });

  public validateLogin(): string {
    const result = CredentialsModel.schemaPost.validate(this, {
      abortEarly: false,
    });
    return result.error?.message;
  }
}

export default CredentialsModel;
