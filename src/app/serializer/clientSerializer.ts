import {Client} from '../entities/Client';
import {Paginated} from '../interfaces/Paginated';

const moment = require('moment');

const serialize = ({id, name, gender, birthdate, cityId} : Client)=>({
  id,
  name,
  gender,
  cityId,
  birthdate: moment(birthdate).utc().format('DD/MM/YYYY'),

});

const paginateSerialize = ({docs, limit, total, offset, skip} : Paginated<Client>) => ({
  clients: docs.map(serialize),
  limit,
  total,
  offset,
  skip,
});

export {serialize, paginateSerialize};
