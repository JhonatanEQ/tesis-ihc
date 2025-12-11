import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { ResultsPage } from './pages/ResultsPage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import type { FilterState } from './types/filters'
import { initialFilterState } from './types/filters'
import type { Thesis } from './components/ThesisCard'

export default function App() {
  const [view, setView] = useState<'home' | 'results'>('home')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [recentTheses, setRecentTheses] = useState<Thesis[]>([])

  const handleSearch = (newFilters: FilterState) => {
    console.log('Navegando a resultados con filtros:', newFilters)
    setFilters(newFilters)
    setView('results')
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleAddToRecent = (thesis: Thesis) => {
    setRecentTheses(prev => {
      const filtered = prev.filter(t => t.id !== thesis.id)
      return [thesis, ...filtered].slice(0, 5)
    })
  }

  return (
    <div className="min-h-screen bg-[#ffffffe8] flex flex-col">
      <Header
        showMobileMenu={view === 'results'}
        onMobileMenuToggle={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        isMobileMenuOpen={isMobileFilterOpen}
      />

      <main className="flex-1">
        {view === 'home' ? (
          <HomePage 
            onSearch={handleSearch} 
            initialFilters={filters}
            recentTheses={recentTheses}
            onAddToRecent={handleAddToRecent}
          />
        ) : (
          <ResultsPage
            onBack={() => setView('home')}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
            onAddToRecent={handleAddToRecent}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
