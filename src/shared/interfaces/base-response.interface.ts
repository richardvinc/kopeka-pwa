export interface BaseResponse<T> {
  data: T;
}

export interface BaseResponsePagination<T> {
  data: T;
  nextToken: string | null;
}
