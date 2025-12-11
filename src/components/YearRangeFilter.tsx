
import { Select } from './ui/Select'

interface YearRangeFilterProps {
  isVertical?: boolean
  yearFrom?: string
  yearTo?: string
  onYearChange?: (from: string, to: string) => void
}

export function YearRangeFilter({ yearFrom = '', yearTo = '', onYearChange }: YearRangeFilterProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear - i
    return { value: year.toString(), label: year.toString() }
  })

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Año:</label>
      <div className="border border-dashed border-[#003770] rounded-md p-3 bg-white">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-12">Desde:</span>
            <Select 
              options={years} 
              className="flex-1" 
              value={yearFrom}
              onChange={(e) => onYearChange?.(e.target.value, yearTo)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-12">Hasta:</span>
            <Select 
              options={years} 
              className="flex-1"
              value={yearTo}
              onChange={(e) => onYearChange?.(yearFrom, e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
