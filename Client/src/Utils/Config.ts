// Development + Production configurations
class Config {}

// Development configuration:
class DevelopmentConfig extends Config {
  public registerUrl = 'http://localhost:7070/api/auth/register/';
  public loginUrl = 'http://localhost:7070/api/auth/login/';
  public vacationsUrl = 'http://localhost:7070/api/vacations/';
  public vacationImageUrl = 'http://localhost:7070/api/vacations/images/';
  public followsUrl = 'http://localhost:7070/api/follows/';
}

// Production configuration:
class ProductionConfig extends Config {
  public registerUrl = 'http://www.northwind.com/api/auth/register/';
  public loginUrl = 'http://www.northwind.com/api/auth/login/';
  public vacationsUrl = 'http://localhost:7070/api/vacations/';
  public vacationImageUrl = 'http://localhost:7070/api/vacations/images/';
  public followsUrl = 'http://localhost:7070/api/follows/';

  // public productsUrl = "http://www.northwind.com/api/products/";
  // public productsImageUrl = "http://www.northwind.com/api/products/images/";
}

const config =
  process.env.NODE_ENV === 'development'
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
