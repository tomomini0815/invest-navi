import { Check } from "lucide-react";

const CryptoHeroSection = () => {
    return (
        <section className="relative overflow-hidden pt-10 pb-16 md:pt-20 md:pb-28 bg-gradient-to-r from-[#1e40af] to-[#10b981]">

            <div className="relative z-10 container mx-auto px-4 text-center">

                {/* Factual Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium mb-3 md:mb-4">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-white"></span>
                    2026年1月時点の情報
                </div>

                {/* Factual Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3 tracking-wider flex items-end justify-center gap-2 whitespace-nowrap">
                    <span
                        className="text-white text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-xl"
                    >
                        暗号資産取引所
                    </span>
                    徹底比較
                </h1>

                {/* Factual Description */}
                <p className="max-w-4xl mx-auto text-[10px] sm:text-sm text-white/90 mb-4 md:mb-6 leading-relaxed">
                    主要取引所の手数料・取扱銘柄数・アプリの使いやすさ等を一覧で比較。<br />
                    各社の公式サイトに基づくデータを元に比較しています。
                </p>

                {/* Factual Tags */}
                <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                    {["手数料比較", "取扱銘柄数", "アプリ評価"].map((text) => (
                        <span key={text} className="flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-white text-teal-800 text-[10px] sm:text-xs font-bold shadow-sm">
                            <Check className="w-3.5 h-3.5 md:w-5 md:h-5 text-green-500" strokeWidth={4} />
                            {text}
                        </span>
                    ))}
                </div>

            </div>

            {/* Wave Bottom - Same as Top Page */}
            <div className="absolute -bottom-1 left-0 right-0 w-full" style={{ height: 'auto' }}>
                <svg
                    className="w-full text-background block"
                    viewBox="0 0 1440 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path d="M0 74L60 65.3C120 56.7 240 39.3 360 32.7C480 26 600 30 720 36.7C840 43.3 960 52.7 1080 52.7C1200 52.7 1320 43.3 1380 38.7L1440 34V74H1380C1320 74 1200 74 1080 74C960 74 840 74 720 74C600 74 480 74 360 74C240 74 120 74 60 74H0Z" fill="currentColor" />
                </svg>
            </div>
        </section>
    );
};

export const CryptoHeroSectionExport = CryptoHeroSection;
export { CryptoHeroSection };
