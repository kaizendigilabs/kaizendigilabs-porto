'use client';

import { cn, slugify } from '@/lib/utils';
import { OptimizedImage } from '@/components/shared/optimized-image';

interface TiptapNode {
    type: string;
    content?: TiptapNode[];
    text?: string;
    attrs?: Record<string, unknown>;
    marks?: { type: string; attrs?: Record<string, unknown> }[];
}

interface ArticleContentProps {
    content: TiptapNode | TiptapNode[] | unknown;
}

export function ArticleContent({ content }: ArticleContentProps) {
    let blocks: TiptapNode[] = [];

    // Handle different content structures
    if (Array.isArray(content)) {
        blocks = content;
    } else if (content && typeof content === 'object') {
        const node = content as TiptapNode;
        if (node.type === 'doc' && Array.isArray(node.content)) {
            blocks = node.content;
        } else if (node.content && Array.isArray(node.content)) {
            blocks = node.content;
        }
    }

    if (!blocks.length) return null;

    return (
        <article className="prose prose-lg prose-zinc max-w-none">
            {blocks.map((block, index) => (
                <BlockRenderer key={index} block={block} />
            ))}
        </article>
    );
}

function BlockRenderer({ block }: { block: TiptapNode }) {
    switch (block.type) {
        case 'heading':
            const level = (block.attrs?.level as number) || 2;
            const className = cn("font-heading font-bold text-zinc-900 mt-8 mb-4 scroll-mt-32",
                level === 1 ? "text-4xl" :
                    level === 2 ? "text-3xl" : "text-2xl"
            );

            // Extract text content for ID generation
            const textContent = block.content?.map(n => n.text).join('') || '';
            const id = slugify(textContent);

            if (level === 1) return <h1 id={id} className={className}><TextRenderer content={block.content} /></h1>;
            if (level === 2) return <h2 id={id} className={className}><TextRenderer content={block.content} /></h2>;
            if (level === 3) return <h3 id={id} className={className}><TextRenderer content={block.content} /></h3>;
            return <h4 id={id} className={className}><TextRenderer content={block.content} /></h4>;
        case 'paragraph':
            return (
                <p className="text-zinc-700 leading-relaxed mb-6">
                    <TextRenderer content={block.content} />
                </p>
            );
        case 'bulletList':
            return (
                <ul className="list-disc list-outside ml-6 mb-6 space-y-2">
                    {block.content?.map((item, i) => <BlockRenderer key={i} block={item} />)}
                </ul>
            );
        case 'orderedList':
            return (
                <ol className="list-decimal list-outside ml-6 mb-6 space-y-2">
                    {block.content?.map((item, i) => <BlockRenderer key={i} block={item} />)}
                </ol>
            );
        case 'listItem':
            return (
                <li className="text-zinc-700 pl-2">
                    {block.content?.map((item, i) => <BlockRenderer key={i} block={item} />)}
                </li>
            );
        case 'blockquote':
            return (
                <blockquote className="border-l-4 border-red-600 pl-6 py-2 my-8 bg-zinc-50 italic text-xl text-zinc-800 font-serif">
                    {block.content?.map((item, i) => <BlockRenderer key={i} block={item} />)}
                </blockquote>
            );
        case 'image':
            return (
                <figure className="my-12">
                    <div className="relative w-full aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                        <OptimizedImage
                            src={(block.attrs?.src as string) || ''}
                            alt={(block.attrs?.alt as string) || ''}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {(block.attrs?.title as string) && (
                        <figcaption className="text-sm text-zinc-500 text-center mt-3 italic">
                            {(block.attrs?.title as string)}
                        </figcaption>
                    )}
                </figure>
            );
        default:
            if (block.content) {
                return <>{block.content.map((item, i) => <BlockRenderer key={i} block={item} />)}</>;
            }
            return null;
    }
}

function TextRenderer({ content }: { content?: TiptapNode[] }) {
    if (!content) return null;
    return (
        <>
            {content.map((node, index) => {
                if (node.type === 'text') {
                    let text: React.ReactNode = node.text;
                    if (node.marks) {
                        node.marks.forEach(mark => {
                            if (mark.type === 'bold') text = <strong key={mark.type}>{text}</strong>;
                            if (mark.type === 'italic') text = <em key={mark.type}>{text}</em>;
                            if (mark.type === 'code') text = <code key={mark.type} className="bg-zinc-100 px-1 py-0.5 rounded text-sm font-mono text-red-600">{text}</code>;
                            if (mark.type === 'link') text = <a key={mark.type} href={mark.attrs?.href as string} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">{text}</a>;
                        });
                    }
                    return <span key={index}>{text}</span>;
                }
                return null;
            })}
        </>
    );
}
