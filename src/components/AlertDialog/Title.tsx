import * as AlertDialog from "@radix-ui/react-alert-dialog";

type TitleProps = AlertDialog.DialogTitleProps & {
  children: React.ReactNode | string;
};

export default function Title({ children }: TitleProps) {
  return (
    <AlertDialog.Title className="max-w-44 text-center md:max-w-none">
      {children}
    </AlertDialog.Title>
  );
}
