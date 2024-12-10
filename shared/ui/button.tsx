export function Button({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={props.type || "button"}
      className={`py-2.5 px-6 text-sm text-white rounded-full font-semibold text-center shadow-xs transition-all duration-500 bg-indigo-500 cursor-pointer disabled:bg-indigo-200 disabled:cursor-not-allowed ${className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
