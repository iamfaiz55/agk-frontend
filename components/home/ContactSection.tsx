
'use client';

import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

export const ContactSection = ({ project }: any) => {
    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-900" />
            <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37] opacity-10 blur-3xl rotate-12 -translate-y-1/2" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-8 lg:p-20 shadow-2xl flex flex-col lg:flex-row gap-8 md:gap-16 items-center border border-gray-100">
                    <div className="flex-1 w-full">
                        <span className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs mb-3 md:mb-4 block">Next Step</span>
                        <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-8 tracking-tighter">
                            Start Your <br />Journey <span className="text-[#D4AF37]">Today</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-500 font-medium mb-6 md:mb-12">
                            Our consultants are ready to help you find the perfect space. Fill out the form and we'll connect with you shortly.
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6">
                            <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                                <span className="block text-xl md:text-2xl mb-1">📞</span>
                                <span className="font-bold text-sm md:text-base text-gray-900">+91 70205 15701</span>
                            </div>
                            <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                                <span className="block text-xl md:text-2xl mb-1">✉️</span>
                                <span className="font-bold text-sm md:text-base text-gray-900">agkinfrastructures@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-lg bg-gray-50 rounded-xl md:rounded-[2.5rem] p-4 md:p-8 lg:p-12 border border-gray-100">
                        <LeadCaptureForm buildingId={project?.id} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
