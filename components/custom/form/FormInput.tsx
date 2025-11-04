"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              value={field.value ?? ""}
              onChange={(e) => {
                const value =
                  type === "number" ? Number(e.target.value) : e.target.value;
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
