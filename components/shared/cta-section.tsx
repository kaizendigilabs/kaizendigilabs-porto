import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <div className="w-full bg-zinc-50 py-12">
            <div className="mx-auto max-w-7xl px-8 py-16 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 text-center md:text-left">
                    Ready to transform
                    <br />
                    your digital presence?
                </h2>

                <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase bg-zinc-950 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                    Start Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div >
    );
}