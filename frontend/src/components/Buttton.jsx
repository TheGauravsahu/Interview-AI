import { RiLoader2Line } from "@remixicon/react";
import { cn } from "../lib/utils";

export default function Buttton({
  children,
  isLoading,
  loadingText,
  className,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={isLoading}
      className={cn(
        "w-full  bg-fuchsia-500 hover:scale-95 cursor-pointer mt-2 px-8 py-2 rounded-2xl flex gap-1 items-center justify-center ",
        className,
      )}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-1">
          <RiLoader2Line className="animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
