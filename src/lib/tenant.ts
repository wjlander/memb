import { supabase } from './supabase/client'

export interface Organization {
  id: string
  slug: string
  name: string
  domain: string | null
  logo_url: string | null
  primary_color: string
  secondary_color: string
  contact_email: string
  contact_phone: string | null
  settings: any
}

export const tenant = {
  async getOrganizationBySubdomain(subdomain: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('slug', subdomain)
      .eq('is_active', true)
      .single()

    if (error || !data) return null
    return data
  },

  getCurrentSubdomain(): string | null {
    if (typeof window === 'undefined') return null
    
    const hostname = window.location.hostname
    const parts = hostname.split('.')
    
    // For development (localhost)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Check for subdomain in URL params for testing
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get('org') || 'demo'
    }
    
    // For production (subdomain.member.ringing.org.uk)
    if (parts.length >= 3 && parts[parts.length - 3] === 'member') {
      return parts[0]
    }
    
    return null
  },

  isSuperAdminSubdomain(): boolean {
    if (typeof window === 'undefined') return false
    
    const hostname = window.location.hostname
    const parts = hostname.split('.')
    
    // For development (localhost)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get('org') === 'admin'
    }
    
    // For production (admin.member.ringing.org.uk)
    if (parts.length >= 3 && parts[parts.length - 3] === 'member') {
      return parts[0] === 'admin'
    }
    
    return false
  },

  async getCurrentOrganization(): Promise<Organization | null> {
    // Don't try to get organization for super admin subdomain
    if (this.isSuperAdminSubdomain()) return null
    
    const subdomain = this.getCurrentSubdomain()
    if (!subdomain) return null
    
    return await this.getOrganizationBySubdomain(subdomain)
  }
}