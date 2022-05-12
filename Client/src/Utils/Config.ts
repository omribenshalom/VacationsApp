// Development + Production configurations
class Config {}

// Development configuration:
class DevelopmentConfig extends Config {
  public appUrl = "http://localhost:7070/";
  public registerUrl = "http://localhost:7070/api/auth/register/";
  public loginUrl = "http://localhost:7070/api/auth/login/";
  public vacationsUrl = "http://localhost:7070/api/vacations/";
  public vacationImageUrl = "http://localhost:7070/api/vacations/images/";
  public followsUrl = "http://localhost:7070/api/follows/";
}

// Production configuration:
class ProductionConfig extends Config {
  public appUrl = "https://vacations-app-omri-ben-shalom.herokuapp.com/";
  public registerUrl =
    "https://vacations-app-omri-ben-shalom.herokuapp.com/api/auth/register/";
  public loginUrl =
    "https://vacations-app-omri-ben-shalom.herokuapp.com/api/auth/login/";
  public vacationsUrl =
    "https://vacations-app-omri-ben-shalom.herokuapp.com/api/vacations/";
  public vacationImageUrl =
    "https://vacations-app-omri-ben-shalom.herokuapp.com/api/vacations/images/";
  public followsUrl =
    "https://vacations-app-omri-ben-shalom.herokuapp.com/api/follows/";
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
