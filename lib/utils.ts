import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

interface EditorNode {
  text?: string;
  content?: EditorNode[];
  [key: string]: unknown;
}

export function calculateReadTime(content: unknown): string {
  if (!content || typeof content !== 'object') return '1 min read';
  
  const root = content as EditorNode;
  if (!root.content) return '1 min read';

  let text = '';
  const traverse = (node: EditorNode) => {
    if (node.text) text += node.text + ' ';
    if (node.content && Array.isArray(node.content)) node.content.forEach(traverse);
  };

  traverse(root);
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
