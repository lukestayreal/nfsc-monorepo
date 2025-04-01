import clsx from "clsx";
import React from "react";

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "bg-linear-[115deg,#c3c1b9_28%,#ece9eb_70%,#2c1840]"
      )}
    />
  );
}
export const GradientBackground = () => {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          "absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0",
          "bg-linear-[115deg,#c2beff_28%,#ecee87_70%,#f12b56]",
          "rotate-[-10deg] rounded-full blur-3xl"
        )}
      />
    </div>
  );
};
