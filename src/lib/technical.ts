import { supabase } from './supabase'
import { usePortfolioStore } from './store'

export interface TechnicalPublic {
  id: number
  skills: string
  type: string
  user_id: number
}

export async function getTechnicalSkills(): Promise<TechnicalPublic[]> {
  const userId = usePortfolioStore.getState().userId

  if (!userId) {
    console.error('No user ID found in store')
    return []
  }

  const { data, error } = await supabase
    .from('technical_public')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching technical skills:', error)
    return []
  }

  return data ?? []
}
