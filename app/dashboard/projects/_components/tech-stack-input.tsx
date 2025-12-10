'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TechStackInputProps {
  initialStacks?: string[];
  onChange: (stacks: string[]) => void;
  error?: string;
}

export function TechStackInput({ initialStacks = [], onChange, error }: TechStackInputProps) {
  const [stacks, setStacks] = useState<string[]>(initialStacks);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Fetch unique stacks from DB
  const { data: suggestions, isLoading } = useSWR<string[]>('/api/suggestions/tech-stack', fetcher);

  const filteredSuggestions = useMemo(() => {
    if (!inputValue || !suggestions) return [];
    return suggestions.filter(
      (tech) =>
        tech.toLowerCase().includes(inputValue.toLowerCase()) &&
        !stacks.includes(tech)
    );
  }, [inputValue, suggestions, stacks]);

  const addStack = (tech: string) => {
    if (tech && !stacks.includes(tech)) {
      const newStacks = [...stacks, tech];
      setStacks(newStacks);
      onChange(newStacks);
      setInputValue('');
      setIsOpen(false);
    }
  };

  const removeStack = (techToRemove: string) => {
    const newStacks = stacks.filter((tech) => tech !== techToRemove);
    setStacks(newStacks);
    onChange(newStacks);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addStack(inputValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {stacks.map((tech) => (
          <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1">
            {tech}
            <button
              type="button"
              onClick={() => removeStack(tech)}
              className="hover:bg-zinc-200 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      <div className="relative">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow click
            placeholder="Add tech stack (e.g. React, Next.js)"
            className={cn(error && "border-red-500")}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => addStack(inputValue)}
            disabled={!inputValue}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && inputValue && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {isLoading ? (
              <div className="p-2 text-center text-zinc-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              </div>
            ) : filteredSuggestions.length > 0 ? (
              <ul className="py-1">
                {filteredSuggestions.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-2 text-sm hover:bg-zinc-100 cursor-pointer text-zinc-700"
                    onClick={() => addStack(tech)}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
                <div className="px-3 py-2 text-sm text-zinc-400 italic">
                  No similar stacks found. Press Enter to add.
                </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      
      {/* Hidden input for form submission if needed, though we use onChange for parent state */}
      <input type="hidden" name="tech_stack" value={stacks.join(',')} />
    </div>
  );
}
