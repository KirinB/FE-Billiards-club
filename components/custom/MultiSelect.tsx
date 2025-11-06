"use client";

import * as React from "react";
import { X, ChevronsUpDown, BadgeX, BadgeCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export type Option = {
  label: string;
  value: string | number;
};

interface MultiSelectProps {
  options: Option[];
  value: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Chọn...",
      label,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const toggleValue = (val: string | number) => {
      if (value.includes(val)) {
        onChange(value.filter((v) => v !== val));
      } else {
        onChange([...value, val]);
      }
    };

    const removeValue = (val: string | number, e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(value.filter((v) => v !== val));
    };

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)}>
        {label && <label className="text-sm font-medium">{label}</label>}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full flex-wrap h-auto min-h-10 px-3 py-1"
            >
              {value.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {value.map((val) => {
                    const opt = options.find(
                      (o) => String(o.value) === String(val)
                    );
                    return (
                      <span
                        key={val}
                        className="flex items-center bg-secondary text-secondary-foreground rounded-md text-xs h-6"
                      >
                        <span className="pl-2 pr-1 py-0.5">
                          {opt?.label ?? val}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => removeValue(val, e)}
                          className="ml-1 mr-1 p-1 rounded-r-md transition-colors hover:cursor-pointer hover:text-destructive/50"
                          aria-label={`Remove ${opt?.label ?? val}`}
                        >
                          <BadgeX className="w-3 h-3 shrink-0" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0 ml-auto" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
            <Command>
              <CommandInput placeholder="Tìm kiếm..." />
              <CommandEmpty>Không có kết quả.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => {
                  const selected = value.includes(opt.value);
                  return (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => toggleValue(opt.value)}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      {selected && (
                        <span className="text-xs font-medium">
                          <BadgeCheckIcon className="text-green-active" />
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
