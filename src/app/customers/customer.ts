export class Customer {
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }

  public customerStatus: string;
  public customerName: string;
  public lastName: string;
  public middleName: string;
  public sendCatalog: string;

  public email: string;
  public addressId: number;
  public addressType: string;
  public isPrimary: string;
  public doorNumber: string;
  public landMark: string;
  public street: string;
  public customerId: string;
  public city: string;
  public state: string;
  public country: string;
  public pinCode: string;

  public emailId?: number;
  public emailType: string;
  public emailAdress: string;
  public isPrimaryEmail: false;

  public phoneNumberId?: number;
  public isPrimaryNumber = false;
  public phoneNumberType: string;
  public number: string;
  public countryCode: number;
  public cityCode: number;
}
