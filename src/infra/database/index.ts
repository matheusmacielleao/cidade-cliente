import {createConnection} from 'typeorm';
export const connection = async () => {
  const connection = process.env.CONNECTION_NAME;
  await createConnection(connection+'');
};
