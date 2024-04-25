import SideNavBar from "../components/SideNavBar"
import Header from "@/components/Header"

export function Settings() {
  return (
    <div className="grid m-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SideNavBar activeLink="/settings" />
      </div>
      <div className="flex flex-col">
        <Header activeLink="/settings" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"></main>
      </div>
    </div>
  )
}
