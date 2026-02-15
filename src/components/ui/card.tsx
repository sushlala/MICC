import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dark-border bg-dark-card p-6",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
