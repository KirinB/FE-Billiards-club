"use client";

import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";

import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStaffColumns } from "./columns";
import { User } from "@/types/user.type";
import { userService } from "@/services/user.service";
import { useDebounce } from "@/hooks/useDebounce";
import DialogCreateUser from "@/components/Dashboard/Users/DialogCreateUser";

export default function StaffModule() {
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "createdAt">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isOpenCreateUser, setIsOpenCreateUser] = useState<boolean>(false);

  const search = useDebounce(searchInput, 500);

  const fetchData = async () => {
    try {
      const data = await userService.getList({
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      });
      setData(data.users);
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

  const { columns, Dialogs } = useStaffColumns(fetchData);

  if (loading)
    return <DataTableSkeleton columnsCount={6} rowsCount={pageSize} />;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">🙋🏻‍♂️ Quản lý nhân viên</h1>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Tìm kiếm tên hoặc email..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            className="w-full"
          />
        </div>

        <Button
          variant="green"
          onClick={() => {
            setIsOpenCreateUser(true);
          }}
        >
          Thêm người dùng
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
      <DialogCreateUser
        isOpen={isOpenCreateUser}
        onSuccess={fetchData}
        setIsOpen={setIsOpenCreateUser}
      />
    </div>
  );
}
