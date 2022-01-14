import {Client} from '../entities/Client';

const moment = require('moment');

const serialize = ({id, name, gender, birthdate, cityId} : Client)=>({
  id,
  name,
  gender,
  cityId,
  birthdate: moment(birthdate).utc().format('DD/MM/YYYY'),

});

const paginateSerialize = ({clients, limit, total, offset, skip}) => ({
  clients: clients.map(serialize),
  limit,
  total,
  offset,
  skip,
});

export {serialize, paginateSerialize};
