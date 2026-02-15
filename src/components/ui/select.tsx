import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <div className="w-full">
      <select
        className={cn(
          "flex h-11 w-full rounded-lg border bg-dark-card px-4 py-2 text-base text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
          error ? "border-red-500" : "border-dark-border",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
);
Select.displayName = "Select";

export { Select };
