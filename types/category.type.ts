export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryListResponse = {
  categories: Category[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
};

export type CategoryListResponseWithoutPagination = {
  categories: Category[];
};

export type CategoryGetListParams = {
  page: number;
  pageSize: number;
  name: string;
};

export type CategoryUpdatePayload = {
  name: string;
};

export type CategoryUpdateResponse = {
  category: Category;
};

export type CategoryCreatePayload = {
  name: string;
};

export type CategoryCreateResponse = {
  category: Category;
};
