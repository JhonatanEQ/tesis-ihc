import { useState, useEffect } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { FilterPanel } from '../components/FilterPanel'
import { ThesisCard } from '../components/ThesisCard'
import type { Thesis } from '../components/ThesisCard'
import { Select } from '../components/ui/Select'
import { Badge } from '../components/ui/Badge'
import { PreviewModal } from '../components/PreviewModal'
import { Tooltip } from '../components/ui/Tooltip'
import thesisData from '../data/thesis.json'
import type { FilterState } from '../types/filters'
import { initialFilterState } from '../types/filters'

interface ResultsPageProps {
  onBack: () => void
  isMobileFilterOpen: boolean
  setIsMobileFilterOpen: (value: boolean) => void
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onAddToRecent: (thesis: Thesis) => void
}

export function ResultsPage({ onBack, isMobileFilterOpen, filters, onFilterChange, onAddToRecent }: ResultsPageProps) {
  const [selectedThesis, setSelectedThesis] = useState<Thesis | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('relevance')
  const itemsPerPage = 4
  const [errors, setErrors] = useState<{ searchTerm?: string; tutorName?: string; modalities?: string }>({})

  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const validateInput = (value: string): string | undefined => {
    if (!value.trim()) return undefined

    if (/^(.)\1+$/.test(value.trim())) {
      return 'No puede contener solo caracteres repetidos'
    }

    if (/^\d+$/.test(value.trim())) {
      return 'No puede contener solo números'
    }

    if (/^[^a-zA-Z0-9\s]+$/.test(value.trim())) {
      return 'No puede contener solo símbolos'
    }

    if (value.trim().length < 2) {
      return 'Debe tener al menos 2 caracteres'
    }

    if (/[^a-zA-Z0-9\s]{4,}/.test(value)) {
      return 'Contiene demasiados caracteres especiales consecutivos'
    }
    
    return undefined
  }

  const handleClearFilters = () => {
    setLocalFilters(initialFilterState)
  }

  const handleApplyFilters = () => {
    const newErrors: { searchTerm?: string; tutorName?: string; modalities?: string } = {}
    
    if (localFilters.searchTerm) {
      const searchError = validateInput(localFilters.searchTerm)
      if (searchError) newErrors.searchTerm = searchError
    }
    
    if (localFilters.tutorName) {
      const tutorError = validateInput(localFilters.tutorName)
      if (tutorError) newErrors.tutorName = tutorError
    }

    if (!localFilters.selectedModalities || localFilters.selectedModalities.length === 0) {
      newErrors.modalities = 'Debe seleccionar al menos una modalidad'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onFilterChange(localFilters)
      setCurrentPage(1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const allThesisData: Thesis[] = thesisData as Thesis[]

  const CAREER_LABELS: Record<string, string> = {
    'informatica': 'Ingeniería Informática',
    'sistemas': 'Ingeniería de Sistemas',
    'civil': 'Ingeniería Civil',
    'industrial': 'Ingeniería Industrial',
    'electronica': 'Ingeniería Electrónica'
  }

  const MODALITY_LABELS: Record<string, string> = {
    'tesis': 'Tesis',
    'proyecto': 'Proyecto de Grado',
    'dirigido': 'Trabajo Dirigido',
    'adscripcion': 'Trabajo por Adscripción',
    'tesina': 'Tesina'
  }

  const filteredThesis = allThesisData.filter(thesis => {
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      const matchesText = (
        thesis.title.toLowerCase().includes(term) ||
        thesis.author.toLowerCase().includes(term) ||
        thesis.career.toLowerCase().includes(term) ||
        (thesis.keywords && thesis.keywords.some(k => k.toLowerCase().includes(term))) ||
        (thesis.abstract && thesis.abstract.toLowerCase().includes(term))
      )
      if (!matchesText) return false
    }

    if (filters.selectedCareers.length > 0) {
      const careerMatch = filters.selectedCareers.some(careerValue => {
        const label = CAREER_LABELS[careerValue]
        return thesis.career === label
      })
      if (!careerMatch) return false
    }

    if (filters.yearFrom && parseInt(thesis.year) < parseInt(filters.yearFrom)) return false
    if (filters.yearTo && parseInt(thesis.year) > parseInt(filters.yearTo)) return false

    if (filters.selectedModalities.length > 0 && filters.selectedModalities.length < 5) {
      const modalityMatch = filters.selectedModalities.some(modalityValue => {
        const label = MODALITY_LABELS[modalityValue]
        return thesis.type === label
      })
      if (!modalityMatch) return false
    }

    if (
      filters.tutorName &&
      (!thesis.tutor || !thesis.tutor.toLowerCase().includes(filters.tutorName.toLowerCase()))
    ) {
      return false
    }

    return true
  })

  const sortedThesis = [...filteredThesis].sort((a, b) => {
    switch (sortBy) {
      case 'date_desc':
        return parseInt(b.year) - parseInt(a.year)
      case 'date_asc':
        return parseInt(a.year) - parseInt(b.year)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'relevance':
      default:

        return filters.searchTerm ? 0 : parseInt(b.year) - parseInt(a.year)
    }
  })

  const allThesis = sortedThesis

  const totalPages = Math.ceil(allThesis.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentThesis = allThesis.slice(startIndex, endIndex)

  const handlePreview = (thesis: Thesis) => {
    setSelectedThesis(thesis)
    setIsModalOpen(true)
    onAddToRecent(thesis)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="flex max-w-7xl mx-auto w-full px-4 py-8 gap-8 relative">

        <aside
            className={`
            w-72 flex-shrink-0 
            lg:block
            ${isMobileFilterOpen ? 'block' : 'hidden'}
            lg:relative absolute lg:top-0 top-0 left-0 right-0 
            bg-[#F5F5F5] lg:bg-transparent z-30 p-4 lg:p-0
            `}
            >
            <button
                onClick={onBack}
                className="w-full mb-6 flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-[#003770] text-[#003770] rounded-lg font-medium hover:bg-[#003770] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver Atras</span>
            </button>

            <div className="mb-6 bg-white rounded-lg border-2 border-[#003770] p-4 shadow-md">
                <div className="flex items-center space-x-2 mb-2">
                <label className="text-sm font-medium text-gray-700">
                    Buscar:
                </label>
                <Tooltip
                    content="Refina tu búsqueda con nuevas palabras clave"
                    position="right"
                />
                </div>
                <Input
                placeholder="Título, autor, palabras clave..."
                icon={Search}
                value={localFilters.searchTerm}
                onChange={(e) => {
                  setLocalFilters({ ...localFilters, searchTerm: e.target.value })
                  setErrors(prev => ({ ...prev, searchTerm: undefined }))
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                className={`${errors.searchTerm ? 'border-red-500 focus:border-red-500' : 'border-[#003770]/30 focus:border-[#003770]'}`}
                />
                {errors.searchTerm && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠</span> {errors.searchTerm}
                  </p>
                )}
            </div>

            <div className="bg-white rounded-lg border-2 border-[#003770] p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 shadow-md">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-[#003770] text-sm sm:text-base">Filtros</h3>
                    <Tooltip
                    content="Aplica filtros para encontrar tesis específicas"
                    position="right"
                    />
                </div>
                </div>

                {(filters.searchTerm || filters.selectedCareers.length > 0 || filters.yearFrom || filters.yearTo || (filters.selectedModalities.length > 0 && filters.selectedModalities.length < 5) || filters.tutorName) && (
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs text-gray-500 mb-2">Filtros activos:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {filters.searchTerm && (
                        <Badge
                          variant="default"
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs bg-gradient-to-r from-[#003770] to-[#004d93] text-white border-[#003770]"
                        >
                          Búsqueda: "{filters.searchTerm}"
                          <button
                            onClick={() => onFilterChange({ ...filters, searchTerm: '' })}
                            className="ml-1 cursor-pointer font-bold hover:scale-110 transition-transform"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      
                      {filters.selectedCareers.map(career => (
                        <Badge
                          key={career}
                          variant="default"
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs bg-gradient-to-r from-[#003770] to-[#004d93] text-white border-[#003770]"
                        >
                          {CAREER_LABELS[career]}
                          <button
                            onClick={() => onFilterChange({ 
                              ...filters, 
                              selectedCareers: filters.selectedCareers.filter(c => c !== career) 
                            })}
                            className="ml-1 cursor-pointer font-bold hover:scale-110 transition-transform"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                      
                      {(filters.yearFrom || filters.yearTo) && (
                        <Badge
                          variant="default"
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs bg-gradient-to-r from-[#003770] to-[#004d93] text-white border-[#003770]"
                        >
                          Año: {filters.yearFrom || '...'} - {filters.yearTo || '...'}
                          <button
                            onClick={() => onFilterChange({ ...filters, yearFrom: '', yearTo: '' })}
                            className="ml-1 cursor-pointer font-bold hover:scale-110 transition-transform"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      
                      {filters.selectedModalities.length > 0 && filters.selectedModalities.length < 5 && filters.selectedModalities.map(modality => (
                        <Badge
                          key={modality}
                          variant="default"
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs bg-gradient-to-r from-[#003770] to-[#004d93] text-white border-[#003770]"
                        >
                          {MODALITY_LABELS[modality]}
                          <button
                            onClick={() => onFilterChange({ 
                              ...filters, 
                              selectedModalities: filters.selectedModalities.filter(m => m !== modality) 
                            })}
                            className="ml-1 cursor-pointer font-bold hover:scale-110 transition-transform"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                      
                      {filters.tutorName && (
                        <Badge
                          variant="default"
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs bg-gradient-to-r from-[#003770] to-[#004d93] text-white border-[#003770]"
                        >
                          Tutor: "{filters.tutorName}"
                          <button
                            onClick={() => onFilterChange({ ...filters, tutorName: '' })}
                            className="ml-1 cursor-pointer font-bold hover:scale-110 transition-transform"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <FilterPanel 
                  variant="vertical" 
                  filters={localFilters}
                  onFilterChange={(newFilters) => {
                    setLocalFilters({ ...localFilters, ...newFilters })
                    // Limpiar errores cuando se modifica el campo de tutor o modalidades
                    if ('tutorName' in newFilters) {
                      setErrors(prev => ({ ...prev, tutorName: undefined }))
                    }
                    if ('selectedModalities' in newFilters) {
                      setErrors(prev => ({ ...prev, modalities: undefined }))
                    }
                  }}
                  onClear={handleClearFilters}
                  onApply={handleApplyFilters}
                  errors={errors}
                />
            </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg border-2 border-[#003770] p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#003770]">Resultados</h2>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center space-x-2">
                  <span className="font-semibold text-[#003770]">{allThesis.length}</span>
                  <span>encontrados</span>
                  <Tooltip
                    content="Total de tesis que coinciden con tu búsqueda"
                    position="right"
                  />
                </p>
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs sm:text-sm"
                  options={[
                    {
                      value: 'relevance',
                      label: 'Más relevantes',
                    },
                    {
                      value: 'date_desc',
                      label: 'Más recientes',
                    },
                    {
                      value: 'date_asc',
                      label: 'Más antiguos',
                    },
                    {
                      value: 'title',
                      label: 'Por título',
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-gray-600">
              Mostrando <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, allThesis.length)}</span> de <span className="font-semibold">{allThesis.length}</span> resultados
            </p>
          </div>
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            {currentThesis.map((thesis) => (
              <ThesisCard
                key={thesis.id}
                thesis={thesis}
                onPreview={handlePreview}
              />
            ))}
          </div>

          <div className="bg-white rounded-lg border-2 border-[#003770] p-3 sm:p-4 mb-8 shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-[#003770] disabled:opacity-50 w-full sm:w-auto text-xs sm:text-sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Anterior
              </Button>
              <div className="flex space-x-1 sm:space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md font-semibold transition-colors cursor-pointer text-xs sm:text-base ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-[#002555] to-[#003770] text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 text-xs sm:text-base">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md font-semibold transition-colors cursor-pointer text-xs sm:text-base ${
                        currentPage === totalPages
                          ? 'bg-gradient-to-r from-[#002555] to-[#003770] text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-[#003770] disabled:opacity-50 w-full sm:w-auto text-xs sm:text-sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-[#003770]/10 p-4 sm:p-5 md:p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-4 sm:mb-5">
              <h3 className="text-sm sm:text-base font-bold text-[#003770] uppercase tracking-wide">
                Tesis Relacionadas
              </h3>
              <Tooltip
                content="Tesis similares que podrían interesarte"
                position="right"
              />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {filteredThesis.slice(0, 3).map((thesis) => (
                <div
                  key={thesis.id}
                  onClick={() => handlePreview(thesis)}
                  className="border-2 border-[#003770] rounded-lg p-3 sm:p-4 hover:border-[#003770]/30 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-2 group-hover:text-[#003770] transition-colors">
                    {thesis.title}
                  </h4>
                  <div className="text-xs text-gray-600 flex items-center space-x-2">
                    <span>{thesis.author}</span>
                    <span>•</span>
                    <span>{thesis.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        thesis={selectedThesis}
      />
    </>
  )
}
