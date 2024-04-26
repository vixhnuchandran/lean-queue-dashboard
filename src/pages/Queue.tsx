import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreVertical, ListPlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useParams } from "react-router-dom"
import { Payment, QData, Tasks } from "@/data/queuesData"
import { Link } from "react-router-dom"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import SideNavBar from "../components/SideNavBar"
import Header from "@/components/Header"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// eslint-disable-next-line react-refresh/only-export-components

export function Queue() {
  const { id } = useParams()

  const columns: ColumnDef<Tasks>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "taskId",
      header: ({ column }) => {
        return (
          <Link
            to="#"
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <div className="flex items-center">
              <span>Id</span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Link>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase ">{row.getValue("taskId")}</div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const data: string = row.getValue("taskId")
        const taskId = data.toLowerCase()
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/queues/${id}/${taskId}`}>
                <DropdownMenuItem>View details</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const dataQ: Payment[] = QData.filter(item => item.id === id)
  const data: Tasks[] = dataQ[0].tasks

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="grid m-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SideNavBar activeLink="/queues" />
      </div>
      <div className="flex flex-col">
        <Header activeLink="/queues" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs defaultValue="queue">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="queue">Queue</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="queue" className="mt-11">
              {dataQ.length !== 0 ? (
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        {dataQ[0].type}
                      </CardTitle>
                      <CardDescription>Id: {dataQ[0].id} </CardDescription>
                      {dataQ.map(item => (
                        <Badge
                          variant="outline"
                          className={`mt-2 ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-500"
                              : item.status === "processing"
                              ? "bg-orange-100 text-orange-500"
                              : item.status === "error"
                              ? "bg-red-100 text-red-500"
                              : "bg-indigo-100 text-indigo-500"
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </Badge>
                      ))}
                    </div>

                    <div className="ml-auto flex items-center gap-1">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <TrashIcon className="h-3.5 w-3.5 text-red-500" />
                            <span className="sr-only">More</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete this queue and remove all
                              related tasks.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Confirm</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <Link to={`/queues/${id}/add`}>
                            <DropdownMenuItem>Add tasks</DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Details</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Id</span>
                          <span className="font-semibold">{dataQ[0].id}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground ">Type </span>
                          <span className="font-semibold">{dataQ[0].type}</span>
                        </li>

                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Tags</span>
                          <span className="font-semibold">{dataQ[0].tags}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Pending tasks
                          </span>
                          <span className="font-semibold">
                            {dataQ[0].pendingTasks}
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Total tasks
                          </span>
                          <span className="font-semibold">
                            {dataQ[0].totalTasks}
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Notes</span>
                          <span className="font-semibold">
                            {dataQ[0].notes}
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Callback url
                          </span>
                          <span className="font-semibold">
                            {dataQ[0].options.callback}
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Expiry time
                          </span>
                          <span className="font-semibold">
                            {dataQ[0].options.expiryTime / (1000 * 60) + " min"}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Time Metrics</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Created at
                          </span>
                          <span className="font-semibold">
                            {dataQ[0].createdAt}
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground ">
                            Updated at
                          </span>
                          <span className="font-semibold">
                            {dataQ[0].updatedAt}
                          </span>
                        </li>

                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Avg execution time
                          </span>
                          <span className="font-semibold">N/A</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Expected completion time
                          </span>
                          <span className="font-semibold">N/A</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Completed in
                          </span>
                          <span className="font-semibold">N/A</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p>No data available</p>
              )}
            </TabsContent>

            <TabsContent value="tasks">
              <div className="w-full">
                <div className="flex items-center justify-between space-x-4 lg:space-x-4 py-4">
                  <Input
                    placeholder="Search..."
                    value={
                      (table.getColumn("taskId")?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={event =>
                      table
                        .getColumn("taskId")
                        ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                  />
                  <div className="flex items-center space-x-4">
                    <Link to={`/queues/${id}/add`}>
                      <Button variant={"outline"}>
                        <div className="flex items-center space-x-2">
                          <ListPlusIcon size={18} /> <span>Add Tasks</span>{" "}
                        </div>
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className=" ">
                        <Button variant="outline" className="ml-auto">
                          Show <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {table
                          .getAllColumns()
                          .filter(column => column.getCanHide())
                          .map(column => {
                            return (
                              <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={value =>
                                  column.toggleVisibility(!!value)
                                }
                              >
                                {column.id}
                              </DropdownMenuCheckboxItem>
                            )
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="">
                      {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map(header => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </TableHead>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map(cell => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
