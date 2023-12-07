export type GetAllResDTO = {
  todos: {
    id: TodoId;
    todo: string;
    completed: boolean;
    userId: UserId;
  }[];
  total: number;
  skip: number;
  limit: number;
};

export type CreateReqDTO = {
  todo: string;
  completed: boolean;
  userId: UserId;
};

export type CreateResDTO = {
  id: TodoId;
  todo: string;
  completed: boolean;
  userId: UserId;
};

export type UpdateReqDTO = {
  todo?: string;
  completed?: boolean;
  userId?: UserId;
};

export type UpdateResDTO = {
  id: TodoId;
  todo: string;
  completed: boolean;
  userId: UserId;
};

export type RemoveResDTO = {
  id: TodoId;
  todo: string;
  completed: boolean;
  userId: UserId;
  isDeleted: boolean;
  deletedOn: ISOTime;
};
