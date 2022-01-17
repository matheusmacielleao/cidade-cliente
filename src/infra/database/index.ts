import {createConnection} from 'typeorm';
// createConnection(process.env.CONNECTION_NAME);
export const connection = async () => {
  const connection = process.env.CONNECTION_NAME;
  await createConnection(connection+'');
};
