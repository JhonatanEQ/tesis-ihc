export interface FilterState {
  searchTerm: string
  selectedCareers: string[]
  yearFrom: string
  yearTo: string
  selectedArea: string
  selectedSubarea: string
  selectedModalities: string[]
  tutorName: string
}

export const initialFilterState: FilterState = {
  searchTerm: '',
  selectedCareers: [],
  yearFrom: '',
  yearTo: '',
  selectedArea: '',
  selectedSubarea: '',
  selectedModalities: ['tesis', 'proyecto', 'dirigido', 'adscripcion', 'tesina'],
  tutorName: '',
}
