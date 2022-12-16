import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  prettyPrint: true,
  base: {pid: false},
  timestamp: () => `"Time":${dayjs().format()}`,
});
console.log('src/utils/logger.ts');
export default log;
