import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border bg-dark-card px-4 py-3 text-base text-foreground placeholder:text-dark-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold disabled:cursor-not-allowed disabled:opacity-50 resize-y",
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
Textarea.displayName = "Textarea";

export { Textarea };
