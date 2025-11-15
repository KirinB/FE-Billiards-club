export interface Member {
  id: number;
  name: string;
  phone: string;
  email: string;
  totalPoints: number;
  memberLevel: MemberLevel;
  createdAt: string;
  updatedAt: string;
}

export type MemberLevel = "BRONZE" | "SILVER" | "GOLD" | "DIAMOND";

export type MemberGetListParams = {
  page: number;
  pageSize: number;
  name: string;
};

export type MemberGetListResponse = {
  members: Member[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
};

export type MemberCreatePayload = {
  phone: string;
  name?: string | null;
  email?: string | null;
};

export type MemberCreateResponse = {
  member: Member;
};

export interface MemberUpdatePayload extends MemberCreatePayload {}

export interface MemberUpdateResponse extends MemberCreateResponse {}
