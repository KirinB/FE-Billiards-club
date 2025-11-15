"use client";

import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";

import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Member } from "@/types/member.type";
import { useDebounce } from "@/hooks/useDebounce";
import { memberService } from "@/services/member.service";
import { useMemberColumns } from "./columns";
import DialogCreateMember from "@/components/Dashboard/Member/DialogCreateMember";

export default function MemberModule() {
  const [data, setData] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "phone" | "createdAt">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);

  const search = useDebounce(searchInput, 500);

  const fetchData = async () => {
    try {
      const data = await memberService.getList({
        page,
        pageSize,
        name: searchInput,
      });
      setData(data.members);
      setTotal(data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page, pageSize, search, sortBy, sortOrder]);

  const { columns, Dialogs } = useMemberColumns(fetchData);

  if (loading)
    return <DataTableSkeleton columnsCount={6} rowsCount={pageSize} />;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">👤 Quản lý thành viên</h1>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <Input
          placeholder="Tìm kiếm tên hoặc số điện thoại..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPage(1);
          }}
          className="w-full"
        />

        <Button variant="green" onClick={() => setIsOpenCreate(true)}>
          Thêm thành viên
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {Dialogs}

      <DialogCreateMember
        isOpen={isOpenCreate}
        onSuccess={fetchData}
        setIsOpen={setIsOpenCreate}
      />
    </div>
  );
}
