import { TableStatus } from "@/types/table.type";
import { SimpleCard } from "../custom/SimpleCard";

type TableCardProps = {
  tableName: string;
  status: TableStatus;
  onClick?: () => void;
};

const TableCard = ({ status, tableName, onClick }: TableCardProps) => {
  const statusColor = {
    AVAILABLE: "bg-green-100",
    RESERVED: "bg-yellow-100",
    PLAYING: "bg-red-100",
  }[status];

  const statusLabel = {
    AVAILABLE: "Có thể chơi",
    RESERVED: "Đã đặt trước / Sửa chữa",
    PLAYING: "Đang chơi",
  }[status];

  return (
    <SimpleCard
      className={statusColor + " text-center cursor-pointer"}
      titleType={
        status === "PLAYING"
          ? "danger"
          : status === "RESERVED"
          ? "warning"
          : "success"
      }
      classContent="space-y-2"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold">{tableName}</h3>
      <p className="text-sm">{statusLabel}</p>
    </SimpleCard>
  );
};

export default TableCard;
