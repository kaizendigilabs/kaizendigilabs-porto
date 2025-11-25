'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, FolderKanban } from "lucide-react"

interface ActivityItem {
    id: string
    title: string
    type: 'Article' | 'Project'
    status: string
    date: string
}

export function RecentActivityTable({ data }: { data: ActivityItem[] }) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No recent activity.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={`${item.type}-${item.id}`}>
                                <TableCell className="font-medium">{item.title}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {item.type === 'Article' ? (
                                            <FileText className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <FolderKanban className="h-4 w-4 text-purple-500" />
                                        )}
                                        {item.type}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(item.date))}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
