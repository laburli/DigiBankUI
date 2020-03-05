import { Customer } from "./../customers/customer";
export class User {
  id: number;
  username: string;
  customerId: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  customer: Customer;
}
