import { FormInput } from "@/components/custom/form/FormInput";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import { ApiErrorResponse } from "@/types/api.type";
import { Category } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateCategorySchema = z.object({
  name: z.string().nonempty(),
});

type IUpdateCategorySchema = z.infer<typeof updateCategorySchema>;

const DialogUpdateCategory = ({
  isOpen,
  setIsOpen,
  category,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: Category;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<IUpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
    },
  });

  const handleSubmit = async (data: IUpdateCategorySchema) => {
    setIsSubmitting(true);
    try {
      await categoryService.update(category.id, data);
      onSuccess();
      setIsOpen(false);
      toast.success("Cập nhật danh mục món thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SimpleDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Cập nhật danh mục món ăn"
      >
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormInput
              name="name"
              label="Tên danh mục món ăn"
              placeholder="Nhập tên danh mục món ăn"
            />

            <Button type="submit" className="w-full">
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </Button>
          </form>
        </FormProvider>
      </SimpleDialog>
    </>
  );
};

export default DialogUpdateCategory;
