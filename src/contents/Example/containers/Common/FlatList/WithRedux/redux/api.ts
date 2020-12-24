/* eslint-disable import/prefer-default-export */
import Api from '@utils/api';

export const fetchProducts = (queryString: string) => Api.get(`/services?${queryString}`);

export const fetchProductById = (id: number = 1) => Api.get(`/services/${id}`);
