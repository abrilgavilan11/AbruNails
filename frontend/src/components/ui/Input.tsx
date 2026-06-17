import { forwardRef, type InputHTMLAttributes } from "react";

// Extendemos los atributos estándar de HTML para un input
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Usamos forwardRef para que sea compatible con react-hook-form
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`block w-full px-4 py-3 border-2 border-[var(--rose-200)] rounded-lg focus:ring-2 focus:ring-[var(--rose-400)] focus:border-[var(--rose-600)] transition-all bg-white text-[var(--rose-900)] outline-none disabled:opacity-50 disabled:bg-gray-50 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;