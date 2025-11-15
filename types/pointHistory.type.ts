import { Member } from "./member.type";
import { User } from "./user.type";

export interface GetListPointHistoryQuery {
  page?: number;
  pageSize?: number;
  type?: PointType;
}

export type PointTypeDB = "EARN" | "REDEEM" | "ADJUST";
export type PointType = PointTypeDB | "ALL";

export interface PointHistory {
  id: number;
  memberId: number;
  staffId: number;
  type: PointTypeDB;
  points: number;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
  member?: Member;
  staff?: User;
}

export interface GetListPointHistoryResponse {
  page: number;
  total: number;
  pageSize: number;
  totalPage: number;
  pointHistories: PointHistory[];
}

export interface CreatePointHistoryPayload {
  memberPhone: string;
  type: PointTypeDB;
  points: number;
}

export interface CreatePointHistoryResponse {
  pointHistory: PointHistory;
}

export interface GetDetailPointHistoryResponse {
  pointHistory: PointHistory;
}

export type UpdatePointHistoryPayload = Partial<CreatePointHistoryPayload>;

export interface UpdatePointHistoryResponse {
  pointHistory: PointHistory;
}
