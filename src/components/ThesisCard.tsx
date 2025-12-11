
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Eye } from 'lucide-react'
export interface Thesis {
  id: string
  title: string
  author: string
  year: string
  career: string
  type: string
  tutor?: string
  abstract?: string
  keywords?: string[]
  pdfUrl?: string
}
interface ThesisCardProps {
  thesis: Thesis
  onPreview: (thesis: Thesis) => void
}
export function ThesisCard({ thesis, onPreview }: ThesisCardProps) {
  return (
    <Card className="p-6 hover:shadow-2xl hover:border-[#003770]/40 transition-all duration-300 border-2 border-gray-100 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex space-x-2">
          <Badge className="bg-[#003770] text-white border-[#003770] font-semibold">
            {thesis.type}
          </Badge>
          <Badge className="bg-[#E30613] text-white border-[#E30613] font-semibold">
            {thesis.year}
          </Badge>
        </div>
      </div>

      <h3
        className="text-xl font-bold text-gray-900 mb-4 cursor-pointer hover:text-[#003770] transition-colors leading-tight group-hover:text-[#003770]"
        onClick={() => onPreview(thesis)}
      >
        {thesis.title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-start text-sm">
          <span className="font-bold text-[#003770] w-20 flex-shrink-0">
            Autor:
          </span>
          <span className="text-gray-700">{thesis.author}</span>
        </div>
        <div className="flex items-start text-sm">
          <span className="font-bold text-[#003770] w-20 flex-shrink-0">
            Carrera:
          </span>
          <span className="text-gray-700">{thesis.career}</span>
        </div>
        {thesis.tutor && (
          <div className="flex items-start text-sm">
            <span className="font-bold text-[#003770] w-20 flex-shrink-0">
              Tutor:
            </span>
            <span className="text-gray-700">{thesis.tutor}</span>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onPreview(thesis)}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border-2 border-[#003770] text-[#003770] rounded-lg font-medium hover:bg-[#003770] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group"
        >
          <Eye className="w-4 h-4" />
          <span>Vista Previa</span>
        </button>
      </div>
    </Card>
  )
}
