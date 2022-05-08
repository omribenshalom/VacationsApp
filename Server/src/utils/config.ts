class Config {}

class DevelopmentConfig extends Config {
  public isDevelopment = true;
  public mysql = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "vacations_app",
  };
}

class ProductionConfig extends Config {
  public isDevelopment = false;
  public mysql = {
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bfe0b7983807c1",
    password: "9066d35e",
    database: "heroku_7513c7bfc0af262",
  };
}

const config =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default config;
