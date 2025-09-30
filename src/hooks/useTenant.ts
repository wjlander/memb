import { useState, useEffect } from 'react'
import { tenant, Organization } from '@/lib/tenant'

export function useTenant() {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        console.log('Loading organization...')
        // Check if this is the super admin subdomain
        if (tenant.isSuperAdminSubdomain()) {
          console.log('Detected super admin subdomain')
          setIsSuperAdmin(true)
          setOrganization(null)
          setLoading(false)
          return
        }

        console.log('Getting current organization...')
        const org = await tenant.getCurrentOrganization()
        console.log('Current organization result:', org)
        if (!org) {
          console.log('No organization found, setting error')
          setError('Organization not found')
        } else {
          console.log('Organization found:', org.name)
          setOrganization(org)
        }
      } catch (err) {
        console.log('Error loading organization:', err)
        setError('Failed to load organization')
        console.error('Error loading organization:', err)
      } finally {
        setLoading(false)
      }
    }

    loadOrganization()
  }, [])

  return {
    organization,
    loading,
    error,
    subdomain: tenant.getCurrentSubdomain(),
    isSuperAdmin
  }
}