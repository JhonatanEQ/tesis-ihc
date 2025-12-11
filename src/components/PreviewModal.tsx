import React from 'react'
import { X, Download, Eye } from 'lucide-react'
import type { Thesis } from './ThesisCard'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Tooltip } from './ui/Tooltip'
interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  thesis: Thesis | null
}
export function PreviewModal({ isOpen, onClose, thesis }: PreviewModalProps) {
  if (!isOpen || !thesis) return null

  const handleViewFull = () => {
    if (thesis.pdfUrl) {
      window.open(thesis.pdfUrl, '_blank')
    } else {
      window.open('/pdfs/' + thesis.id + '.pdf', '_blank')
    }
  }

  const handleDownload = () => {
    const pdfUrl = thesis.pdfUrl || '/pdfs/' + thesis.id + '.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${thesis.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col animate-slideUp">
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-gray-100 bg-gradient-to-r from-[#003770]/5 to-transparent">
          <div className="flex items-center space-x-3">
            <Badge className="bg-linear-to-r from-[#002555] via-[#003770] to-[#004d93] text-white border-[#003770]">
              {thesis.type}
            </Badge>
            <Badge className="bg-linear-to-r from-[#002555] via-[#003770] to-[#004d93] text-white border-[#003770]">
              {thesis.year}
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#E30613] transition-colors p-1 rounded-full hover:bg-red-50"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#003770] leading-tight">
              {thesis.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 p-6 bg-gradient-to-br from-blue-50/50 to-transparent rounded-xl border-2 border-[#003770]/10">
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="block text-xs font-bold text-[#003770] uppercase tracking-wider">
                    Autor
                  </span>
                  <Tooltip
                    content="Autor principal de la tesis"
                    position="right"
                  />
                </div>
                <span className="text-gray-900 font-semibold">
                  {thesis.author}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="block text-xs font-bold text-[#003770] uppercase tracking-wider">
                    Tutor
                  </span>
                  <Tooltip
                    content="Docente guía de la investigación"
                    position="right"
                  />
                </div>
                <span className="text-gray-900">{thesis.tutor || 'N/A'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="block text-xs font-bold text-[#003770] uppercase tracking-wider">
                    Área / Subárea
                  </span>
                  <Tooltip
                    content="Campo de estudio de la investigación"
                    position="right"
                  />
                </div>
                <span className="text-gray-900">
                  Inteligencia Artificial / Machine Learning
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="block text-xs font-bold text-[#003770] uppercase tracking-wider">
                    Carrera
                  </span>
                  <Tooltip
                    content="Programa académico del autor"
                    position="right"
                  />
                </div>
                <span className="text-gray-900">{thesis.career}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-[#003770]">Resumen</h3>
              <Tooltip
                content="Descripción breve del contenido de la tesis"
                position="right"
              />
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p className="bg-gradient-to-br from-gray-50 to-transparent p-5 rounded-lg border-2 border-gray-100">
                {thesis.abstract ||
                  'Este trabajo presenta una investigación exhaustiva sobre la aplicación de técnicas modernas en el campo de estudio seleccionado. Se analizan los resultados obtenidos mediante experimentación rigurosa y se proponen nuevas metodologías para abordar los problemas identificados en la literatura actual. Los hallazgos sugieren mejoras significativas en eficiencia y precisión comparado con los métodos tradicionales.'}
              </p>
              <div className="space-y-2 pl-5">
                <div className="h-2 bg-gray-100 rounded w-full"></div>
                <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                <div className="h-2 bg-gray-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-transparent border-t-2 border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            variant="primary"
            icon={Eye}
            className="bg-[#003770] hover:bg-[#002555] shadow-lg w-full sm:w-auto"
            onClick={handleViewFull}
          >
            Ver completo
          </Button>
          <Button
            variant="secondary"
            icon={Download}
            className="border-2 border-gray-300 hover:border-[#E30613] hover:text-[#E30613] w-full sm:w-auto"
            onClick={handleDownload}
          >
            Descargar
          </Button>
        </div>
      </div>
    </div>
  )
}
