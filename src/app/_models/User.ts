import { Customer } from "./../customers/customer";
import { Account } from "./Account";
export class User {
  id: number;
  username: string;
  customerId: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  customer: Customer;
  account: Account[];
}
