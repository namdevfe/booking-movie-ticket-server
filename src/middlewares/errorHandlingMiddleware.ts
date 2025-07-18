// import { Request, Response, NextFunction } from 'express';
// import { StatusCodes, getReasonPhrase } from 'http-status-codes';
// import Joi from 'joi';
// import ApiError from '~/utils/ApiError'

// // Optional: Define a generic error type
// interface CustomError extends Error {
//   statusCode: number;
//   errors?: Array<{ field: string; message: string }>;
// }

// export const errorHandlingMiddleware = (
//   err: CustomError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Don't proceed if response is already sent
//   if (res.headersSent) {
//     return next(err)
//   }

//   // Handle Joi validation error
//   if (err instanceof Joi.ValidationError) {
//     const validationErrors = err.details.map((item) => ({
//       field: item.path.join('.'),
//       message: item.message,
//     }));

//     res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
//       statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
//       message: 'Validation Error',
//       errors: validationErrors,
//       ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
//     });
//   }

//   // Handle custom ApiError
//   if (err instanceof ApiError) {
//     res.status(err.statusCode).json({
//       statusCode: err.statusCode,
//       message: err.message,
//       ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
//     });
//   }

//   // Default error fallback (unexpected errors)
//   const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
//   const message = err.message || getReasonPhrase(statusCode);

//   res.status(statusCode).json({
//     statusCode,
//     message,
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
//   });
// };

/**
 * Updated by trungquandev.com's author on Sep 27 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 * NOTE: (Muốn hiểu rõ hơn về code trong file này thì vui lòng xem video 55 trong bộ MERN Stack trên kênh Youtube của mình.)
*/

/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi';
// import { env } from '~/config/environment'

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError: any = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack
  }

  if (err instanceof Joi.ValidationError) {
    responseError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY
    responseError.message = 'Validation Error'
    responseError.errors = err.details.map((item: any) => ({
      field: item.path.join('.'),
      message: item.message
    }))
  }

  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi. (Muốn hiểu rõ hơn hãy xem video 55 trong bộ MERN Stack trên kênh Youtube: https://www.youtube.com/@trungquandev)
  // if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file, bắn thông báo lỗi vào group Slack, Telegram, Email...vv Hoặc có thể viết riêng Code ra một file Middleware khác tùy dự án.
  // ...
  // console.error(responseError)

  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError)
}
