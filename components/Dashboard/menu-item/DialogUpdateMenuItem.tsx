"use client";

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
import { MenuItem, MenuItemUpdatePayload } from "@/types/menu-item.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateMenuItemSchema = z.object({
  name: z.string().nonempty(),
  price: z.number(),
  available: z.boolean(),
  categoryId: z.number().nullable(),
  menuIds: z.array(z.number()).optional(),
});

type IUpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>;

const DialogUpdateMenuItem = ({
  isOpen,
  setIsOpen,
  menuItem,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuItem: MenuItem;
  onSuccess: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<
    { label: string; value: number }[]
  >([]);
  const [menus, setMenus] = useState<{ label: string; value: number }[]>([]);

  const formMethods = useForm<IUpdateMenuItemSchema>({
    resolver: zodResolver(updateMenuItemSchema),
    defaultValues: {
      name: menuItem.name,
      available: menuItem.available,
      categoryId: menuItem.categoryId,
      menuIds: menuItem.menus.map((item) => item.menuId),
      price: menuItem.price,
    },
  });

  const handleSubmit = async (data: IUpdateMenuItemSchema) => {
    // console.log(data);
    try {
      await menuItemService.update(menuItem.id, data as MenuItemUpdatePayload);
      onSuccess();
      toast.success("Cập nhật món ăn/thức uống thành công!");
    } catch (error) {}
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
        const err = error as ApiErrorResponse;
        toast.error(err.message);
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

export default DialogUpdateMenuItem;
