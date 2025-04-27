import { organizationAPI } from '@/lib/api/organization.api'
import { QUERY_KEYS } from '@/lib/constants'
import { Organization } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from '../use-toast'

export const useQueryOrganizations = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATION],
    // staleTime: Infinity,
    queryFn: organizationAPI.getAll,
    throwOnError: (error) => {
      if (error instanceof Error) toast({ title: `Failed to get organizations: ${error}` })
      return false
    },
  })
}

export const useOrganizationsCache = () => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<Organization[]>([QUERY_KEYS.ORGANIZATION]) || []
}

// export const useCreateOrganization = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: organizationAPI.createOneWithMembership,
//     onSuccess: (data) => {
//       console.debug('Organization created: ', data)
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION] })
//     },
//   })
// }

// export const useUpdateOrganization = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({
//       organizationId,
//       update,
//     }: {
//       organizationId: ObjectId
//       update: TUpdateOrganization & { accountId: ObjectId }
//     }) => organizationAPI.updateOneWithMembership(organizationId, update),
//     onSuccess: (data) => {
//       console.debug('Organization updated: ', data)
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION] })
//     },
//   })
// }

// export const useDeleteOrganization = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: organizationAPI.delete,
//     onSuccess: (data) => {
//       console.debug('Organization deleted: ', data)
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORGANIZATION] })
//     },
//   })
// }
