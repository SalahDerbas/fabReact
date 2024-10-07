import { Paginate } from './api-paginate';

export interface ApiResponseDone<T = any> {
	data: T;
	status: boolean;
	message: string;
	code: number;
	paginate: Paginate;
}
