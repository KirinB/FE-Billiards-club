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

// Mock API
// const mockApi = async ({
//   page,
//   pageSize,
//   search,
//   sortBy,
//   sortOrder,
// }: {
//   page: number;
//   pageSize: number;
//   search: string;
//   sortBy?: "name" | "email" | "createdAt";
//   sortOrder?: "asc" | "desc";
// }) => {
//   const mockData: User[] = [
//     {
//       id: 8,
//       name: "minh nhan",
//       email: "kirin2@gmail.com",
//       username: "Kirin2",
//       role: "STAFF",
//       createdAt: "2025-10-31T05:21:57.094Z",
//     },
//     {
//       id: 7,
//       name: "minh nhan",
//       email: "kirin72@gmail.com",
//       username: "Kirin72",
//       role: "STAFF",
//       createdAt: "2025-10-31T05:20:23.877Z",
//     },
//     {
//       id: 6,
//       name: "Admin",
//       email: "admin@example.com",
//       username: "admin",
//       role: "ADMIN",
//       createdAt: "2025-10-30T04:15:10.000Z",
//     },
//     {
//       id: 5,
//       name: "Nguyen Van A",
//       email: "a@gmail.com",
//       username: "a",
//       role: "STAFF",
//       createdAt: "2025-10-29T03:12:11.000Z",
//     },
//     {
//       id: 4,
//       name: "Nguyen Van B",
//       email: "b@gmail.com",
//       username: "b",
//       role: "STAFF",
//       createdAt: "2025-10-28T02:10:05.000Z",
//     },
//   ];

//   // Filter search
//   let filtered = mockData.filter(
//     (user) =>
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   // Sort
//   if (sortBy) {
//     filtered.sort((a, b) => {
//       const aVal = a[sortBy];
//       const bVal = b[sortBy];
//       if (sortOrder === "asc") {
//         return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
//       } else {
//         return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
//       }
//     });
//   }

//   // Pagination
//   const total = filtered.length;
//   const start = (page - 1) * pageSize;
//   const end = start + pageSize;
//   const users = filtered.slice(start, end);

//   return {
//     success: true,
//     message: "Fetched successfully",
//     metaData: {
//       users,
//       total,
//       page,
//       pageSize,
//       totalPages: Math.ceil(total / pageSize),
//     },
//   };
// };

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
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Tìm kiếm tên hoặc email..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            className="w-[500px]"
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
