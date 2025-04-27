import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Input } from '../ui/input'

export type Session = {
  start_time: string
  end_time: string
  total_calls: number
  status: boolean
  employee_id: number
}

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: 'employee_id',
    header: 'Employee ID',
  },
  {
    accessorKey: 'total_calls',
    header: 'Всего звонков',
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => <div>{row.getValue('status') ? 'Active' : 'Inactive'}</div>,
  },
  {
    accessorKey: 'start_time',
    header: 'Время начала',
    cell: ({ row }) => {
      const startTime = new Date(row.getValue('start_time'))
      return <div>{format(startTime, 'yyyy-MM-dd HH:mm:ss')}</div>
    },
  },
  {
    accessorKey: 'end_time',
    header: 'Время завершения',
    cell: ({ row }) => {
      const endTime = new Date(row.getValue('end_time'))
      return <div>{format(endTime, 'yyyy-MM-dd HH:mm:ss')}</div>
    },
  },
]

export function EmployeeSessionTable() {
  // State to store the fetched data
  const [data, setData] = React.useState<Session[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch data from the backend when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hackathon-backend-szk8.onrender.com/session/')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        setData(jsonData)
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
        <CardTitle>Сессия сотрудников</CardTitle>

        {loading && <div>Loading...</div>}
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Input
            placeholder="Фильтр сессий..."
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
          {error && <div className='mx-auto text-red-600'>{error}</div>}

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
