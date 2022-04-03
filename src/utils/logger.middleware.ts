import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  async use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request;
    //console.log(JSON.stringify(request.body.query))
    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${
          request.get('x-forwarded-for') || 'UnKnown ip'
        }`,
      );
    });
    next();
  }
}
