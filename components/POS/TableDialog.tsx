"use client";
import { BilliardTable } from "@/types/table.type";
import { SimpleDialog } from "../custom/SimpleDialog";
import { useEffect, useState } from "react";

type TableDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  table: BilliardTable;
  onStartSession?: () => void;
  onEndSession?: () => void;
};

const TableDialog = ({
  isOpen,
  setIsOpen,
  table,
  onStartSession,
  onEndSession,
}: TableDialogProps) => {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (!isOpen || !table.currentSession) return;

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(table.currentSession!.startTime);
      const diffMs = now.getTime() - start.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setDuration(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, table.currentSession]);

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`${table.name}`}
      variant="confirm"
      confirmText={
        table.status === "PLAYING" ? "Kết thúc giờ chơi" : "Mở giờ chơi"
      }
      onConfirm={table.status === "PLAYING" ? onEndSession : onStartSession}
      cancelText="Đóng"
      confirmVariant={table.status === "PLAYING" ? "destructive" : "green"}
    >
      <p className="mb-2 text-sm">
        Trạng thái:{" "}
        <span
          className={
            table.status === "PLAYING"
              ? "text-red-600"
              : table.status === "RESERVED"
              ? "text-yellow-600"
              : "text-green-600"
          }
        >
          {table.status === "PLAYING"
            ? "Đang chơi"
            : table.status === "RESERVED"
            ? "Đã đặt trước / Sửa chữa"
            : "Có thể chơi"}
        </span>
      </p>

      {table.status === "PLAYING" && table.currentSession && (
        <div className="text-sm space-y-1">
          <p>Thời gian chơi: {duration}</p>
          <p>Số order đã gọi: {table.currentSession?._count?.orders ?? 0}</p>
        </div>
      )}

      {table.status === "RESERVED" && (
        <p className="text-sm">Bàn đang được đặt trước hoặc đang sửa chữa.</p>
      )}

      {table.status === "AVAILABLE" && (
        <p className="text-sm">Bàn sẵn sàng cho khách vào chơi.</p>
      )}
    </SimpleDialog>
  );
};

export default TableDialog;
