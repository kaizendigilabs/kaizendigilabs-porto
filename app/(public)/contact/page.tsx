'use client';

import { useActionState } from 'react';
import { submitInquiry, InquiryState } from './actions';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialState: InquiryState = {};

export default function ContactPage() {
    const [state, action, isPending] = useActionState(submitInquiry, initialState);

    return (
        <main className="relative grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen font-sans pt-(--header-h)">
            {/* LEFT PANEL - DARK */}
            <div className="w-full bg-zinc-950 text-zinc-50 flex flex-col justify-center px-6 sm:px-8 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-32 py-12 lg:py-8 relative">
                <div className="relative z-10">
                    <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tighter uppercase lg:text-end mb-6">
                        Start
                        <br />
                        A Project
                    </h1>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-400 font-medium leading-tight lg:text-end max-w-xl ml-auto">
                        Ready to transform your digital presence? Tell us about your project and let's create something extraordinary together.
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL - LIGHT (FORM) */}
            <div className="w-full bg-zinc-50 text-zinc-950 flex flex-col justify-center px-6 sm:px-8 lg:pl-16 lg:pr-12 xl:pl-32 xl:pr-16 py-12 relative">
                <div className="relative z-10 w-full max-w-xl">
                    {state.success ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-green-900 mb-4">Message Sent!</h3>
                            <p className="text-green-700 mb-8 max-w-md mx-auto">
                                Thank you for reaching out. We've received your inquiry and will get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-sm font-bold text-green-700 hover:text-green-900 underline underline-offset-4"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form action={action} className="space-y-6">
                            {state.error && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                                    {state.error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className={cn(
                                            "capitalize w-full px-4 py-3 bg-white border transition-all outline-none focus:ring-2 focus:ring-zinc-900/10",
                                            state.fieldErrors?.name ? "border-red-300 focus:border-red-500" : "border-zinc-200 focus:border-zinc-900"
                                        )}
                                    />
                                    {state.fieldErrors?.name && (
                                        <p className="text-xs text-red-500">{state.fieldErrors.name[0]}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="john@company.com"
                                        className={cn(
                                            "w-full px-4 py-3 bg-white border transition-all outline-none focus:ring-2 focus:ring-zinc-900/10",
                                            state.fieldErrors?.email ? "border-red-300 focus:border-red-500" : "border-zinc-200 focus:border-zinc-900"
                                        )}
                                    />
                                    {state.fieldErrors?.email && (
                                        <p className="text-xs text-red-500">{state.fieldErrors.email[0]}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Phone (Optional)
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full px-4 py-3 bg-white border border-zinc-200 focus:border-zinc-900 transition-all outline-none focus:ring-2 focus:ring-zinc-900/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        Company (Optional)
                                    </label>
                                    <input
                                        id="company"
                                        name="company"
                                        type="text"
                                        placeholder="Your Company Ltd."
                                        className="w-full px-4 py-3 bg-white border border-zinc-200 focus:border-zinc-900 transition-all outline-none focus:ring-2 focus:ring-zinc-900/10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder="Project Inquiry: New Website Redesign"
                                    className={cn(
                                        "capitalize w-full px-4 py-3 bg-white border transition-all outline-none focus:ring-2 focus:ring-zinc-900/10",
                                        state.fieldErrors?.subject ? "border-red-300 focus:border-red-500" : "border-zinc-200 focus:border-zinc-900"
                                    )}
                                />
                                {state.fieldErrors?.subject && (
                                    <p className="text-xs text-red-500">{state.fieldErrors.subject[0]}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                    Project Details <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Tell us about your project, goals, and timeline..."
                                    className={cn(
                                        "w-full h-42 px-4 py-3 bg-white border transition-all outline-none focus:ring-2 focus:ring-zinc-900/10 resize-none",
                                        state.fieldErrors?.message ? "border-red-300 focus:border-red-500" : "border-zinc-200 focus:border-zinc-900"
                                    )}
                                />
                                {state.fieldErrors?.message && (
                                    <p className="text-xs text-red-500">{state.fieldErrors.message[0]}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full px-8 py-4 bg-zinc-900 text-white font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Inquiry
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* CENTER KANJI OVERLAY */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 mix-blend-difference opacity-20">
                <span className="[writing-mode:vertical-rl] font-body font-bold text-[12rem] sm:text-[15rem] lg:text-[20rem] xl:text-[25rem] leading-none text-zinc-600">
                    連絡
                </span>
            </div>
        </main>
    );
}
