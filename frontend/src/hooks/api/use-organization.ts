import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/lib/constants'
import { ObjectId, TUpdateOrganization } from '@/lib/dashboard/types'

import { organizationAPI } from './api/dashboard/organization.api'

export const useCreateOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: organizationAPI.createOneWithMembership,
    onSuccess: (data) => {
      console.debug('Organization created: ', data)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION] })
    },
  })
}

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      organizationId,
      update,
    }: {
      organizationId: ObjectId
      update: TUpdateOrganization & { accountId: ObjectId }
    }) => organizationAPI.updateOneWithMembership(organizationId, update),
    onSuccess: (data) => {
      console.debug('Organization updated: ', data)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION] })
    },
  })
}

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: organizationAPI.delete,
    onSuccess: (data) => {
      console.debug('Organization deleted: ', data)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION] })
    },
  })
}
