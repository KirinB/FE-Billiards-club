"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect, Option } from "@/components/custom/MultiSelect";

interface FormMultiSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
}

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  name,
  label,
  placeholder = "Chọn một hoặc nhiều giá trị",
  options,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MultiSelect
              options={options}
              value={field.value || []}
              onChange={(values) =>
                field.onChange(
                  values.map((v) => (typeof v === "string" ? Number(v) : v))
                )
              }
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
