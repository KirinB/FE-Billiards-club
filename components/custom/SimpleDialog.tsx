import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export const SimpleDialog = ({
  children,
  isOpen,
  setIsOpen,
  className,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
  closeable?: boolean;
  title?: string;
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent
        className={cn(
          "inline-flex flex-col items-center justify-center gap-3 p-6 bg-white py-12 rounded-xl",
          className
        )}
      >
        <DialogTitle>{title}</DialogTitle>
        <div className="w-full px-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
