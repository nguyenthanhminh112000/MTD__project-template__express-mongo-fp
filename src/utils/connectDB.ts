import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

const connectDB = async () => {
  const dbUri = config.get<string>('dbUri');
  try {
    await mongoose.connect(dbUri);
    log.info('Connect to database successfully');
  } catch (error: any) {
    log.error(`Could not connect to  database with error: ${error.message}`);
    process.exit(1);
  }
};
console.log('src/utils/connecDB.ts outside');

export default connectDB;
