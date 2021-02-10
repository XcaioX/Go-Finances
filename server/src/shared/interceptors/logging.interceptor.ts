import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()

    return next.handle().pipe(
      map(data => ({
        timestamp: Date.now(),
        path: request.url,
        data
      }))
    )
  }
}
