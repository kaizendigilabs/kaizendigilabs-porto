import { TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ counts }: { counts: { articles: number, projects: number, services: number, inquiries: number } }) {
  return (
    <div className="*:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Articles</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {counts.articles}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Published
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Content Library <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total published articles
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Projects</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {counts.projects}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Portfolio
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Showcase Items <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total portfolio projects
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Services</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {counts.services}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Offerings
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active Services <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Service catalog items</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Inquiries</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {counts.inquiries}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              Leads
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            New Leads <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Total received inquiries</div>
        </CardFooter>
      </Card>
    </div>
  )
}
