import { Response } from 'express';
import status from 'http-status';

export default {
  success: (res: Response, message: string, code: number, data: object) =>
    res.status(code).json({
      status: 'success',
      message,
      code,
      data: data || [],
    }),

  error: (res: Response, message = '', code = 500, label = '') => {
    const msg = code === 500 ? 'Internal Server Error' : message;
    console.log(`${message} - ${code} - ${label}`);
    return res.status(code).json({
      status: 'error',
      message: msg,
      code,
    });
  },
};
