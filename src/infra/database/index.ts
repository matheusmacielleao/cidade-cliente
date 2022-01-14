import {createConnection} from 'typeorm';
// createConnection(process.env.CONNECTION_NAME);
export const connection = async () => {
  await createConnection(process.env.CONNECTION_NAME);
};
