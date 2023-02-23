import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PrincipalGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      return true;
    }
    return false;
  }
}
