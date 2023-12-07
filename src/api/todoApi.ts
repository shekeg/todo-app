import { apiClient } from './apiClient';
import type {
  GetAllResDTO,
  CreateReqDTO,
  CreateResDTO,
  UpdateReqDTO,
  UpdateResDTO,
  RemoveResDTO,
} from './types.ts';

export const todoApi = {
  getAll(): Promise<GetAllResDTO> {
    return apiClient.get('/todos').then((res) => res.data);
  },

  create(payload: CreateReqDTO): Promise<CreateResDTO> {
    return apiClient.post('/todos/add', payload).then((res) => res.data);
  },

  update(id: TodoId, payload: UpdateReqDTO): Promise<UpdateResDTO> {
    return apiClient.patch(`/todos/${id}`, payload).then((res) => res.data);
  },

  remove(id: TodoId): Promise<RemoveResDTO> {
    return apiClient.delete(`/todos/${id}`).then((res) => res.data);
  },
};
