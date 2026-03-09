import { supabase } from './supabase'
import { usePortfolioStore } from './store'

export interface ReferencePublic {
  id: string
  user_id: string
  name: string
  position: string
  email: string
  number: string
}

export async function getReferences(): Promise<ReferencePublic[]> {
  const userId = usePortfolioStore.getState().userId

  if (!userId) {
    console.error('No user ID found in store')
    return []
  }

  const { data, error } = await supabase
    .from('references_public')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching references:', error)
    return []
  }

  return data ?? []
}
