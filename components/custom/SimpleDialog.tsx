import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export const SimpleDialog = ({
  children,
  isOpen,
  setIsOpen,
  className,
  title,
  variant = "default",
  onConfirm,
  onCancel,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  confirmVariant = "default",
  classNameTitle,
}: {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
  title?: string;
  classNameTitle?: string;

  // Biến thêm
  variant?: "default" | "confirm";
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive" | "green" | "outline";
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent
        className={cn(
          "inline-flex flex-col items-center justify-center gap-3 bg-white rounded-xl p-6",
          className
        )}
      >
        {title && (
          <DialogTitle className={cn("text-lg font-semibold", classNameTitle)}>
            {title}
          </DialogTitle>
        )}

        <div className="w-full px-2">{children}</div>

        {variant === "confirm" && (
          <div className="flex justify-end w-full gap-3">
            <Button variant="outline" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button variant={confirmVariant} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
