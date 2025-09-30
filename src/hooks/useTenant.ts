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
        // Check if this is the super admin subdomain
        if (tenant.isSuperAdminSubdomain()) {
          setIsSuperAdmin(true)
          setOrganization(null)
          setLoading(false)
          return
        }

        const org = await tenant.getCurrentOrganization()
        if (!org) {
          setError('Organization not found')
        } else {
          setOrganization(org)
        }
      } catch (err) {
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