import { format } from 'date-fns';
import { parse } from 'date-fns/esm';

import moment from 'moment';

export const formatDate = (str) => {
  let dateString = format(new Date(str), 'yyyy-MM-dd');
  let date = String(parse(dateString, 'yyyy-MM-dd', new Date()));
  return date;
};

export const splitDate = (arr) => {
  return arr.split(' ').slice(0, 3);
};

export const dateFormatter = (str) => {
  return moment(str, 'YYYY-MM-DD').format('ddd D MMM');
};
