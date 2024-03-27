import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';


@Controller('user')
export class UserController {
  private readonly items: any[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  @GrpcMethod('UsersService', 'FindOne')
  findOne(data: any): any {
    const a = this.items.find(({ id }) => id === data.id);
    console.log('findone', a);
    return a;
  }

  @GrpcStreamMethod('UsersService', 'FindMany')
  findMany(data$: Observable<any>): Observable<any> {
    console.log(data$);
    const hero$ = new Subject<any>();

    const onNext = (heroById: any) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      if (item) {
        hero$.next(item);
        hero$.complete();
      }
    };
    const onComplete = () => hero$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });
    console.log('here');
    return hero$.asObservable();
  }
}
