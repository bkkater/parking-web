import { Dispatch, SetStateAction } from "react";

// Components
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";

type ExitAlertProps = {
  onSubmit: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  disableTrigger: boolean;
  children: React.ReactNode | string;
};

export default function ExitAlert({
  disableTrigger,
  onSubmit,
  children,
  open,
  onOpenChange,
}: ExitAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button color="secoundary" variant="outlined" disabled={disableTrigger}>
          Saída
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>
          Confirma a saída do veiculo da placa abaixo?
        </AlertDialog.Title>

        {children}

        <AlertDialog.Action asChild>
          <Button color="secoundary" onClick={onSubmit} type="button">
            Liberar Saída
          </Button>
        </AlertDialog.Action>

        <AlertDialog.Cancel />
      </AlertDialog.Content>
    </AlertDialog>
  );
}
