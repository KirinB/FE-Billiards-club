"use client";

import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { MenuItem } from "@/types/menu-item.type";
import { useMenuItemColumns } from "./columns";
import { menuItemService } from "@/services/menu-item.service";
import DialogCreateMenuItem from "@/components/Dashboard/menu-item/DialogCreateMenuItem";

export default function MenuItemModule() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const search = useDebounce(searchInput, 500);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await menuItemService.getList({
        page,
        pageSize,
        name: search,
      });
      setData(result.items);
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

  const { columns, Dialogs } = useMenuItemColumns(fetchData);

  if (loading)
    return <DataTableSkeleton columnsCount={6} rowsCount={pageSize} />;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">🍜 Quản lý Món ăn/Đồ uống</h1>

      {/* Toolbar */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Tìm kiếm theo tên món..."
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
            setIsOpenCreate(true);
          }}
        >
          Thêm Món ăn
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
      <DialogCreateMenuItem
        isOpen={isOpenCreate}
        onSuccess={fetchData}
        setIsOpen={setIsOpenCreate}
      />
    </div>
  );
}
