'use client';

export const ContactSection = () => {
    return (
        <section id="contact" className="py-16 md:py-24 bg-[#FCA311] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 to-[#FCA311] opacity-50"></div>
            <div className="container mx-auto px-6 lg:px-12 text-center relative z-10 text-slate-900">
                <span className="font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3 md:mb-4 block">Take The Next Step</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight leading-tight">
                    Let’s Build Something <br className="hidden md:block"/>Great Together
                </h2>
                <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
                    Looking for a reliable infrastructure partner? We’re here to help bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-10 py-5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all text-sm md:text-lg shadow-xl w-full sm:w-auto uppercase tracking-widest">
                        Contact Us
                    </button>
                    <button className="px-10 py-5 bg-transparent border-4 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all text-sm md:text-lg w-full sm:w-auto uppercase tracking-widest">
                        Request a Quote
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
