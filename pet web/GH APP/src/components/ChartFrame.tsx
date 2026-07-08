import { PropsWithChildren } from "react";

interface ChartFrameProps extends PropsWithChildren {
  height?: string;
}

export function ChartFrame({ children, height = "h-72" }: ChartFrameProps) {
  return <div className={`chart-shell relative ${height} w-full`}>{children}</div>;
}
