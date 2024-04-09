import { Request, Response } from 'express';

export const sendErrorResponse = (
  req: Request,
  res: Response,
  message: string,
  statusCode: number = 500,
  acceptType: string = 'application/json'
) => {
  let imageUrl = `https://httpstatusdogs.com/img/${statusCode}.jpg`;
  let requestAccept = req.headers.accept || acceptType;

  if ( requestAccept.includes('html') ) {
    res.status(statusCode).render('error', {
      status: statusCode,
      message: message || 'An unexpected error occurred',
      imageUrl: imageUrl
    });
  } else {
    res.status(statusCode).json({
      error: true,
      statusCode,
      message
    });
  }
};
