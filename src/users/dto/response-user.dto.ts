import { UserInterface } from '../../schemas/schema.user';
export class UserOutputDTO {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  static FromUserOutput(user: UserInterface) {
    const output = new UserOutputDTO();

    const exposedkeys = [
      '_id',
      'first_name',
      'last_name',
      'email',
      'password',
      'created_at',
    ];
    return exposedkeys.map((key) => output[key] === user[key]);
  }
}
