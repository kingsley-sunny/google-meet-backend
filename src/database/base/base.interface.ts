export interface FetchQuery {
  search?: string;
  limit?: number;
  startDate?: string | Date;
  endDate?: string | Date;
  endDateCol?: string;
  filterBy?: string;
  page?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface IBase {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IPaginatedInterface {
  previous_page: number;
  current_page: number;
  next_page: number;
  limit: number;
  page_count: number;
  total: number;
}

export interface IPaginatedResponse<T = any> {
  [name: number]: T;
  pagination: IPaginatedInterface;
}
