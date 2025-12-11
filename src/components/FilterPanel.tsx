import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { CareerFilter } from './CareerFilter'
import { YearRangeFilter } from './YearRangeFilter'
import { AreaFilter } from './AreaFilter'
import { ModalityFilter } from './ModalityFilter'
import type { FilterState } from '../types/filters'

interface FilterPanelProps {
  variant?: 'horizontal' | 'vertical'
  filters?: FilterState
  onFilterChange?: (filters: Partial<FilterState>) => void
  onApply?: () => void
  onClear?: () => void
  errors?: { searchTerm?: string; tutorName?: string; modalities?: string }
}

export function FilterPanel({
  variant = 'horizontal',
  filters,
  onFilterChange,
  onApply,
  onClear,
  errors,
}: FilterPanelProps) {
  const isVertical = variant === 'vertical'

  return (
    <div className="w-full">
      {isVertical ? (
        <div className="flex flex-col space-y-6">
          <CareerFilter 
            isVertical={isVertical} 
            selectedCareers={filters?.selectedCareers || []}
            onCareerChange={(careers) => onFilterChange?.({ selectedCareers: careers })}
          />
          <YearRangeFilter 
            isVertical={isVertical}
            yearFrom={filters?.yearFrom || ''}
            yearTo={filters?.yearTo || ''}
            onYearChange={(from, to) => onFilterChange?.({ yearFrom: from, yearTo: to })}
          />
          <AreaFilter 
            selectedArea={filters?.selectedArea || ''}
            selectedSubarea={filters?.selectedSubarea || ''}
            onAreaChange={(area, subarea) => onFilterChange?.({ selectedArea: area, selectedSubarea: subarea })}
          />
          <ModalityFilter 
            selectedModalities={filters?.selectedModalities || []}
            onModalityChange={(modalities) => onFilterChange?.({ selectedModalities: modalities })}
          />
          {errors?.modalities && (
            <p className="text-red-600 text-xs mt-1 flex items-center">
              <span className="mr-1">⚠</span> {errors.modalities}
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-4">
          <div className="p-4">
            <CareerFilter 
              isVertical={false} 
              selectedCareers={filters?.selectedCareers || []}
              onCareerChange={(careers) => onFilterChange?.({ selectedCareers: careers })}
            />
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <YearRangeFilter 
                isVertical={false}
                yearFrom={filters?.yearFrom || ''}
                yearTo={filters?.yearTo || ''}
                onYearChange={(from, to) => onFilterChange?.({ yearFrom: from, yearTo: to })}
              />
              <AreaFilter 
                selectedArea={filters?.selectedArea || ''}
                selectedSubarea={filters?.selectedSubarea || ''}
                onAreaChange={(area, subarea) => onFilterChange?.({ selectedArea: area, selectedSubarea: subarea })}
              />
            </div>
            <div>
              <Input 
                label="Tutor:" 
                placeholder="Nombre del tutor"
                value={filters?.tutorName || ''}
                onChange={(e) => onFilterChange?.({ tutorName: e.target.value })}
                className={errors?.tutorName ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors?.tutorName && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <span className="mr-1">⚠</span> {errors.tutorName}
                </p>
              )}
            </div>
          </div>

          <div className="p-4">
            <ModalityFilter 
              selectedModalities={filters?.selectedModalities || []}
              onModalityChange={(modalities) => onFilterChange?.({ selectedModalities: modalities })}
            />
            {errors?.modalities && (
              <p className="text-red-600 text-xs mt-2 flex items-center">
                <span className="mr-1">⚠</span> {errors.modalities}
              </p>
            )}
          </div>
        </div>
      )}

      {isVertical && (
        <div className="mt-8 flex space-x-3">
          <Button variant="secondary" fullWidth onClick={onClear}>
            Limpiar
          </Button>
          <Button variant="primary" fullWidth onClick={onApply}>
            Aplicar
          </Button>
        </div>
      )}
    </div>
  )
}
