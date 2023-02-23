import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private user: object;
  private readonly logger = new Logger(RequestService.name);

  setUser(user: object) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
}
