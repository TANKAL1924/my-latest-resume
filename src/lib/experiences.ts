import { supabase } from './supabase'
import { usePortfolioStore } from './store'

export type WorkListItem = Record<string, string>

export interface ExperienceDescriptionProject {
  project: string
  work_list: WorkListItem[]
}

export interface ExperienceDescriptionSimple {
  work: string
}

export type ExperienceDescriptionItem =
  | ExperienceDescriptionProject
  | ExperienceDescriptionSimple

export interface ExperiencePublic {
  id: string
  company_name: string
  description: ExperienceDescriptionItem[] | null
  start_date: string
  end_date: string | null
  title_company: string
  user_id: string
}

export async function getExperiences(): Promise<ExperiencePublic[]> {
  const userId = usePortfolioStore.getState().userId

  if (!userId) {
    console.error('No user ID found in store')
    return []
  }

  const { data, error } = await supabase
    .from('experiences_public')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false })

  if (error) {
    console.error('Error fetching experiences:', error)
    return []
  }

  return data ?? []
}
