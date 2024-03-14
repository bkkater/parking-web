type BoxTitleProps = {
  children: React.ReactNode | string;
};

export default function Title({ children }: BoxTitleProps) {
  return (
    <h2 className="text-2xl font-semibold uppercase leading-none text-cyan200">
      {children}
    </h2>
  );
}
