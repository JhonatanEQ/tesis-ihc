import React, { useState } from 'react'
import {
  Search,
  Filter,
  Eye,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react'
import { Card } from './ui/Card'
export function HelpSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const steps = [
    {
      icon: Search,
      title: '1. Busca con palabras clave',
      description:
        'Escribe palabras clave en el buscador; obtendrás sugerencias automáticas.',
      tip: 'Escribe autor, título o tema',
      color: 'text-[#003770]',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Filter,
      title: '2. Refina con filtros',
      description:
        'Refina tu búsqueda usando filtros de carrera, área, tutor, modalidad y año.',
      tip: 'Selecciona uno o varios filtros',
      color: 'text-[#003770]',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Eye,
      title: '3. Explora resultados',
      description:
        'Explora los resultados en tarjetas informativas y usa "Vista previa".',
      tip: 'Vista previa para leer el resumen sin abrir PDF',
      color: 'text-[#003770]',
      bgColor: 'bg-blue-50',
    },
    {
      icon: RotateCcw,
      title: '4. Vuelve cuando quieras',
      description:
        'Utiliza "Volver a resultados" para conservar filtros y estado.',
      tip: 'Tus filtros se mantienen al navegar',
      color: 'text-[#003770]',
      bgColor: 'bg-blue-50',
    },
  ]
  return (
    <Card className="border-2 border-[#003770]/10 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#003770] flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-[#003770]">
              ¿Cómo buscar una tesis?
            </h3>
            <p className="text-sm text-gray-600">Guía rápida en 4 pasos</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[#003770]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#003770]" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg ${step.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center space-x-1 text-xs text-[#003770] bg-blue-50 px-2 py-1 rounded">
                      <span className="font-medium">💡</span>
                      <span>{step.tip}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Warning Box */}
          <div className="mt-6 p-4 bg-red-50 border border-[#E30613]/20 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[#E30613] flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-[#E30613] mb-1">Importante</h5>
              <p className="text-sm text-gray-700">
                Si no encuentras resultados, intenta con términos más generales
                o revisa los filtros aplicados.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
