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
import { Mail, Phone, Building2, User, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { replyInquiry } from "../actions";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface InquiryDetailsDialogProps {
    inquiry: InquiryRecord | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export function InquiryDetailsDialog({ inquiry, open, onOpenChange }: InquiryDetailsDialogProps) {
    const [replyMessage, setReplyMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    if (!inquiry) return null;

    const handleReply = async () => {
        if (!replyMessage.trim()) return;

        setIsSending(true);
        try {
            const result = await replyInquiry(inquiry.id, replyMessage, inquiry.email, inquiry.subject);
            
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Reply sent successfully");
                setReplyMessage("");
                onOpenChange(false);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                                <span className="text-muted-foreground">{inquiry.company}</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg md:col-span-2">
                        <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Message</h4>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground/90">
                            {inquiry.message}
                        </p>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                         <Separator />
                         <div className="space-y-2">
                            <h4 className="text-sm font-medium">Reply to {inquiry.name}</h4>
                            <Textarea 
                                placeholder="Type your reply here..." 
                                className="min-h-[120px]"
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button onClick={handleReply} disabled={isSending || !replyMessage.trim()}>
                                    {isSending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Reply
                                        </>
                                    )}
                                </Button>
                            </div>
                         </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

