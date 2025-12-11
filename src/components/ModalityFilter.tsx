import { useState, useEffect } from 'react'
import { Checkbox } from './ui/Checkbox'

const MODALITIES = [
  { value: 'tesis', label: 'Tesis' },
  { value: 'proyecto', label: 'Proyecto de Grado' },
  { value: 'dirigido', label: 'Trabajo dirigido' },
  { value: 'adscripcion', label: 'Trabajo por adscripción' },
  { value: 'tesina', label: 'Tesina' },
]

interface ModalityFilterProps {
  selectedModalities?: string[]
  onModalityChange?: (modalities: string[]) => void
}

export function ModalityFilter({ selectedModalities = MODALITIES.map(m => m.value), onModalityChange }: ModalityFilterProps) {
  const [selectAll, setSelectAll] = useState(true)

  useEffect(() => {
    setSelectAll(selectedModalities.length === MODALITIES.length)
  }, [selectedModalities])

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      onModalityChange?.(MODALITIES.map((m) => m.value))
    } else {
      onModalityChange?.([])
    }
  }

  const handleModalityChange = (value: string, checked: boolean) => {
    if (checked) {
      const newSelected = [...selectedModalities, value]
      onModalityChange?.(newSelected)
    } else {
      onModalityChange?.(selectedModalities.filter((m) => m !== value))
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Modalidad:
      </label>
      <div className="border border-dashed border-[#003770] rounded-md p-3 bg-white space-y-2">
        <Checkbox
          label="Todos"
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        <div className="border-t border-[#003770] my-2"></div>
        {MODALITIES.map((modality) => (
          <Checkbox
            key={modality.value}
            label={modality.label}
            checked={selectedModalities.includes(modality.value)}
            onChange={(e) =>
              handleModalityChange(modality.value, e.target.checked)
            }
          />
        ))}
      </div>
    </div>
  )
}
