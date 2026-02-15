import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-dark hover:bg-gold-light active:bg-gold-dark shadow-lg shadow-gold/20",
        secondary:
          "border border-gold text-gold hover:bg-gold/10 active:bg-gold/20",
        ghost: "text-foreground hover:bg-foreground/5 active:bg-foreground/10",
        dark: "bg-dark-card text-foreground border border-dark-border hover:border-gold/50",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-md",
        md: "h-11 px-6 text-base rounded-lg",
        lg: "h-13 px-8 text-lg rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
