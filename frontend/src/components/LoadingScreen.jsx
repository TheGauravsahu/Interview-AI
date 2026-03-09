import { RiLoader4Line } from "@remixicon/react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-full f">
      <div className="flex items-center justify-center gap-2">
        <RiLoader4Line className="animate-spin" />
        Loading...
      </div>
    </div>
  );
}

export function LoadnigIndicatior() {
  <div className="flex items-center justify-center h-full w-full">
    <div className="flex items-center justify-center gap-2">
      <RiLoader4Line className="animate-spin" />
      Loading...
    </div>
  </div>;
}
