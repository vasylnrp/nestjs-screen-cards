import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // TODO classtoplain here replace with non deprecated
    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}
