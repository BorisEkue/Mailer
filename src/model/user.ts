import { Moment } from 'moment'

export interface Credentials {
  id: number;
  accessToken: string;
  expiresAt: Moment;
}

export interface UserInfos {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt?: Moment;
  updatedAt?: Moment;
}
