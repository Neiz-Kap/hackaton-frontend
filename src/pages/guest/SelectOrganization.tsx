import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useOrganizationsCache, useQueryOrganizations } from '@/hooks/api/use-organization'
import { organizationAPI } from '@/lib/api/organization.api'
import { Organization } from '@/lib/types'
import { FC, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'

interface SelectOrganizationProps {
  control: Control<{ id: number }>
}

export const SelectOrganization: FC<SelectOrganizationProps> = (props) => {
  const { control } = props

  const organizations = useOrganizationsCache()

  return (
    <FormField
      control={control}
      name="id"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Organization</FormLabel>
          {organizations.length <= 0 ? (
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
