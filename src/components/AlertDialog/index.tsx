import * as AlertDialogUI from "@radix-ui/react-alert-dialog";

// Components
import Cancel from "@/components/AlertDialog/Cancel";
import Content from "@/components/AlertDialog/Content";
import Title from "@/components/AlertDialog/Title";

type AlertDialogProps = AlertDialogUI.AlertDialogProps & {
  children: React.ReactNode;
};

export default function AlertDialog({ children, ...rest }: AlertDialogProps) {
  return (
    <AlertDialogUI.Root {...rest}>
      <AlertDialogUI.Overlay className="fixed inset-0 z-20 bg-black/50" />
      {children}
    </AlertDialogUI.Root>
  );
}

AlertDialog.Content = Content;
AlertDialog.Cancel = Cancel;
AlertDialog.Title = Title;
AlertDialog.Action = AlertDialogUI.Action;
AlertDialog.Trigger = AlertDialogUI.Trigger;
