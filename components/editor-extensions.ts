import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Youtube from "@tiptap/extension-youtube";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

// Create lowlight instance for syntax highlighting
const lowlight = createLowlight(common);

export const defaultExtensions = [
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
        blockquote: {
            HTMLAttributes: {
                class: "border-l-4 border-primary pl-4 italic",
            },
        },
        codeBlock: false, // We'll use CodeBlockLowlight instead
        horizontalRule: false, // We'll use the extension separately
    }),
    Placeholder.configure({
        // Tiptap's node type is complex and not easily typed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        placeholder: ({ node }: { node: any }) => {
            if (node.type.name === "heading") {
                return `Heading ${node.attrs.level}`;
            }
            return "Press '/' for commands, or start typing...";
        },
        includeChildren: true,
    }),
    TiptapLink.configure({
        HTMLAttributes: {
            class: "text-primary underline underline-offset-4 hover:text-primary/80 cursor-pointer",
        },
        openOnClick: false,
    }),
    TiptapImage.configure({
        HTMLAttributes: {
            class: "rounded-lg border border-muted",
        },
    }),
    Underline,
    TextStyle,
    Color,
    TaskList.configure({
        HTMLAttributes: {
            class: "not-prose pl-2",
        },
    }),
    TaskItem.configure({
        HTMLAttributes: {
            class: "flex items-start my-4",
        },
        nested: true,
    }),
    Table.configure({
        HTMLAttributes: {
            class: "border-collapse table-auto w-full",
        },
        resizable: true,
    }),
    TableRow,
    TableHeader.configure({
        HTMLAttributes: {
            class: "border border-muted bg-muted/50 font-bold p-2 text-left",
        },
    }),
    TableCell.configure({
        HTMLAttributes: {
            class: "border border-muted p-2",
        },
    }),
    CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
            class: "rounded-md bg-muted p-5 font-mono text-sm",
        },
    }),
    HorizontalRule.configure({
        HTMLAttributes: {
            class: "my-4 border-t border-muted",
        },
    }),
    Youtube.configure({
        HTMLAttributes: {
            class: "w-full aspect-video rounded-lg",
        },
    }),
];

