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
};

export default function ExitAlert({
  disableTrigger,
  onSubmit,
  children,
  open,
  onOpenChange,
  formState,
}: ExitAlertProps) {
  const { isSubmitSuccessful, errors, isSubmitting } = formState;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button color="secoundary" variant="outlined" disabled={disableTrigger}>
          Saída
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <Form.State
          isSubmitSuccessful={isSubmitSuccessful && !!errors.plate}
          isLoading={isSubmitting}
          submittedText="Saída liberada!"
          loadingText="Confirmando..."
        >
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
        </Form.State>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
