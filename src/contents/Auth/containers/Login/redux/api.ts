/* eslint-disable import/prefer-default-export */
import Api from '@utils/api';
import { ILogInInput } from './model';

export const realtorLoginApi = (data: ILogInInput) => Api.post('/auth/login', data);
