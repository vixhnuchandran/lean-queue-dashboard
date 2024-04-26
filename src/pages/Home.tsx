import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "../components/Login"
import { SignupForm } from "../components/Signup"

export function Home() {
  return (
    <>
      <div className="flex justify-center items-center lg:h-[700px] mt-6 p-5">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-5">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup" className="mt-5">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
