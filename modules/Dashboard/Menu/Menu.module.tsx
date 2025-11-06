// @/app/dashboard/menu/MenuModule.tsx (Đã sửa đổi)
"use client";

import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Menu } from "@/types/menu.type";
import { useMenuColumns } from "./columns";
import { menuService } from "@/services/menu.service";
import DialogCreateMenu from "@/components/Dashboard/Menu/DialogCreateMenu";

export default function MenuModule() {
  const [data, setData] = useState<Menu[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [isOpenCreateMenu, setIsOpenCreateMenu] = useState<boolean>(false);

  // Loại bỏ state sortBy và sortOrder
  // const [sortBy, setSortBy] = useState<"name" | "createdAt" | "updatedAt">("name");
  // const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const search = useDebounce(searchInput, 500);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await menuService.getList({
        page,
        pageSize,
        name: search,
      });

      setData(result.menus);
      setTotal(result.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, search]);

  const { columns, Dialogs } = useMenuColumns(fetchData);

  if (loading)
    return <DataTableSkeleton columnsCount={6} rowsCount={pageSize} />;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">🍽️ Quản lý Thực đơn</h1>

      {/* Toolbar */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Tìm kiếm theo tên Menu..."
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
            setIsOpenCreateMenu(true);
          }}
        >
          Thêm thực đơn
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
      <DialogCreateMenu
        isOpen={isOpenCreateMenu}
        onSuccess={fetchData}
        setIsOpen={setIsOpenCreateMenu}
      />
    </div>
  );
}
