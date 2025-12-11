import type React from 'react'
import { BoxIcon } from 'lucide-react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: typeof BoxIcon
  error?: string
}
export function Input({
  label,
  icon: Icon,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full bg-white">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-black" />
          </div>
        )}
        <input
          className={`
            block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-[#003770] focus:ring-[#003770] sm:text-sm py-2.5
            border px-4 cursor-text
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
