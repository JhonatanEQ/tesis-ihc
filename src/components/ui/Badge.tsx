import type React from 'react'
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary'
  className?: string
}
export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-linear-to-r from-[#002555] via-[#003770] to-[#004d93] text-white border-[#003770]',
    secondary: 'bg-linear-to-r from-[#E30613] to-[#b30510] text-white border-[#E30613]',
    outline: 'bg-transparent border-2 border-[#003770] text-[#003770]',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
