import type React from 'react'
import { ChevronDown } from 'lucide-react'
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: {
    value: string
    label: string
  }[]
  placeholder?: string
}
export function Select({
  label,
  options,
  placeholder,
  className = '',
  disabled,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-1 ${
          disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            block w-full appearance-none rounded-md border border-gray-300 
            bg-white px-4 py-2.5 pr-10 text-gray-900 shadow-sm 
            focus:border-[#003770] focus:outline-none focus:ring-1 focus:ring-[#003770] 
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            cursor-pointer
            sm:text-sm ${className}
          `}
          disabled={disabled}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${
          disabled ? 'text-gray-300' : 'text-gray-500'
        }`}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
