import * as AlertDialog from "@radix-ui/react-alert-dialog";

type ContentProps = AlertDialog.DialogContentProps & {
  children: React.ReactNode | string;
};

export default function Content({ children }: ContentProps) {
  return (
    <AlertDialog.AlertDialogContent className="focus-visible:ring-purple-500 fixed left-1/2 top-1/2 z-50 flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded bg-white px-4 py-8 md:w-[520px]">
      {children}
    </AlertDialog.AlertDialogContent>
  );
}
