export enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

interface Config {
  env: Environment; // Environment the app is running in.
}

const config: Config = {
  // When you run 'npm start' ------> NODE_ENV === 'development'
  // When you run 'npm test' -------> NODE_ENV === 'test'
  // When you run 'npm run build' --> NODE_ENV === 'production'
  env: process.env.NODE_ENV as Environment,
};

export default config;
