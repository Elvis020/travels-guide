"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Input Component
// Text input with floating label, validation states, and icons
// ═══════════════════════════════════════════════════════════════════════════

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      type = "text",
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const hasError = !!error;
    const hasSuccess = !!success;

    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-1.5",
              hasError ? "text-error" : "text-charcoal"
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg",
              "text-charcoal placeholder:text-stone",
              "border-2 transition-all duration-200",
              "focus:outline-none",
              // Default state
              !hasError &&
                !hasSuccess &&
                "border-sand bg-white focus:border-primary focus:ring-2 focus:ring-primary-light",
              // Error state
              hasError &&
                "border-error bg-error-light focus:border-error-dark focus:ring-2 focus:ring-error-light",
              // Success state
              hasSuccess &&
                "border-success bg-success-light focus:border-success-dark focus:ring-2 focus:ring-success-light",
              // Disabled state
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-sand",
              // Padding adjustments for icons
              leftIcon && "pl-10",
              (rightIcon || isPassword || hasError || hasSuccess) && "pr-10",
              className
            )}
            {...props}
          />

          {/* Right side: icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {/* Validation icons */}
            {hasError && <AlertCircle className="w-5 h-5 text-error" />}
            {hasSuccess && <CheckCircle className="w-5 h-5 text-success" />}

            {/* Password toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-stone hover:text-charcoal transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Custom right icon */}
            {rightIcon && !isPassword && !hasError && !hasSuccess && (
              <span className="text-stone">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Helper text */}
        {(error || success || hint) && (
          <p
            className={cn(
              "mt-1.5 text-sm",
              hasError && "text-error",
              hasSuccess && "text-success",
              !hasError && !hasSuccess && "text-stone"
            )}
          >
            {error || success || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ═══════════════════════════════════════════════════════════════════════════
// Textarea Component
// ═══════════════════════════════════════════════════════════════════════════

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      success,
      hint,
      fullWidth = true,
      className,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = !!error;
    const hasSuccess = !!success;

    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "block text-sm font-medium mb-1.5",
              hasError ? "text-error" : "text-charcoal"
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full px-4 py-3 rounded-lg resize-y",
            "text-charcoal placeholder:text-stone",
            "border-2 transition-all duration-200",
            "focus:outline-none",
            // Default state
            !hasError &&
              !hasSuccess &&
              "border-sand bg-white focus:border-primary focus:ring-2 focus:ring-primary-light",
            // Error state
            hasError &&
              "border-error bg-error-light focus:border-error-dark focus:ring-2 focus:ring-error-light",
            // Success state
            hasSuccess &&
              "border-success bg-success-light focus:border-success-dark focus:ring-2 focus:ring-success-light",
            // Disabled state
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-sand",
            className
          )}
          {...props}
        />

        {/* Helper text */}
        {(error || success || hint) && (
          <p
            className={cn(
              "mt-1.5 text-sm",
              hasError && "text-error",
              hasSuccess && "text-success",
              !hasError && !hasSuccess && "text-stone"
            )}
          >
            {error || success || hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// ═══════════════════════════════════════════════════════════════════════════
// Select Component
// ═══════════════════════════════════════════════════════════════════════════

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = !!error;

    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block text-sm font-medium mb-1.5",
              hasError ? "text-error" : "text-charcoal"
            )}
          >
            {label}
          </label>
        )}

        {/* Select */}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full px-4 py-2.5 pr-10 rounded-lg appearance-none",
              "text-charcoal",
              "border-2 transition-all duration-200",
              "focus:outline-none",
              // Default state
              !hasError &&
                "border-sand bg-white focus:border-primary focus:ring-2 focus:ring-primary-light",
              // Error state
              hasError &&
                "border-error bg-error-light focus:border-error-dark focus:ring-2 focus:ring-error-light",
              // Disabled state
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-sand",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-stone"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Helper text */}
        {(error || hint) && (
          <p
            className={cn(
              "mt-1.5 text-sm",
              hasError ? "text-error" : "text-stone"
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Input;
