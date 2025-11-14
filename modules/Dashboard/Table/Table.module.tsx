"use client";

import DialogCreateTable from "@/components/Dashboard/Tables/DialogCreateTable";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tableService } from "@/services/tables.service";
import { SortOrder } from "@/types/api.type";
import { BilliardTable, TableType } from "@/types/table.type";
import { useEffect, useState } from "react";
import { useTableColumns } from "./columns";

export default function TableModule() {
  const [data, setData] = useState<BilliardTable[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<TableType>("ALL");
  const [isOpenDialogCreate, setIsOpenDialogCreate] = useState<boolean>(false);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { metaData } = await tableService.getList({
        page,
        pageSize,
        search,
        priceSort,
        type,
      });

      setData(metaData.tables);
      setTotal(metaData.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { Dialogs, columns } = useTableColumns(fetchData);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, search, priceSort, type]);

  if (loading) return <DataTableSkeleton columnsCount={7} rowsCount={5} />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">🎱 Quản lý bàn billiards</h1>

      {/* 🟩 Responsive Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left side filter group */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:flex-row md:items-center">
          <Input
            placeholder="Tìm bàn..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full sm:w-[200px]"
          />

          <Select onValueChange={(v) => setType(v as TableType)} value={type}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Loại bàn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả</SelectItem>
              <SelectItem value="CAROM">CAROM</SelectItem>
              <SelectItem value="POOL">POOL</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setPriceSort(priceSort === "asc" ? "desc" : "asc")}
            className="w-full sm:w-auto"
          >
            Sắp xếp giá: {priceSort === "asc" ? "Tăng dần" : "Giảm dần"}
          </Button>
        </div>

        {/* Right side button */}
        <Button
          variant="green"
          className="w-full sm:w-auto"
          onClick={() => setIsOpenDialogCreate(true)}
        >
          Thêm bàn
        </Button>

        <DialogCreateTable
          isOpen={isOpenDialogCreate}
          setIsOpen={setIsOpenDialogCreate}
          onSuccess={fetchData}
        />
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
    </div>
  );
}
