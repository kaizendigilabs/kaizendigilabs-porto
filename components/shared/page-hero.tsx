import { cn } from '@/lib/utils';

interface PageHeroProps {
    title: string;
    description?: string;
    kanji?: string;
    className?: string;
}

export function PageHero({ title, description, kanji, className }: PageHeroProps) {
    return (
        <section className={cn("w-full grid grid-cols-1 lg:grid-cols-2 min-h-[50vh] lg:min-h-[70vh]", className)}>
            {/* LEFT: DARK (Title) */}
            <div className="relative bg-zinc-950 text-zinc-50 p-8 pt-32 lg:p-24 flex flex-col justify-center overflow-hidden">
                {/* DECORATIVE KANJI */}
                {kanji && (
                    <div className="absolute top-25 right-25 p-8 lg:p-12 pointer-events-none select-none opacity-20">
                        <span className="font-body font-bold text-8xl lg:text-9xl leading-none text-zinc-600">
                            {kanji}
                        </span>
                    </div>
                )}

                <div className="relative z-10">
                    <h1 className="font-heading text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9]">
                        {title}
                    </h1>
                </div>
            </div>

            {/* RIGHT: LIGHT (Description) */}
            <div className="bg-zinc-50 text-zinc-950 p-8 lg:p-24 flex flex-col justify-center">
                <div className="max-w-xl">
                    {/* Red Accent Line */}
                    <div className="w-12 h-1 bg-brand mb-8 lg:mb-12" />

                    {description && (
                        <p className="font-body text-lg lg:text-2xl text-zinc-600 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
