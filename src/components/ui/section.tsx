import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Section({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-20 sm:py-24 lg:py-32", className)} {...props}>
      {children}
    </section>
  );
}
