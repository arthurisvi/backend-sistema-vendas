import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import authConfig from "@config/auth";

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('É necessário o envio de um token na requisição.');
  }

  const [, token] = authHeader.split(' ');
  
  try {
    
    verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError('Token inválido.');
  }
}