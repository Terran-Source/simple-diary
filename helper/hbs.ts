const moment = require('moment');

const formatDate = (
  date: Date,
  format: string,
  isUtc: boolean = false
): string =>
  isUtc ? moment.utc(date).format(format) : moment(date).format(format);

export { formatDate };
