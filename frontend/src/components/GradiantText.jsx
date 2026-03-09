import { cn } from "../lib/utils.js";

export default function GradiantText({ className, children }) {
  return (
    <h1
      className={cn(
        "bg-linear-to-b from-fuchsia-200 to-fuchsia-700 bg-clip-text text-transparent font-bold text-2xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
