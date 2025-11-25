"use client";

import { EditorRoot, EditorContent, EditorCommand, EditorCommandItem, EditorCommandEmpty, EditorBubble, EditorBubbleItem } from "novel";
import { useState } from "react";
import { defaultExtensions } from "./editor-extensions";
import { NodeSelector } from "./editor/selectors/node-selector";
import { LinkSelector } from "./editor/selectors/link-selector";
import { ColorSelector } from "./editor/selectors/color-selector";
import { TextButtons } from "./editor/selectors/text-buttons";
import { slashCommand, suggestionItems } from "./editor/slash-command";


interface EditorProps {
    initialValue?: any;
    onChange: (value: any) => void;
}

export default function ArticleEditor({ initialValue, onChange }: EditorProps) {
    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);

    const extensions = [...defaultExtensions, slashCommand];

    return (
        <div className="relative w-full">
            <EditorRoot>
                <EditorContent
                    extensions={extensions}
                    initialContent={initialValue}
                    onUpdate={({ editor }: any) => {
                        const json = editor.getJSON();
                        onChange(json);
                    }}
                    editorProps={{
                        attributes: {
                            class: "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full min-h-[500px]",
                        },
                    }}
                    className="rounded-md border bg-background p-8"
                >
                    {/* Slash Command Menu */}
                    <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                        <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
                        {suggestionItems.map((item: any) => (
                            <EditorCommandItem
                                value={item.title}
                                onCommand={(val: any) => item.command?.(val)}
                                className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                                key={item.title}
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                            </EditorCommandItem>
                        ))}
                    </EditorCommand>

                    {/* Bubble Menu - appears when text is selected */}
                    <EditorBubble
                        tippyOptions={{
                            placement: "top",
                        }}
                        className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
                    >
                        <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                        <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                        <TextButtons />
                        <ColorSelector open={openColor} onOpenChange={setOpenColor} />
                    </EditorBubble>
                </EditorContent>
            </EditorRoot>
        </div>
    );
}
