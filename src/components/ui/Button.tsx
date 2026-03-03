import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-gh-green hover:bg-gh-green-hover text-white border border-[rgba(255,255,255,0.1)] shadow-sm',
      secondary: 'bg-gh-card hover:bg-[#1f242c] text-gh-text-primary border border-gh-border',
      outline: 'bg-transparent border border-gh-border text-gh-text-primary hover:border-gray-400',
      ghost: 'bg-transparent text-gh-text-primary hover:text-gh-blue',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm font-medium',
      lg: 'px-8 py-3.5 text-base font-semibold',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gh-blue focus:ring-offset-2 focus:ring-offset-gh-bg disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
