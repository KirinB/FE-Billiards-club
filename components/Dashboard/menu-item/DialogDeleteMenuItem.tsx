import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { menuItemService } from "@/services/menu-item.service";
import { ApiErrorResponse } from "@/types/api.type";
import { MenuItem } from "@/types/menu-item.type";
import { toast } from "sonner";

const DialogDeleteMenuItem = ({
  isOpen,
  setIsOpen,
  onSuccess,
  menuItem,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
  menuItem: MenuItem;
}) => {
  const handleSubmit = async () => {
    try {
      await menuItemService.delete(menuItem.id);

      onSuccess();
      toast.success("Xóa món ăn/thức uống thành công!");
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
      Việc xóa <strong>{menuItem.name}</strong> sẽ xóa vĩnh viễn tất cả dữ liệu
      liên quan. Bạn có muốn tiếp tục không?
    </SimpleDialog>
  );
};

export default DialogDeleteMenuItem;
