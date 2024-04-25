import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  File,
  CircleAlertIcon,
  ListPlusIcon,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react"
import SideNavBar from "../components/SideNavBar"
import Header from "@/components/Header"
import { QData } from "@/data/queuesData"
import { useNavigate } from "react-router-dom"
export function Dashboard() {
  const navigate = useNavigate()

  const handleRowClick = (rowId: string | number) => {
    navigate(`/queues/${rowId}`)
  }
  return (
    <div className="grid m-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SideNavBar activeLink="/dashboard" />
      </div>
      <div className="flex flex-col">
        <Header activeLink="/dashboard" />
        <main className="flex flex-1  flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex justify-between items-center">
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Last hour" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="hour">Last hour</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="6month">6 Months</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" className="h-10 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Tasks
                </CardTitle>
                <CircleAlertIcon
                  size={30}
                  className="text-orange-400 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  23456 {/*  pending tasks cunt goes here*/}
                </div>
                <p className="text-xs text-muted-foreground">
                  40.1% in total
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Added Tasks
                </CardTitle>
                <ListPlusIcon
                  size={30}
                  className="text-indigo-400 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  +3456 {/*  added tasks cunt goes here*/}
                </div>
                <p className="text-xs text-muted-foreground">
                  +50.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Success Tasks
                </CardTitle>
                <CircleCheckIcon
                  size={30}
                  className="text-green-400 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  14567 {/*  error tasks cunt goes here*/}
                </div>
                <p className="text-xs text-muted-foreground">96% in total</p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Error Tasks
                </CardTitle>
                <CircleXIcon
                  size={30}
                  className="text-red-400 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  573 {/* error tasks cunt goes here*/}
                </div>
                <p className="text-xs text-muted-foreground">4% in total</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-0">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Queues</CardTitle>
                  <CardDescription>Recent completed queues.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" text-left font-medium">
                        Id
                      </TableHead>
                      <TableHead className=" text-left font-medium">
                        Type
                      </TableHead>
                      <TableHead className=" text-left font-medium hidden lg:table-cell">
                        Pending
                      </TableHead>
                      <TableHead className=" text-left font-medium ">
                        Interval
                      </TableHead>
                      <TableHead className=" text-left font-medium ">
                        Duration
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {QData.slice(-7).map(item => (
                      <TableRow onClick={() => handleRowClick(item.id)}>
                        <TableCell>
                          <div className=" text-left font-medium">
                            {item.id}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-left font-normal">
                            {item.type}
                          </div>
                        </TableCell>
                        <TableCell className="text-left font-normal lg:block hidden ">
                          <div>{item.pendingTasks}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-left font-normal">2 m</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-left font-normal">7 h</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
