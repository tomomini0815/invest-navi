import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TickerTape from "@/components/features/TickerTape";
import SurveyDiagnostic, { Company } from "@/components/features/SurveyDiagnostic";

export interface ComparisonPageTemplateProps<T extends Company> {
    metaTitle: string;
    metaDescription?: string;
    heroSection: React.ReactNode;
    rankingList: T[];
    renderRankingCard: (item: T, index: number) => React.ReactNode;
    renderComparisonTable: () => React.ReactNode;
    disclaimerText?: React.ReactNode;
    categoryName?: string; // e.g. "FX口座"
    surveyType?: "fx" | "securities" | "crypto";
}

export const ComparisonPageTemplate = <T extends Company>({
    metaTitle,
    metaDescription,
    heroSection,
    rankingList,
    renderRankingCard,
    renderComparisonTable,
    disclaimerText,
    categoryName = "口座",
    surveyType = "fx" // Default to fx to support existing pages implicitly if not specified
}: ComparisonPageTemplateProps<T>) => {
    const [filteredList, setFilteredList] = useState<T[]>(rankingList);

    const handleSurveySearch = (results: Company[]) => {
        // Cast back to T[] assuming the survey doesn't transform objects, just filters
        setFilteredList(results as T[]);
        const element = document.getElementById("ranking-list-start");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const hasSearched = filteredList.length !== rankingList.length;

    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>{metaTitle}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
            </Helmet>

            <Header />
            <TickerTape />

            {heroSection}

            <main className="flex-grow">
                {/* Survey Diagnosis Section */}
                {/* Survey Diagnosis Section */}
                <section className="py-12 -mt-10 mb-12 relative z-10 px-4">
                    <SurveyDiagnostic data={rankingList} onSearch={handleSurveySearch} type={surveyType} />
                </section>

                {/* Detailed Ranking Section */}
                <section className="container mx-auto px-4 max-w-5xl" id="ranking-list-start">

                    {/* Header Switching Logic */}
                    {!hasSearched ? (
                        /* Default Header */
                        <div className="text-center mb-8 sm:mb-12 overflow-hidden">
                            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 text-gray-800 whitespace-nowrap">
                                <span className="text-orange-500">厳選</span> <span>{categoryName}一覧</span>
                            </h2>
                            <p className="text-gray-500">
                                初心者でも安心して使える、失敗しない{categoryName}をプロが厳選しました。
                            </p>
                        </div>
                    ) : (
                        /* Search Results Header */
                        <div className="mb-12 mt-4 pt-10 border-t border-gray-100">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center gap-2 bg-orange-50 text-orange-700 font-bold px-4 py-1.5 rounded-full text-sm mb-4 border border-orange-100">
                                    <span className="flex h-2.5 w-2.5 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                                    </span>
                                    診断結果
                                </div>

                                <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 leading-snug mb-3">
                                    <span className="inline-block relative z-10">
                                        あなたの条件に
                                    </span>
                                    <span className="text-orange-600 inline-block relative z-10 ml-2">
                                        マッチした{categoryName}
                                        <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-100 -z-10 rounded-sm"></span>
                                    </span>
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                                    設定された条件に基づき、プロが厳選したおすすめの{categoryName}を表示しています。
                                </p>
                            </div>
                        </div>
                    )}

                    {/* List of Companies */}
                    <div className="space-y-4 mb-12">
                        {filteredList.length > 0 ? (
                            filteredList.map((item, index) => renderRankingCard(item, index))
                        ) : (
                            <div className="text-center py-10 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-gray-500 font-bold">条件に一致する{categoryName}が見つかりませんでした。</p>
                                <button
                                    onClick={() => setFilteredList(rankingList)}
                                    className="mt-4 text-blue-600 underline text-sm"
                                >
                                    すべての{categoryName}を表示する
                                </button>
                            </div>
                        )}
                        <div className="text-right text-xs text-gray-400 mt-2">
                            ※情報は日々変動します。最新情報は各社公式サイトをご確認ください。
                        </div>
                    </div>

                    {renderComparisonTable()}

                    {disclaimerText}

                </section>
            </main>

            <Footer />
        </div>
    );
};
