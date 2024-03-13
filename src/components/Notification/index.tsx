import { CircleCheck, Loader } from "lucide-react";

interface NotificationProps {
  type: "loading" | "success";
  text: string;
}

export default function Notification({ text, type }: NotificationProps) {
  return (
    <div className="my-12 flex flex-col items-center">
      {type === "loading" && (
        <Loader className="animate-spin text-cyan200 duration-1000" size={72} />
      )}

      {type === "success" && <CircleCheck className="text-cyan200" size={72} />}

      <span className="mt-5">{text}</span>
    </div>
  );
}
