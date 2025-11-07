"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { billService } from "@/services/bill.service";
import { Bill } from "@/types/bill.type";
import { useDebounce } from "@/hooks/useDebounce";
import { useBillColumns } from "./columns";

export default function BillModule() {
  const [data, setData] = useState<Bill[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "totalAmount">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const search = useDebounce(searchInput, 500);

  const fetchData = async () => {
    try {
      const data = await billService.getList({
        page,
        pageSize,
      });
      setData(data.bills);
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

  const { columns, Dialogs } = useBillColumns(fetchData);

  if (loading)
    return <DataTableSkeleton columnsCount={6} rowsCount={pageSize} />;

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">🧾 Quản lý hóa đơn</h1>

      <div className="flex justify-between items-center gap-2">
        <Input
          placeholder="Tìm kiếm session hoặc nhân viên..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPage(1);
          }}
          className="w-[400px]"
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
