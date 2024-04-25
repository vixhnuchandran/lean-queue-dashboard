import { useLocation } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { ChevronRight } from "lucide-react"

const Breadcrumbs = () => {
  const location = useLocation()
  const path = location.pathname.split("/").filter(Boolean)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === path.length - 1 ? (
              <span>{capitalizeFirstLetter(item)}</span>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${path.slice(0, index + 1).join("/")}`}>
                  {capitalizeFirstLetter(item)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < path.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default Breadcrumbs
