// components/data-table-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Skeleton này sẽ mô phỏng lại Data Table của bạn
export function DataTableSkeleton({
  columnsCount = 7,
  rowsCount = 5,
}: {
  columnsCount?: number;
  rowsCount?: number;
}) {
  // Tạo mảng giả lập số lượng cột và hàng
  const columnArray = Array.from({ length: columnsCount });
  const rowArray = Array.from({ length: rowsCount });

  return (
    <div className="space-y-4 p-6">
      {/* 1. Thanh Toolbar Skeleton */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {/* Input Search Skeleton */}
          <Skeleton className="h-10 w-[200px]" />
          {/* Select Skeleton */}
          <Skeleton className="h-10 w-[150px]" />
          {/* Button Sort Skeleton */}
          <Skeleton className="h-10 w-[120px]" />
        </div>
        {/* Button Thêm bàn Skeleton */}
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* 2. Bảng Dữ liệu Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columnArray.map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-1/2" /> {/* Header Text */}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowArray.map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columnArray.map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-full" /> {/* Cell Content */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3. Phân trang Skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          <Skeleton className="h-4 w-[150px]" /> {/* Text Trang x/y */}
        </div>
        <div className="space-x-2">
          <Skeleton className="h-8 w-20" /> {/* Previous Button */}
          <Skeleton className="h-8 w-20" /> {/* Next Button */}
        </div>
      </div>
    </div>
  );
}
