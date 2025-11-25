'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { InquiryRecord } from "@/hooks/useInquiries";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, Building2, User } from "lucide-react";

interface InquiryDetailsDialogProps {
    inquiry: InquiryRecord | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function InquiryDetailsDialog({ inquiry, open, onOpenChange }: InquiryDetailsDialogProps) {
    if (!inquiry) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center justify-between mr-8">
                        <DialogTitle className="text-xl font-bold">{inquiry.subject}</DialogTitle>
                        <Badge variant={inquiry.status === "new" ? "default" : inquiry.status === "read" ? "secondary" : "outline"}>
                            {inquiry.status}
                        </Badge>
                    </div>
                    <DialogDescription>
                        Received on {new Date(inquiry.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{inquiry.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                                {inquiry.email}
                            </a>
                        </div>
                        {inquiry.phone && (
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <a href={`tel:${inquiry.phone}`} className="hover:underline">
                                    {inquiry.phone}
                                </a>
                            </div>
                        )}
                        {inquiry.company && (
                            <div className="flex items-center gap-3 text-sm">
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                <span>{inquiry.company}</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg md:col-span-2">
                        <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Message</h4>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {inquiry.message}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
