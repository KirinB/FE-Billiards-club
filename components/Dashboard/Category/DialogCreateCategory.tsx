import { FormInput } from "@/components/custom/form/FormInput";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import { ApiErrorResponse } from "@/types/api.type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createCategorySchema = z.object({
  name: z.string().nonempty(),
});

type ICreateCategorySchema = z.infer<typeof createCategorySchema>;

const DialogCreateCategory = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<ICreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: ICreateCategorySchema) => {
    setIsSubmitting(true);
    try {
      await categoryService.create(data);
      onSuccess();
      setIsOpen(false);
      formMethods.reset();
      toast.success("Tạo mới danh mục thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SimpleDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Tạo mới danh mục món ăn"
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
            {isSubmitting ? "Đang tạo mới..." : "Tạo mới danh mục"}
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogCreateCategory;
