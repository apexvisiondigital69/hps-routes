import { Database } from './database'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Route = Database['public']['Tables']['routes']['Row']
export type Stop = Database['public']['Tables']['stops']['Row']

export type StopStatus = 'pending' | 'finished' | 'skipped'
export type UserRole = 'admin' | 'rep'

export interface RouteWithStops extends Route {
  stops: Stop[]
}

export interface RouteWithProfile extends Route {
  profile: Profile
}

export interface StopFormData {
  phone?: string
  email?: string
  notes?: string
  status: StopStatus
}
