import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'

const globalErrorHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'Something went wrong!!'
  const errorMessages: IGenericErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
