import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { categoryService } from "@/services/category.service";
import { ApiErrorResponse } from "@/types/api.type";
import { Category } from "@/types/category.type";
import { toast } from "sonner";

const DialogDeleteCategory = ({
  isOpen,
  setIsOpen,
  onSuccess,
  category,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
  category: Category;
}) => {
  const handleSubmit = async () => {
    try {
      const res = await categoryService.delete(category.id);
      // console.log(res.message);
      onSuccess();
      toast.success("Xóa danh mục món thành công!");
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
      Việc xóa <strong>{category.name}</strong> sẽ xóa vĩnh viễn tất cả dữ liệu
      liên quan. Bạn có muốn tiếp tục không?
    </SimpleDialog>
  );
};

export default DialogDeleteCategory;
