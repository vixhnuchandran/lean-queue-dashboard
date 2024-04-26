import SideNavBar from "../components/SideNavBar"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import { Label } from "@/components/ui/label"

export function AddQueue() {
  const { toast } = useToast()
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState("")
  const [isValidJson, setIsValidJson] = useState(true) // state to track JSON validity
  const [isJsonValid, setIsJsonValid] = useState<boolean | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = event => {
      try {
        const fileContent = event.target?.result as string
        JSON.parse(fileContent)
        setIsJsonValid(true)
      } catch (error) {
        setIsJsonValid(false)
      }
    }

    reader.onerror = () => {
      setIsJsonValid(false)
    }

    reader.readAsText(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.trim() === "") {
      setIsValidJson(false)
      return
    }

    try {
      JSON.parse(value)
      setIsValidJson(true)
    } catch (error) {
      setIsValidJson(false)
    }
  }

  return (
    <div className="grid m-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SideNavBar activeLink="/queues" />
      </div>
      <div className="flex flex-col">
        <Header activeLink="/queues" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">File</TabsTrigger>
              <TabsTrigger value="field">Field</TabsTrigger>
            </TabsList>
            <TabsContent value="file">
              <Card>
                <CardHeader>
                  <CardTitle>Upload JSON</CardTitle>
                  <CardDescription>
                    Create new queue and add tasks using json file.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="message">
                      {isJsonValid === false && (
                        <p className="text-red-500 text-sm">
                          The file is not a valid JSON.
                        </p>
                      )}
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".json"
                      ref={inputRef}
                      onChange={handleFileChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      toast({
                        title: "File uploaded successfully",
                        action: (
                          <ToastAction altText="Goto schedule to undo">
                            Undo
                          </ToastAction>
                        ),
                      })
                    }}
                  >
                    Upload
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="field">
              <Card>
                <CardHeader>
                  <CardTitle>Input JSON</CardTitle>
                  <CardDescription>
                    Create new queue and add tasks using json text.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 ">
                  <CardContent className="space-y-2 ">
                    <div className="space-y-1 max-h-screen">
                      <Label htmlFor="message">
                        {!isValidJson && (
                          <p className="text-red-500 text-sm mb-2">
                            Invalid Json format.
                          </p>
                        )}
                      </Label>

                      <Textarea
                        placeholder="Type your JSON here."
                        className="h-[500px]"
                        value={inputValue}
                        onChange={handleInputChange}
                      />
                    </div>
                  </CardContent>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      toast({
                        title: "File submitted successfully",
                      })
                    }}
                  >
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
