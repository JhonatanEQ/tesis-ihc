import React from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}
export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label
      className={`flex items-center space-x-3 cursor-pointer group ${className}`}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="
            peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 
            transition-all checked:border-[#003770] checked:bg-[#003770] 
            hover:border-[#003770] focus:ring-2 focus:ring-[#003770] focus:ring-offset-1
          "
          {...props}
        />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  )
}
