import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'
export function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#002555] via-[#003770] to-[#002555] text-white">
      {/* Wave divider invertido */}
      <svg className="absolute top-0 left-0 w-full h-4 rotate-180" viewBox="0 0 1200 12" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,6 C300,12 900,0 1200,6 L1200,12 L0,12 Z" fill="#f5f5f5" opacity="0.3"/>
      </svg>
      <div className="max-w-7xl mx-auto px-6 py-10 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">
              Facultad de Ciencias y Tecnología
            </h3>
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Av. Oquendo #999999, Cochabanmba - Bolivia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+591 (2) 2442244</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@fcyt.umss.edu.bo</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <a href="#" className="hover:text-white hover:underline transition-all duration-300">
                  Acerca del Repositorio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-all duration-300">
                  Cómo publicar tu tesis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-all duration-300">
                  Políticas de uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline transition-all duration-300">
                  Contacto y soporte
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-4 text-xs text-white/60">
              Universidad Mayor de San Simon
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6">
          <p className="text-xs text-white/60 text-center">
            © {new Date().getFullYear()} Repositorio de Tesis - Facultad de Ciencias y Tecnología. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
