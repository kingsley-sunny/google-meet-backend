export interface EnvironmentInterface {
  dbUser: string;
  dbName: string;
  dbPort: string;
  dbPassword: string;
  dbHost: string;
  appPort: string;
  jwtSecretToken: string;
  node_env: string;
}
