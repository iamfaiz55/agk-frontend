
export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-6">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                    {/* Spinning Ring */}
                    <div className="absolute inset-0 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    {/* Inner Pulse */}
                    <div className="absolute inset-0 m-8 bg-[#D4AF37] rounded-full animate-pulse opacity-20"></div>
                </div>
                <div className="text-center">
                    <h2 className="text-[#D4AF37] font-medium uppercase tracking-[0.3em] text-sm animate-pulse">
                        Pearl Heights
                    </h2>
                    <p className="text-gray-400 text-xs mt-2 font-light tracking-wide">
                        Loading Experience...
                    </p>
                </div>
            </div>
        </div>
    );
}
