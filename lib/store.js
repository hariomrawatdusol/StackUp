'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedProjects } from './mockData'

export const useStore = create(persist((set, get) => ({
  role: null, // 'creator' | 'brand'
  wallet: 12500,
  totalEarned: 45000,
  applied: [], // project ids
  completed: [], // project ids
  projects: seedProjects,
  myProjects: [], // brand-created project ids
  hired: {}, // { projectId: creatorId }
  history: [
    { id: 'h1', label: 'Boat Reel Edit', amount: 3000, status: 'Completed' },
    { id: 'h2', label: 'Sugar UGC Bundle', amount: 5500, status: 'Completed' },
    { id: 'h3', label: 'Nykaa Copy Deck', amount: 4000, status: 'Completed' },
  ],

  setRole: (role) => set({ role }),

  applyToProject: (pid) => set(state => ({
    applied: state.applied.includes(pid) ? state.applied : [...state.applied, pid],
    projects: state.projects.map(p => p.id === pid ? { ...p, applicants: p.applicants.includes('you') ? p.applicants : [...p.applicants, 'you'] } : p),
  })),

  postProject: (proj) => set(state => {
    const id = 'pnew_' + Date.now()
    const created = { ...proj, id, applicants: proj.applicants || [], escrow: proj.budget, status: 'open', brand: 'You', brandColor: '#7B2FFF' }
    return {
      projects: [created, ...state.projects],
      myProjects: [id, ...state.myProjects],
    }
  }),

  hireCreator: (pid, cid) => set(state => ({
    hired: { ...state.hired, [pid]: cid },
    projects: state.projects.map(p => p.id === pid ? { ...p, status: 'hired', hiredCreator: cid } : p),
  })),

  markComplete: (pid) => set(state => {
    const proj = state.projects.find(p => p.id === pid)
    const amount = proj ? proj.budget : 0
    return {
      projects: state.projects.map(p => p.id === pid ? { ...p, status: 'completed' } : p),
      completed: state.completed.includes(pid) ? state.completed : [...state.completed, pid],
      history: [{ id: 'h_' + Date.now(), label: (proj?.brand || 'Brand') + ' - ' + (proj?.title || 'Project'), amount, status: 'Completed' }, ...state.history],
      wallet: state.wallet + amount,
      totalEarned: state.totalEarned + amount,
    }
  }),

  cashout: () => set(state => ({
    history: [{ id: 'h_' + Date.now(), label: 'UPI Cashout', amount: -state.wallet, status: 'Withdrawn' }, ...state.history],
    wallet: 0,
  })),
}), {
  name: 'stackup-store',
  version: 1,
}))
