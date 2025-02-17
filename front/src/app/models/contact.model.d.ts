import { Base } from './base.model';

export interface Contact extends Base {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  message: string;
}
