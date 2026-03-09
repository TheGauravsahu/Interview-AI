import { cn } from "../../../lib/utils.js";

export default function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "text-fuchsia-400 bg-fuchsia-700/50 border border-fuchsia-900 font-semibold px-2 py-1 rounded-md text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
