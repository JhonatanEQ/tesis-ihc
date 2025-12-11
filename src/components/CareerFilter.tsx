import { useMemo } from 'react'
import { Select } from './ui/Select'
import { X } from 'lucide-react'

interface Career {
  value: string
  label: string
}

interface CareerFilterProps {
  isVertical?: boolean
  selectedCareers?: string[]
  onCareerChange?: (careers: string[]) => void
}

const CAREERS: Career[] = [
  { value: 'informatica', label: 'Ingeniería Informática' },
  { value: 'sistemas', label: 'Ingeniería de Sistemas' },
  { value: 'civil', label: 'Ingeniería Civil' },
  { value: 'industrial', label: 'Ingeniería Industrial' },
  { value: 'electronica', label: 'Ingeniería Electrónica' },
]

const ALL_CAREERS_OPTION = { value: 'all', label: 'Todas las carreras' }

export function CareerFilter({ isVertical = false, selectedCareers = [], onCareerChange }: CareerFilterProps) {
  const selectedCareerObjects = useMemo(() => {
    return selectedCareers
      .map(value => CAREERS.find(c => c.value === value))
      .filter((c): c is Career => c !== undefined)
  }, [selectedCareers])

  const areAllSelected = selectedCareerObjects.length === CAREERS.length

  const handleSelectCareer = (value: string) => {
    if (!value) return

    if (value === 'all') {
      const allValues = CAREERS.map(c => c.value)
      onCareerChange?.(allValues)
      return
    }
    
    const career = CAREERS.find((c) => c.value === value)
    if (career && !selectedCareers.includes(value)) {
      onCareerChange?.([...selectedCareers, value])
    }
  }

  const handleRemoveCareer = (value: string) => {
    onCareerChange?.(selectedCareers.filter((c) => c !== value))
  }

  const handleRemoveAll = () => {
    onCareerChange?.([])
  }

  const selectOptions = [ALL_CAREERS_OPTION, ...CAREERS]

  return (
    <div className="space-y-2">
      <Select
        label="Carrera:"
        placeholder="Seleccione una carrera"
        options={selectOptions}
        onChange={(e) => handleSelectCareer(e.target.value)}
        value=""
      />

      {!isVertical && (
        <div className="mt-4 p-4 border border-dashed border-[#003770] rounded-md bg-gray-50">
          <div className="space-y-3">
            <div className="min-h-[100px] max-h-[100px] overflow-y-auto flex flex-wrap gap-2 pb-2 border-b border-[#003770] custom-scrollbar">
              {selectedCareerObjects.length > 0 ? (
                areAllSelected ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-[#003770] to-[#004d93] text-white rounded-full shadow-sm hover:shadow-md transition-all group h-fit">
                    <span className="text-xs font-semibold">Todas las carreras</span>
                    <button
                      onClick={handleRemoveAll}
                      className="hover:bg-white/20 rounded-full p-1 transition-colors group-hover:scale-110 cursor-pointer"
                      aria-label="Quitar todas las carreras"
                      type="button"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  selectedCareerObjects.map((career) => (
                    <div
                      key={career.value}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-[#003770] to-[#004d93] text-white rounded-full shadow-sm hover:shadow-md transition-all group h-fit"
                    >
                      <span className="text-xs font-semibold">{career.label}</span>
                      <button
                        onClick={() => handleRemoveCareer(career.value)}
                        className="hover:bg-white/20 rounded-full p-1 transition-colors group-hover:scale-110 cursor-pointer"
                        aria-label={`Quitar ${career.label}`}
                        type="button"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )
              ) : (
                <div className="flex items-center h-full w-full">
                  <span className="text-xs text-gray-400 italic">
                    No hay carreras seleccionadas
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selected Careers Chips for vertical mode */}
      {isVertical && selectedCareers.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {areAllSelected ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-[#003770] to-[#004d93] text-white rounded-full shadow-sm hover:shadow-md transition-all group">
              <span className="text-xs font-semibold">Todas las carreras</span>
              <button
                onClick={handleRemoveAll}
                className="hover:bg-white/20 rounded-full p-1 transition-colors group-hover:scale-110 cursor-pointer"
                aria-label="Quitar todas las carreras"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            selectedCareerObjects.map((career) => (
              <div
                key={career.value}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-[#003770] to-[#004d93] text-white rounded-full shadow-sm hover:shadow-md transition-all group"
              >
                <span className="text-xs font-semibold">{career.label}</span>
                <button
                  onClick={() => handleRemoveCareer(career.value)}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors group-hover:scale-110 cursor-pointer"
                  aria-label={`Quitar ${career.label}`}
                  type="button"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
