class Config {}

class DevelopmentConfig extends Config {
  public mysql = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'vacations_app',
  };
}

class ProductionConfig extends Config {
  public mysql = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'vacations_app',
  };
}

const config =
  process.env.NODE_ENV === 'production'
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default config;
