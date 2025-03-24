import * as dotenv from 'dotenv';
import app from './index';
import config from './config';

dotenv.config();

app.listen(config.port, () => {
  console.log(`server is running on http://localhost:${config.port}`);
});
