"use client";

import { FormInput } from "@/components/custom/form/FormInput";
import { FormSelect } from "@/components/custom/form/FormSelect";
import { SimpleDialog } from "@/components/custom/SimpleDialog";
import { Button } from "@/components/ui/button";
import { tableService } from "@/services/tables.service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import z from "zod";

const createTableSchema = z.object({
  name: z.string().min(1, "Tên bàn không được để trống"),
  type: z.enum(["POOL", "CAROM"]),
  pricePerHour: z.number().min(1000, "Giá tối thiểu 1000 VND"),
});

type ICreateTableSchema = z.infer<typeof createTableSchema>;

const DialogCreateTable = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) => {
  const formMethods = useForm<ICreateTableSchema>({
    resolver: zodResolver(createTableSchema),
    defaultValues: {
      name: "",
      type: "POOL",
      pricePerHour: 0,
    },
  });

  const handleSubmit = async (data: ICreateTableSchema) => {
    try {
      const res = await tableService.create(data);
      console.log(res.table);
      onSuccess();
      setIsOpen(false);
      formMethods.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Tạo mới bàn">
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormInput name="name" label="Tên bàn" placeholder="Nhập tên bàn" />
          <FormSelect
            name="type"
            label="Loại bàn"
            options={[
              { label: "Pool", value: "POOL" },
              { label: "Carom", value: "CAROM" },
            ]}
          />
          <FormInput
            name="pricePerHour"
            label="Giá theo giờ"
            placeholder="Nhập giá (VND)"
            type="number"
          />

          <Button type="submit" className="w-full">
            Tạo mới
          </Button>
        </form>
      </FormProvider>
    </SimpleDialog>
  );
};

export default DialogCreateTable;
