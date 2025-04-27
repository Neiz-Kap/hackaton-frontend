import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { envConfig } from '@/config/env.config'
import { employeeAPI } from '@/lib/api/employee.api'
import { organizationAPI } from '@/lib/api/organization.api'
import { Employee } from '@/lib/types'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Input } from '../ui/input'

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: 'Имя',
  },
  {
    accessorKey: 'surname',
    header: 'Фамилия',
  },
  {
    accessorKey: 'phone',
    header: 'Номер',
    cell: ({ row }) => <div>{row.getValue('status') ? 'Active' : 'Inactive'}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    //   cell: ({ row }) => {
    //     const startTime = new Date(row.getValue('start_time'))
    //     return <div>{format(startTime, 'yyyy-MM-dd HH:mm:ss')}</div>
    //   },
  },
  {
    accessorKey: 'email',
    header: 'Почта',
    // cell: ({ row }) => {
    //   const endTime = new Date(row.getValue('end_time'))
    //   return <div>{format(endTime, 'yyyy-MM-dd HH:mm:ss')}</div>
    // },
  },
]

export function EmployeeTable() {
  // State to store the fetched data
  const [data, setData] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch data from the backend when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await employeeAPI.getAll()
        setData(result)
      } catch (err) {
        setError('Error fetching data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Initialize the table with the fetched data
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Сотрудники</CardTitle>

        {loading && <div>Loading...</div>}
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Input
            placeholder="Фильтр сотрудников..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Колонки <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Нет результатов.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 pt-4">
          <div className="text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} из {table.getFilteredRowModel().rows.length} записей
            выведено
          </div>
          {error && <div className="mx-auto text-red-600">{error}</div>}

          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Назад
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Далее
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
