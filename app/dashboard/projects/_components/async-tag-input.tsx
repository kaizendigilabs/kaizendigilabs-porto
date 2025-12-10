'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AsyncTagInputProps {
  initialTags?: string[];
  onChange: (tags: string[]) => void;
  fetchUrl: string;
  placeholder?: string;
  allowCreate?: boolean;
  inputName?: string; // For hidden input
  error?: string;
}

export function AsyncTagInput({ 
  initialTags = [], 
  onChange, 
  fetchUrl, 
  placeholder = "Add tag...", 
  allowCreate = true,
  inputName,
  error 
}: AsyncTagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Fetch unique tags from DB
  const { data: suggestions, isLoading } = useSWR<string[]>(fetchUrl, fetcher);

  const filteredSuggestions = useMemo(() => {
    if (!inputValue || !suggestions) return [];
    return suggestions.filter(
      (tag) =>
        tag.toLowerCase().includes(inputValue.toLowerCase()) &&
        !tags.includes(tag)
    );
  }, [inputValue, suggestions, tags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    if (tags.includes(trimmedTag)) {
        setInputValue('');
        setIsOpen(false);
        return;
    }

    // Validation for "search only" mode
    if (!allowCreate) {
        // If not allowing create, we must check if it exists in suggestions
        // But what if suggestions list is huge and not fully loaded? 
        // For now, assuming suggestions covers the searchable set.
        // Or strictly check against filtered suggestions? 
        // Better: Check if the tag exists in the full suggestion list (if loaded) or filtered list.
        const exists = suggestions?.some(s => s.toLowerCase() === trimmedTag.toLowerCase());
        if (!exists) {
            toast.error(`"${trimmedTag}" is not a valid option.`);
            return;
        }
    }

    const newTags = [...tags, trimmedTag];
    setTags(newTags);
    onChange(newTags);
    setInputValue('');
    setIsOpen(false);
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="px-3 py-1 text-sm flex items-center gap-1 cursor-pointer hover:bg-zinc-200 transition-colors"
            onClick={() => {
                removeTag(tag);
                setInputValue(tag);
                setIsOpen(true);
                const input = document.querySelector('input[name="' + (inputName || 'async-tag-input') + '-search"]');
                if (input instanceof HTMLInputElement) {
                   input.focus();
                }
            }}
            title="Click to edit"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="hover:bg-zinc-300 rounded-full p-0.5 transition-colors ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="relative">
        <Input
            name={(inputName || 'async-tag-input') + '-search'}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow click
            placeholder={placeholder}
            className={cn(error && "border-red-500")}
          />

        {/* Suggestions Dropdown */}
        {isOpen && inputValue && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {isLoading ? (
              <div className="p-2 text-center text-zinc-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              </div>
            ) : filteredSuggestions.length > 0 ? (
              <ul className="py-1">
                {filteredSuggestions.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-2 text-sm hover:bg-zinc-100 cursor-pointer text-zinc-700"
                    onClick={() => addTag(tag)}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : (
                <div className="px-3 py-2 text-sm text-zinc-500 italic">
                  {allowCreate ? 'Press Enter to create new.' : 'No matches found.'}
                </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      
      {/* Hidden input for form submission */}
      {inputName && (
          <input type="hidden" name={inputName} value={tags.join(',')} />
      )}
    </div>
  );
}
