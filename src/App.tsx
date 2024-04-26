import "./App.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"
import { Queues } from "./pages/Queues"
import { Settings } from "./pages/Settings"
import { Queue } from "./pages/Queue"
import { Task } from "./pages/Tasks"
import { AddQueue } from "./pages/AddQueue"
import { AddTasks } from "./pages/AddTasks"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/queues" element={<Queues />} />
        <Route path="/queues/create" element={<AddQueue />} />
        <Route path="/queues/:id" element={<Queue />} />
        <Route path="/queues/:id/add" element={<AddTasks />} />
        <Route path="/queues/:id/:taskid" element={<Task />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    )
  )

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
