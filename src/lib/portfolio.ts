import { supabase } from './supabase'
import { usePortfolioStore } from './store'

export interface PortfolioPublic {
  id: string
  linkedin: string
  fullname: string
  work_profile: string
  main_course: string
  district: string
  country: string
  email: string
  phone: string
}

export async function getPortfolioProfile(): Promise<PortfolioPublic | null> {
  const { data, error } = await supabase
    .from('portfolio_public')
    .select('*')
    .eq('fullname', 'Izzat Hafizuddin Bin Zul Hilmi')
    .single()

  if (error) {
    console.error('Error fetching portfolio profile:', error)
    return null
  }

  if (data) {
    usePortfolioStore.getState().setProfile(data)
  }

  return data
}
