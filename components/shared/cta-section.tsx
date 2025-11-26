import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function CTASection() {
    return (
        <div className="w-full bg-zinc-50 py-12">
            <div className="mx-auto max-w-7xl px-8 py-16 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 text-center md:text-left">
                    Ready to transform
                    <br />
                    your digital presence?
                </h2>


                <Button
                    asChild
                    className="group inline-flex items-center gap-2 p-6 text-sm font-mono tracking-widest uppercase"
                >
                    <Link href="/contact">
                        LET&apos;S TALK
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </div >
    );
}