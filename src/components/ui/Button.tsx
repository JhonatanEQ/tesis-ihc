import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ComponentType<{ className?: string }>
  fullWidth?: boolean
}
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md'
  const variants = {
    primary: 'bg-gradient-to-r from-[#002555] to-[#003770] text-white hover:from-[#003770] hover:to-[#004d93] focus:ring-[#003770] transition-all duration-300',
    secondary:
      'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    ghost:
      'bg-transparent text-[#003770] hover:bg-blue-50 focus:ring-[#003770]',
    outline:
      'bg-transparent border border-[#003770] text-[#003770] hover:bg-blue-50',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  }
  const widthClass = fullWidth ? 'w-full' : ''
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  )
}
