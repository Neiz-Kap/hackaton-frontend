import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { organizationAPI } from '@/lib/api/organization.api'
import { Organization } from '@/lib/types'
import { FC, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'

interface SelectOrganizationProps {
  control: Control<{ id: number }>
}

export const SelectOrganization: FC<SelectOrganizationProps> = (props) => {
  const { control } = props

  const [loading, setLoading] = useState<boolean>(true)
  const [organizations, setOrganization] = useState<Organization[]>([])

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const result = await organizationAPI.getAll()
        setOrganization(result)
      } catch (error) {
        console.error('Error fetching organizations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  return (
    <FormField
      control={control}
      name="id"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Organization</FormLabel>
          {loading ? (
            <Spinner />
          ) : organizations.length <= 0 ? (
            <p>No organization loaded</p>
          ) : (
            <Select onValueChange={field.onChange} value={field.value.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {organizations.map((organization) => (
                  <SelectItem value={organization.id.toString()} key={organization.id}>
                    {organization.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
