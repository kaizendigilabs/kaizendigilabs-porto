import { FileText } from 'lucide-react';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="mb-6 text-zinc-300">
                {icon || <FileText className="w-16 h-16" />}
            </div>
            <h3 className="font-heading text-2xl font-bold text-zinc-900 mb-3">
                {title}
            </h3>
            <p className="text-zinc-600 max-w-md leading-relaxed">
                {description}
            </p>
        </div>
    );
}
