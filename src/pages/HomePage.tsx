import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { FilterPanel } from '../components/FilterPanel'
import { Card } from '../components/ui/Card'
import { HelpSection } from '../components/HelpSection'
import { Tooltip } from '../components/ui/Tooltip'
import { PreviewModal } from '../components/PreviewModal'
import type { FilterState } from '../types/filters'
import type { Thesis } from '../components/ThesisCard'

interface HomePageProps {
  onSearch: (filters: FilterState) => void
  initialFilters: FilterState
  recentTheses: Thesis[]
  onAddToRecent: (thesis: Thesis) => void
}
export function HomePage({ onSearch, initialFilters, recentTheses, onAddToRecent }: HomePageProps) {
  const [filters, setFilters] = React.useState<FilterState>(initialFilters)
  const [selectedThesis, setSelectedThesis] = React.useState<Thesis | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [errors, setErrors] = React.useState<{ searchTerm?: string; tutorName?: string; modalities?: string }>({})

  const validateInput = (value: string): string | undefined => {
    if (!value.trim()) return undefined
    
    // Solo caracteres repetidos (ej: xxxxx, aaaaa)
    if (/^(.)\1+$/.test(value.trim())) {
      return 'No puede contener solo caracteres repetidos'
    }
    
    // Solo números
    if (/^\d+$/.test(value.trim())) {
      return 'No puede contener solo números'
    }
    
    // Solo símbolos o caracteres especiales
    if (/^[^a-zA-Z0-9\s]+$/.test(value.trim())) {
      return 'No puede contener solo símbolos'
    }
    
    // Muy corto y sin sentido (menos de 2 caracteres)
    if (value.trim().length < 2) {
      return 'Debe tener al menos 2 caracteres'
    }
    
    // Demasiados caracteres especiales consecutivos
    if (/[^a-zA-Z0-9\s]{4,}/.test(value)) {
      return 'Contiene demasiados caracteres especiales consecutivos'
    }
    
    return undefined
  }

  const handleSearch = () => {
    const newErrors: { searchTerm?: string; tutorName?: string; modalities?: string } = {}
    
    if (filters.searchTerm) {
      const searchError = validateInput(filters.searchTerm)
      if (searchError) newErrors.searchTerm = searchError
    }
    
    if (filters.tutorName) {
      const tutorError = validateInput(filters.tutorName)
      if (tutorError) newErrors.tutorName = tutorError
    }
    
    // Validar que al menos una modalidad esté seleccionada
    if (!filters.selectedModalities || filters.selectedModalities.length === 0) {
      newErrors.modalities = 'Debe seleccionar al menos una modalidad'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onSearch(filters)
    }
  }

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    
    // Limpiar errores cuando se modifica el campo
    if ('searchTerm' in newFilters) {
      setErrors(prev => ({ ...prev, searchTerm: undefined }))
    }
    if ('tutorName' in newFilters) {
      setErrors(prev => ({ ...prev, tutorName: undefined }))
    }
    if ('selectedModalities' in newFilters) {
      setErrors(prev => ({ ...prev, modalities: undefined }))
    }
  }

  const handleRecentClick = (thesis: Thesis) => {
    setSelectedThesis(thesis)
    setIsModalOpen(true)
    onAddToRecent(thesis)
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#002555] via-[#003770] to-[#E30613] bg-clip-text text-transparent">
            Trabajos de Investigación
          </h2>
          <p className="text-gray-600 text-lg">
            Tesis y proyectos de grado de la FCyT
          </p>
        </div>

        <div className="w-full max-w-3xl mb-8 ">
          <div className="flex items-center space-x-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Buscar:
            </label>
            <Tooltip
              content="Escribe autor, título o tema para buscar tesis"
              position="right"
            />
          </div>
          <div className="relative">
            <Input
              placeholder="Ejemplo: Machine Learning, Reconocimiento Facial, Juan Pérez..."
              icon={Search}
              className={`h-12 text-base shadow-md border-2 ${errors.searchTerm ? 'border-red-500 focus:border-red-500' : 'border-[#003770] focus:border-[#003770]'}`}
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {errors.searchTerm && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span> {errors.searchTerm}
              </p>
            )}
          </div>
        </div>

        <Card className="w-full p-8 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#003770]">
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-base font-bold text-[#003770]">
              Filtros Avanzados
            </h3>
            <Tooltip
              content="Selecciona uno o varios filtros para refinar tu búsqueda"
              position="right"
            />
          </div>
          <FilterPanel 
            variant="horizontal" 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Card>

        <div className="w-full mb-8">
          <HelpSection />
        </div>

        <div className="mb-20">
          <Button
            variant="primary"
            className="px-16 py-3.5 text-base font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-[#003770] hover:bg-[#002555]"
            onClick={handleSearch}
          >
            BUSCAR
          </Button>
        </div>

        <div className="w-full bg-white border border-[#003770] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recientes
          </h3>
          <div className="space-y-3">
            {recentTheses.length > 0 ? (
              recentTheses.map((thesis) => (
                <div
                  key={thesis.id}
                  onClick={() => handleRecentClick(thesis)}
                  className="border border-[#003770] rounded-md p-4 hover:bg-gray-50 hover:shadow-md hover:border-[#002555] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-gray-800 flex-1">{thesis.title}</p>
                    <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{thesis.year}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{thesis.author}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay tesis vistas recientemente
              </p>
            )}
          </div>
        </div>

        <PreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          thesis={selectedThesis}
        />
    </div>
  )
}
