import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    {
      const request = context.switchToHttp().getRequest();
      const userAgent = request.get('user-agent') || '';
      const { ip, method, path: url } = request;
      console.log(
        `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${
          context.getHandler().name
        } invoked...`,
      );
      return next.handle().pipe(
        map((data) => {
          let messageStatusCode: number;
          let messageString: string;

          if (data.status) {
            messageStatusCode = data.status;
            context.switchToHttp().getResponse().statusCode = messageStatusCode;
          }
          if (data.message) {
            messageString = data.message;
          }

          delete data.status;
          delete data.message;
          return {
            ...data,
            statusCode: messageStatusCode,
            message: messageString,
          };
        }),
      );
    }
  }
}
