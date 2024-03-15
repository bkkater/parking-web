import { Dispatch, ReactNode, SetStateAction } from "react";
import { FormState } from "react-hook-form";

// Components
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import Form from "@/components/Form";

type ExitAlertProps = {
  onSubmit: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  disableTrigger: boolean;
  children: ReactNode | string;
  formState: FormState<any>;
  success: boolean;
};

export default function ExitAlert({
  disableTrigger,
  onSubmit,
  children,
  open,
  onOpenChange,
  formState,
  success,
}: ExitAlertProps) {
  const { isSubmitting } = formState;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button
          color="secoundary"
          variant="outlined"
          disabled={disableTrigger}
          data-testid="open_exit_alert_btn"
        >
          Saída
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <Form.State
          isSubmitSuccessful={success}
          isLoading={isSubmitting}
          submittedText="Saída liberada!"
          loadingText="Confirmando..."
        >
          <AlertDialog.Title>
            Confirma a saída do veiculo da placa abaixo?
          </AlertDialog.Title>

          {children}

          <AlertDialog.Action asChild>
            <Button
              color="secoundary"
              onClick={onSubmit}
              type="button"
              data-testid="submit_exit_plate"
            >
              Liberar Saída
            </Button>
          </AlertDialog.Action>

          <AlertDialog.Cancel />
        </Form.State>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
