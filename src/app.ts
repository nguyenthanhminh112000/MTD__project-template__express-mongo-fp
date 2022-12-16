import express from 'express';
import config from 'config';
import routes from './routers';
import connectDB from './utils/connectDB';
import logger from './utils/logger';

const app = express();
app.use(express.json());

const PORT = config.get<number>('port');
app.listen(PORT, () => {
  logger.info(`App is running on  port ${PORT}`);
  routes(app);
  connectDB();
}); 

console.log('src/app.ts');
