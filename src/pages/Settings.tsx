import SideNavBar from "../components/SideNavBar"
import Header from "@/components/Header"
import { Server, ServerCog, PcCase } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function Settings() {
  return (
    <div className="grid m-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SideNavBar activeLink="/settings" />
      </div>
      <div className="flex flex-col">
        <Header activeLink="/settings" />

        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 md:p-8">
          <div className="relative  flex-col items-start gap-8 md:flex">
            <form className="grid w-full h-screen items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <div className="grid gap-3 ">
                  <Label htmlFor="model">Server</Label>
                  <div className="flex flex-col justify-center items-center space-y-3 ">
                    <div className="flex  justify-start items-start w-full space-x-3">
                      <Input type="url" placeholder="Server url..." />
                      <Button variant={"outline"} type="submit">
                        Add
                      </Button>
                    </div>
                    <Select defaultValue="s-mx13">
                      <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s-mx13">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <ServerCog className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Server
                                <span className="font-medium text-foreground">
                                  MX13
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Specification here
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="s-ax13">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Server className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Server
                                <span className="font-medium text-foreground">
                                  AX13
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Specification here
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="s-cx13">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <PcCase className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Server
                                <span className="font-medium text-foreground">
                                  CX13
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Specification here
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
