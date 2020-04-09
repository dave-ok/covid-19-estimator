import fs from 'fs';
import path from 'path';

const writeLog = (time, reqType, endpoint, resCode, reqBody) => {
  const resMessage = `\n${reqType}\t\t${endpoint.padEnd(25)}\t\t${resCode}\t\t${time.toString().padStart(12)} ms`;
  fs.appendFile(path.join(process.cwd(), '/src/requests.log'), resMessage, (error) => {
    if (error) {
      throw error;
    }
  });
  fs.appendFile(path.join(process.cwd(), '/src/requests.log'), reqBody, (error) => {
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
    const msTime = totalTime[0] * 1000 + totalTime[1] / 1e6;

    // log to file
    writeLog(msTime, req.method, req.originalUrl, res.statusCode, req.body.toString());
  });

  next();
};
