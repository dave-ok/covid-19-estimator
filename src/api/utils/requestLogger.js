import fs from 'fs';
import path from 'path';

const url = require('url');

const writeLog = (time, reqType, endpoint, resCode) => {
  const resMessage = `${reqType.padEnd(7)}${endpoint.padEnd(25)}\t\t${resCode}\t\t${time.padStart(4)}ms\n`;
  fs.appendFile(path.join(process.cwd(), '/src/requests.log'), resMessage, (error) => {
    if (error) {
      throw error;
    }
  });
};

// logger middleware
export default (req, res, next) => {
  const reqTime = process.hrtime();

  res.on('finish', () => {
    const totalTime = process.hrtime(reqTime);
    const msTime = Math.round(totalTime[0] * 1000 + totalTime[1] / 1e6).toString().padStart(2, '0');

    // log to file skip not founds
    if (res.statusCode !== 404) {
      writeLog(msTime, req.method, url.parse(req.originalUrl).pathname, res.statusCode);
    }
  });

  next();
};
