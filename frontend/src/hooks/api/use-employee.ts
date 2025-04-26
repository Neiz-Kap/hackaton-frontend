import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/lib/constants'
import { ObjectId, TUpdateRole } from '@/lib/dashboard/types'

import { roleAPI } from './api/dashboard/role.api'

export const useCreateRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: roleAPI.create,
    onSuccess: (data) => {
      console.debug('Role created: ', data)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROLE] })
    },
  })
}

export const useUpdateRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ roleId, update }: { roleId: ObjectId; update: TUpdateRole }) => roleAPI.update(roleId, update),
    onSuccess: (data) => {
      console.debug('Role updated: ', data)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROLE] })
    },
  })
}

export const useDeleteRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: roleAPI.delete,
    onSuccess: (data) => {
      console.debug('Role deleted: ', data)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROLE] })
    },
  })
}
