import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all font-medium cursor-pointer";
  
  const variants = {
    primary: "bg-[var(--rose-600)] text-white hover:bg-[var(--rose-700)] shadow-md hover:shadow-lg transform hover:scale-105",
    outline: "border-2 border-[var(--rose-600)] text-[var(--rose-600)] hover:bg-[var(--rose-600)] hover:text-white",
    ghost: "bg-transparent text-[var(--rose-600)] hover:bg-[var(--rose-100)]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}