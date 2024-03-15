import { CircleAlert } from "lucide-react";

type ErrorProps = {
  text?: string;
};

export default function Error({ text }: ErrorProps) {
  return (
    <div
      className="flex h-min w-full animate-fadeIn items-center gap-2 rounded bg-pink100 px-2 py-1 text-sm font-semibold text-pink700"
      data-testid="state_message"
    >
      <CircleAlert className="text-pink700" size={20} />

      {text}
    </div>
  );
}
