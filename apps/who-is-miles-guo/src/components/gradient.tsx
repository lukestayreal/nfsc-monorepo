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
        "bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#c3c1b9] from-[28%] via-[#ece9eb] via-[70%] to-[#2c1840] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]"
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
          "bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#c2beff] from-[28%] via-[#ecee87] via-[70%] to-[#f12b56]",
          "rotate-[-10deg] rounded-full blur-3xl"
        )}
      />
    </div>
  );
};
