import { create } from 'zustand'
import type { PortfolioPublic } from './portfolio'

interface PortfolioStore {
  profile: PortfolioPublic | null
  userId: string | null
  setProfile: (profile: PortfolioPublic) => void
  clearProfile: () => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  profile: null,
  userId: null,
  setProfile: (profile) => set({ profile, userId: profile.id }),
  clearProfile: () => set({ profile: null, userId: null }),
}))
