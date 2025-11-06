import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { userService } from "@/services/user.service";
import { ApiErrorResponse } from "@/types/api.type";
import { User } from "@/types/user.type";
import { toast } from "sonner";

const DialogDeleteUser = ({
  isOpen,
  setIsOpen,
  onSuccess,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
  user: User;
}) => {
  const handleSubmit = async () => {
    try {
      const res = await userService.delete(user.id);
      onSuccess();
      toast.success("Xóa tài khoản thành công!");
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
      Việc xóa <strong>{user.username}</strong> sẽ xóa vĩnh viễn tất cả dữ liệu
      liên quan. Bạn có muốn tiếp tục không?
    </SimpleDialog>
  );
};

export default DialogDeleteUser;
