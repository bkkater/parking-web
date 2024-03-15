import { CircleCheck, Loader } from "lucide-react";

type NotificationProps = {
  type: "loading" | "success";
  text: string;
  size?: number;
};

export default function Notification({ text, type, size }: NotificationProps) {
  return (
    <div className="my-12 flex flex-col items-center">
      {type === "loading" && (
        <Loader
          className="animate-spin text-cyan200 duration-1000"
          size={size || 72}
        />
      )}

      {type === "success" && (
        <CircleCheck className="uppercase text-cyan200" size={size || 72} />
      )}

      <span className="mt-5">{text}</span>
    </div>
  );
}
