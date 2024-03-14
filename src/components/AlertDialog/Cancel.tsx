import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function Cancel() {
  return (
    <AlertDialog.Cancel className="hover:text-cyan300 mt-3 w-full font-semibold uppercase text-cyan200 outline-none transition-colors">
      Voltar
    </AlertDialog.Cancel>
  );
}
