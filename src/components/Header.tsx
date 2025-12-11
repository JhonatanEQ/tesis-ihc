import { Menu, X } from 'lucide-react'

interface HeaderProps {
  showMobileMenu?: boolean
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export function Header({
  showMobileMenu = false,
  onMobileMenuToggle,
  isMobileMenuOpen = false,
}: HeaderProps) {
  return (
    <header className="relative bg-gradient-to-r from-[#002555] via-[#003770] to-[#004d93] text-white py-4 px-6 md:px-12 shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          {showMobileMenu && onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Cerrar menú de filtros' : 'Abrir menú de filtros'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
          
          <img 
            src="/logo.jpg" 
            alt="Logo FCyT" 
            className="w-10 h-10 rounded-sm object-cover"
          />
          <div>
            <h1 className="text-lg font-bold leading-none">
              Repositorio Tesis
            </h1>
            <span className="text-xs text-white/80">FCyT</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <img 
            src="/umss.png" 
            alt="Logo UMSA" 
            className="h-10 w-auto rounded-sm object-contain"
          />
        </div>
      </div>
      {/* Wave divider */}
      <svg className="absolute bottom-0 left-0 w-full h-4" viewBox="0 0 1200 12" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,6 C300,12 900,0 1200,6 L1200,12 L0,12 Z" fill="#f5f5f5" opacity="0.3"/>
      </svg>
    </header>
  )
}