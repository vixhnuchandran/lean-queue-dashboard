import React from "react"
import { Link } from "react-router-dom"
import {
  SettingsIcon,
  HomeIcon,
  ListEndIcon,
  GalleryVerticalEndIcon,
} from "lucide-react"

interface SideNavBarProps {
  activeLink: string
}

const SideNavBar: React.FC<SideNavBarProps> = ({ activeLink }) => {
  return (
    <>
      <div className="flex h-full min-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <GalleryVerticalEndIcon className="h-6 w-6" />
            <span className="">Lean Queue</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeLink === "/dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              } transition-all hover:text-primary`}
            >
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/queues"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeLink === "/queues"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              } transition-all hover:text-primary`}
            >
              <ListEndIcon className="h-4 w-4" />
              Queues
            </Link>
            <Link
              to="/settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                activeLink === "/settings"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              } transition-all hover:text-primary`}
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default SideNavBar
