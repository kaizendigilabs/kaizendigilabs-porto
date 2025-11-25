import { Command, renderItems, createSuggestionItems } from "novel";
import {
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    MessageSquarePlus,
    Text,
    TextQuote,
    Code,
    CheckSquare,
    Table,
    Minus,
    Youtube,
    Image,
    Twitter,
} from "lucide-react";

export const suggestionItems = createSuggestionItems([
    {
        title: "Text",
        description: "Just start typing with plain text.",
        searchTerms: ["p", "paragraph"],
        icon: <Text size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode("paragraph", "paragraph")
                .run();
        },
    },
    {
        title: "Heading 1",
        description: "Big section heading.",
        searchTerms: ["title", "big", "large", "h1"],
        icon: <Heading1 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 1 })
                .run();
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading.",
        searchTerms: ["subtitle", "medium", "h2"],
        icon: <Heading2 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 2 })
                .run();
        },
    },
    {
        title: "Heading 3",
        description: "Small section heading.",
        searchTerms: ["subtitle", "small", "h3"],
        icon: <Heading3 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 3 })
                .run();
        },
    },
    {
        title: "Bullet List",
        description: "Create a simple bullet list.",
        searchTerms: ["unordered", "point", "ul"],
        icon: <List size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
    {
        title: "Numbered List",
        description: "Create a list with numbering.",
        searchTerms: ["ordered", "ol"],
        icon: <ListOrdered size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
    {
        title: "To-do List",
        description: "Track tasks with a to-do list.",
        searchTerms: ["todo", "task", "list", "check", "checkbox"],
        icon: <CheckSquare size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
    },
    {
        title: "Quote",
        description: "Capture a quote.",
        searchTerms: ["blockquote"],
        icon: <TextQuote size={18} />,
        command: ({ editor, range }) =>
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode("paragraph", "paragraph")
                .toggleBlockquote()
                .run(),
    },
    {
        title: "Code",
        description: "Capture a code snippet.",
        searchTerms: ["codeblock", "pre"],
        icon: <Code size={18} />,
        command: ({ editor, range }) =>
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
        title: "Table",
        description: "Insert a table.",
        searchTerms: ["table", "grid"],
        icon: <Table size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run();
        },
    },
    {
        title: "Divider",
        description: "Visually divide blocks.",
        searchTerms: ["horizontal rule", "hr", "line", "separator"],
        icon: <Minus size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
    },
    {
        title: "Image",
        description: "Upload an image from your computer.",
        searchTerms: ["photo", "picture", "media", "img"],
        icon: <Image size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).run();
            // Image upload will be handled by the image extension
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
                if (input.files?.length) {
                    const file = input.files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const url = e.target?.result as string;
                        editor.chain().focus().setImage({ src: url }).run();
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        },
    },
    {
        title: "YouTube",
        description: "Embed a YouTube video.",
        searchTerms: ["video", "youtube", "embed"],
        icon: <Youtube size={18} />,
        command: ({ editor, range }) => {
            const url = prompt("Enter YouTube URL");
            if (url) {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setYoutubeVideo({ src: url })
                    .run();
            }
        },
    },
    {
        title: "Twitter",
        description: "Embed a tweet.",
        searchTerms: ["twitter", "x", "tweet", "embed"],
        icon: <Twitter size={18} />,
        command: ({ editor, range }) => {
            const url = prompt("Enter Tweet URL");
            if (url) {
                editor.chain().focus().deleteRange(range).setTweet({ src: url }).run();
            }
        },
    },
]);

export const slashCommand = Command.configure({
    suggestion: {
        items: () => suggestionItems,
        render: renderItems,
    },
});
