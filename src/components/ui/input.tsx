import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <input
        className={cn(
          "flex h-11 w-full rounded-lg border bg-dark-card px-4 py-2 text-base text-foreground placeholder:text-dark-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500" : "border-dark-border",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";

export { Input };
