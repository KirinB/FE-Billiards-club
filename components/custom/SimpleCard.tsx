import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("rounded-[12px] shadow-md overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const titleVariants = cva("text-lg mb-2", {
  variants: {
    type: {
      default: "text-muted-foreground",
      success: "text-green-600",
      danger: "text-red-600",
      warning: "text-yellow-600",
    },
    size: {
      sm: "text-sm",
      md: "text-lg",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    type: "default",
    size: "md",
  },
});

type SimpleCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  classTitle?: string;
  classContent?: string;
  style?: React.CSSProperties;
  titleType?: "default" | "success" | "danger" | "warning";
  titleSize?: "sm" | "md" | "lg";
  onClick?: () => void;
} & VariantProps<typeof cardVariants>;

export const SimpleCard = ({
  title,
  description,
  action,
  footer,
  children,
  className,
  classTitle,
  classContent,
  variant,
  titleType,
  titleSize,
  style,
  onClick,
}: SimpleCardProps) => {
  const hasHeader = title || description || action;
  return (
    <Card
      className={cn(cardVariants({ variant }), className)}
      style={style}
      onClick={onClick}
    >
      {hasHeader && (
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            {title && (
              <CardTitle
                className={cn(
                  titleVariants({ type: titleType, size: titleSize }),
                  classTitle
                )}
              >
                {title}
              </CardTitle>
            )}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
      )}

      <CardContent className={classContent}>{children}</CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
