"use client";

import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { billService } from "@/services/bill.service";
import { Bill } from "@/types/bill.type";
import { toast } from "sonner";

const DialogDeleteBill = ({
  bill,
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  bill: Bill;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
}) => {
  const handleSubmit = async () => {
    try {
      await billService.delete(bill.id);
      toast.success("Xóa hóa đơn thành công!");
      onSuccess();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      variant="confirm"
      title="Cảnh báo"
      onConfirm={handleSubmit}
    >
      Việc xóa hóa đơn <strong>#{bill.id}</strong> sẽ xóa vĩnh viễn tất cả dữ
      liệu liên quan. Bạn có muốn tiếp tục không?
    </SimpleDialog>
  );
};

export default DialogDeleteBill;
