"use client";

import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { pointHistoryService } from "@/services/pointHistory.service";
import { ApiErrorResponse } from "@/types/api.type";
import { PointHistory } from "@/types/pointHistory.type";
import { toast } from "sonner";

const DialogDeletePoint = ({
  isOpen,
  setIsOpen,
  onSuccess,
  point,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
  point: PointHistory;
}) => {
  const handleSubmit = async () => {
    try {
      await pointHistoryService.delete(point.id);
      toast.success("Xóa điểm thành công!");
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
      Việc xóa <strong>{point.id}</strong> sẽ xóa vĩnh viễn dữ liệu điểm này.
      Bạn có muốn tiếp tục không?
    </SimpleDialog>
  );
};

export default DialogDeletePoint;
