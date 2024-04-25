import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { useParams } from "react-router-dom"
import { QData, Tasks } from "@/data/queuesData"

import SideNavBar from "../components/SideNavBar"
import Header from "@/components/Header"
import { getRandomDate } from "@/utils/randDateGen"
export function Task() {
  const { id, taskid } = useParams()
  const dataQ: Tasks[] = QData.filter(item => item.id === id)[0].tasks
  const dataT: Tasks | undefined = dataQ.find(
    item => item.taskId === taskid?.toUpperCase()
  )

  return (
    <div className="grid m-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SideNavBar activeLink="/queues" />
      </div>
      <div className="flex flex-col">
        <Header activeLink="/queues" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {dataT ? (
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {dataT.taskId}
                  </CardTitle>
                  <CardDescription>Id: {dataT.taskId} </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Id</span>
                      <span className="font-semibold">{dataT.taskId}</span>
                    </li>
                    <li className="lg:flex items-center justify-between font-semibold hidden">
                      <span className="text-muted-foreground ">Params </span>
                      <span className="font-semibold">
                        {JSON.stringify(dataT.params)}
                      </span>
                    </li>

                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Priority</span>
                      <span className="font-semibold">{dataT.priority}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">result</span>
                      <span className="font-semibold">{dataT.result}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Time Metrics</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Created at</span>
                      <span className="font-semibold">{dataT.createdAt}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground ">Updated at</span>
                      <span className="font-semibold">{dataT.updatedAt}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Expiry time</span>
                      <span className="font-semibold">
                        {getRandomDate().toISOString()}
                      </span>
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
        </main>
      </div>
    </div>
  )
}
