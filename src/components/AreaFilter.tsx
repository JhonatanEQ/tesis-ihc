import { useMemo } from 'react'
import { Select } from './ui/Select'

const AREAS = [
  { value: 'ia', label: 'Inteligencia Artificial' },
  { value: 'web', label: 'Desarrollo Web' },
  { value: 'security', label: 'Ciberseguridad' },
  { value: 'mobile', label: 'Desarrollo Móvil' },
  { value: 'data', label: 'Ciencia de Datos' },
]

const SUBAREAS: Record<string, { value: string; label: string }[]> = {
  ia: [
    { value: 'ml', label: 'Machine Learning' },
    { value: 'dl', label: 'Deep Learning' },
    { value: 'nlp', label: 'Procesamiento de Lenguaje Natural' },
    { value: 'cv', label: 'Visión por Computadora' },
  ],
  web: [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
  ],
  security: [
    { value: 'network', label: 'Seguridad de Redes' },
    { value: 'app', label: 'Seguridad de Aplicaciones' },
  ],
  mobile: [
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'iOS' },
    { value: 'cross', label: 'Multiplataforma' },
  ],
  data: [
    { value: 'analytics', label: 'Análisis de Datos' },
    { value: 'mining', label: 'Minería de Datos' },
    { value: 'viz', label: 'Visualización de Datos' },
  ],
}

interface AreaFilterProps {
  selectedArea?: string
  selectedSubarea?: string
  onAreaChange?: (area: string, subarea: string) => void
}

export function AreaFilter({ selectedArea = '', selectedSubarea = '', onAreaChange }: AreaFilterProps) {
  const availableSubareas = useMemo(() => {
    return SUBAREAS[selectedArea] || []
  }, [selectedArea])

  const handleAreaChange = (value: string) => {
    onAreaChange?.(value, '')
  }

  const handleSubareaChange = (value: string) => {
    onAreaChange?.(selectedArea, value)
  }

  return (
    <div className="space-y-2">
      <Select
        label="Área:"
        placeholder="Seleccione un área"
        options={AREAS}
        value={selectedArea}
        onChange={(e) => handleAreaChange(e.target.value)}
      />
      <Select
        label="Subárea:"
        placeholder={
          selectedArea ? 'Seleccione subárea' : 'Primero seleccione un área'
        }
        options={availableSubareas}
        className="mt-2"
        value={selectedSubarea}
        disabled={!selectedArea}
        onChange={(e) => handleSubareaChange(e.target.value)}
      />
    </div>
  )
}
