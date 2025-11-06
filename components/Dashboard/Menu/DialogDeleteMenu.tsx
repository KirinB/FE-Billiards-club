import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { menuService } from "@/services/menu.service";
import { tableService } from "@/services/tables.service";
import { ApiErrorResponse } from "@/types/api.type";
import { Menu } from "@/types/menu.type";
import { toast } from "sonner";

const DialogDeleteMenu = ({
  isOpen,
  setIsOpen,
  onSuccess,
  menu,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
  menu: Menu;
}) => {
  const handleSubmit = async () => {
    try {
      const res = await menuService.delete(menu.id);
      console.log(res.message);
      onSuccess();
      toast.success("Xóa thực đơn thành công!");
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
      Việc xóa <strong>{menu.name}</strong> sẽ xóa vĩnh viễn tất cả dữ liệu liên
      quan. Bạn có muốn tiếp tục không?
    </SimpleDialog>
  );
};

export default DialogDeleteMenu;
