import { Dispatch, ReactNode, SetStateAction } from "react";
import { FormState } from "react-hook-form";

// Components
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import Form from "@/components/Form";

type PaymentAlertProps = {
  onSubmit: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  disableTrigger: boolean;
  children: ReactNode | string;
  formState: FormState<any>;
  success: boolean;
};

export default function PaymentAlert({
  disableTrigger,
  onSubmit,
  children,
  open,
  onOpenChange,
  formState,
  success,
}: PaymentAlertProps) {
  const { isSubmitting } = formState;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button
          color="secoundary"
          disabled={disableTrigger}
          data-testid="open_pay_alert_btn"
        >
          Pagamento
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <Form.State
          isSubmitSuccessful={success}
          isLoading={isSubmitting}
          submittedText="Pago!"
          loadingText="Confirmando..."
        >
          <AlertDialog.Title>
            Confima o pagamento da placa abaixo?
          </AlertDialog.Title>

          {children}

          <AlertDialog.Action asChild>
            <Button
              color="secoundary"
              onClick={onSubmit}
              type="button"
              data-testid="submit_pay_plate"
            >
              Confirmar
            </Button>
          </AlertDialog.Action>

          <AlertDialog.Cancel />
        </Form.State>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
