"use client";

import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Category } from "@/types/category.type";
import { useCategoryColumns } from "./columns";
import { categoryService } from "@/services/category.service";
import DialogCreateCategory from "@/components/Dashboard/Category/DialogCreateCategory";

export default function CategoryModule() {
  const [data, setData] = useState<Category[]>([]);
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
      const result = await categoryService.getList({
        page,
        pageSize,
        name: search,
      });

      setData(result.categories);
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

  const { columns, Dialogs } = useCategoryColumns(fetchData);

  if (loading)
    return <DataTableSkeleton columnsCount={5} rowsCount={pageSize} />;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">🏷️ Quản lý Danh mục Món ăn</h1>

      {/* Toolbar */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Tìm kiếm theo tên danh mục..."
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
          Thêm Danh mục
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
      <DialogCreateCategory
        isOpen={isOpenCreate}
        onSuccess={fetchData}
        setIsOpen={setIsOpenCreate}
      />
    </div>
  );
}
