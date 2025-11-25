import { Check, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export interface BubbleMenuItem {
    name: string;
    isActive: () => boolean;
    command: () => void;
}

interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NodeSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
    const { editor } = useEditor();
    if (!editor) return null;

    const items: BubbleMenuItem[] = [
        {
            name: "Paragraph",
            isActive: () =>
                editor.isActive("paragraph") &&
                !editor.isActive("bulletList") &&
                !editor.isActive("orderedList"),
            command: () => editor.chain().focus().setParagraph().run(),
        },
        {
            name: "Heading 1",
            isActive: () => editor.isActive("heading", { level: 1 }),
            command: () => editor.chain().focus().setHeading({ level: 1 }).run(),
        },
        {
            name: "Heading 2",
            isActive: () => editor.isActive("heading", { level: 2 }),
            command: () => editor.chain().focus().setHeading({ level: 2 }).run(),
        },
        {
            name: "Heading 3",
            isActive: () => editor.isActive("heading", { level: 3 }),
            command: () => editor.chain().focus().setHeading({ level: 3 }).run(),
        },
        {
            name: "To-do List",
            isActive: () => editor.isActive("taskItem"),
            command: () => editor.chain().focus().toggleTaskList().run(),
        },
        {
            name: "Bullet List",
            isActive: () => editor.isActive("bulletList"),
            command: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
            name: "Numbered List",
            isActive: () => editor.isActive("orderedList"),
            command: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
            name: "Quote",
            isActive: () => editor.isActive("blockquote"),
            command: () => editor.chain().focus().toggleBlockquote().run(),
        },
        {
            name: "Code",
            isActive: () => editor.isActive("codeBlock"),
            command: () => editor.chain().focus().toggleCodeBlock().run(),
        },
    ];

    const activeItem = items.find((item) => item.isActive());

    return (
        <Popover modal={true} open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="gap-2 rounded-none border-none">
                    <span className="whitespace-nowrap text-sm">{activeItem?.name || "Paragraph"}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={5} align="start" className="w-48 p-1">
                {items.map((item, index) => (
                    <EditorBubbleItem
                        key={index}
                        onSelect={(editor) => {
                            item.command();
                            onOpenChange(false);
                        }}
                        className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
                    >
                        <span>{item.name}</span>
                        {activeItem?.name === item.name && <Check className="h-4 w-4" />}
                    </EditorBubbleItem>
                ))}
            </PopoverContent>
        </Popover>
    );
};
