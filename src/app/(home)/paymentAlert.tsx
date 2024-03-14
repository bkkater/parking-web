import { Dispatch, SetStateAction } from "react";

// Components
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";

type PaymentAlertProps = {
  onSubmit: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  disableTrigger: boolean;
  children: React.ReactNode | string;
};

export default function PaymentAlert({
  disableTrigger,
  onSubmit,
  children,
  open,
  onOpenChange,
}: PaymentAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button color="secoundary" disabled={disableTrigger}>
          Pagamento
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>
          Confima o pagamento da placa abaixo?
        </AlertDialog.Title>

        {children}

        <AlertDialog.Action asChild>
          <Button color="secoundary" onClick={onSubmit} type="button">
            Confirmar
          </Button>
        </AlertDialog.Action>

        <AlertDialog.Cancel />
      </AlertDialog.Content>
    </AlertDialog>
  );
}
