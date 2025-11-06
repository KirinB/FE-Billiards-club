import { FormInput } from "@/components/custom/form/FormInput";
import { FormMultiSelect } from "@/components/custom/form/FormMultiSelect";
import { FormSelect } from "@/components/custom/form/FormSelect";
import { FormSwitch } from "@/components/custom/form/FormSwitch";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import { menuItemService } from "@/services/menu-item.service";
import { menuService } from "@/services/menu.service";
import { ApiErrorResponse } from "@/types/api.type";
import { MenuItemCreatePayload } from "@/types/menu-item.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createMenuItemSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().min(1000),
  available: z.boolean(),
  categoryId: z.number().nullable(),
  menuIds: z.array(z.number()).optional(),
});

type ICreateMenuItemSchema = z.infer<typeof createMenuItemSchema>;

const DialogCreateMenuItem = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<
    { label: string; value: number }[]
  >([]);
  const [menus, setMenus] = useState<{ label: string; value: number }[]>([]);

  const formMethods = useForm<ICreateMenuItemSchema>({
    resolver: zodResolver(createMenuItemSchema),
    defaultValues: {
      name: "",
      available: true,
      categoryId: null,
      menuIds: [],
      price: 0,
    },
  });

  const handleSubmit = async (data: ICreateMenuItemSchema) => {
    setIsSubmitting(true);
    console.log(data);

    try {
      await menuItemService.create(data as MenuItemCreatePayload);
      formMethods.reset();
      setIsOpen(false);
      onSuccess();
      toast.success("Tạo mới món ăn/thức uống thành công!");
    } catch (error) {
      const err = error as ApiErrorResponse;
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, menuRes] = await Promise.all([
          categoryService.getAllCategories(),
          menuService.getAllMenus(),
        ]);

        setCategories(
          catRes.categories.map((cat: any) => ({
            label: cat.name,
            value: cat.id,
          }))
        );

        setMenus(
          menuRes.menus.map((menu: any) => ({
            label: menu.name,
            value: menu.id,
          }))
        );
      } catch (error) {
        console.error("❌ Lỗi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <SimpleDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Cập nhật món ăn">
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormInput
            name="name"
            label="Tên món ăn"
            placeholder="Nhập tên món ăn"
          />

          <FormInput
            name="price"
            label="Giá món ăn"
            type="number"
            placeholder="Nhập giá món ăn"
          />

          <FormSelect
            name="categoryId"
            label="Danh mục món ăn"
            placeholder="Chọn danh mục"
            options={categories}
          />

          <FormMultiSelect
            name="menuIds"
            label="Menu liên quan"
            placeholder="Chọn menu"
            options={menus}
          />

          <FormSwitch
            name="available"
            label="Trạng thái món"
            description="Bật nếu món đang sẵn có"
          />

          <Button type="submit" className="w-full">
            {isSubmitting ? "Đang cập nhật..." : "Cập nhật thông tin"}
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogCreateMenuItem;
