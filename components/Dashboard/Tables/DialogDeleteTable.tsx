import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { tableService } from "@/services/tables.service";
import { ApiErrorResponse } from "@/types/api.type";
import { BilliardTable } from "@/types/table.type";
import React from "react";
import { toast } from "sonner";

const DialogDeleteTable = ({
  isOpen,
  setIsOpen,
  onSuccess,
  table,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
  table: BilliardTable;
}) => {
  const handleSubmit = async () => {
    try {
      await tableService.delete(table.id);
      toast.success("Xóa bàn thành công!");

      onSuccess();
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    }
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      variant="confirm"
      title="Cảnh báo"
      classNameTitle="w-full"
      onConfirm={handleSubmit}
    >
      Việc xóa <strong>{table.name}</strong> sẽ xóa vĩnh viễn tất cả dữ liệu
      liên quan. Bạn có muốn tiếp tục không?
    </SimpleDialog>
  );
};

export default DialogDeleteTable;
