import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, XCircle, Star, ArrowLeft, CircleCheck, CircleX, Info, TrendingUp, Shield, Zap, Award } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Company } from "@/components/features/SurveyDiagnostic";

interface CryptoDetailTemplateProps {
    company: Company;
}

const CryptoDetailTemplate = ({ company }: CryptoDetailTemplateProps) => {
    const { name, rating, points, specs, campaignText, badgeText, affiliateUrl, accordionData } = company;

    // Extract specs for easier access
    const detailedSpecs = accordionData?.specTable || { row1: [], row2: [] };
    const goodPoints = accordionData?.goodPoints || points;
    const featuresText = accordionData?.features || "";
    const startGuide = accordionData?.startGuide;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Helmet>
                <title>{`${name}の詳細・評判 | 暗号資産取引所比較 | 投資総合ナビ`}</title>
                <meta name="description" content={`${name}の詳細情報。手数料、取扱通貨数、アプリの使いやすさなどを徹底解説。${featuresText.substring(0, 50)}...`} />
            </Helmet>

            <Header />

            <main className="flex-1 pb-20">
                {/* Breadcrumb */}
                <div className="bg-white border-b py-3">
                    <div className="container mx-auto px-4">
                        <Link
                            to="/crypto-comparison"
                            className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            暗号資産取引所比較に戻る
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-r from-[#1e40af] to-[#10b981] text-white py-12 md:py-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] opacity-10"></div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        {badgeText && (
                            <Badge className="bg-yellow-400 text-emerald-900 font-bold mb-4 hover:bg-yellow-500 px-3 py-1 text-sm md:text-base">
                                {badgeText}
                            </Badge>
                        )}
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                            {name}
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100 font-medium mb-8">
                            {campaignText || "総合力No.1の暗号資産取引所"}
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
                            <div className="flex flex-col items-center">
                                <span className="text-sm text-emerald-200 mb-1">総合評価</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-4xl font-bold text-yellow-400">{rating}</span>
                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`w-5 h-5 ${i < (rating || 0) ? "fill-current" : "text-gray-400"}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/20"></div>
                            {/* Highlight Specs from Data */}
                            {specs.slice(0, 2).map((spec, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <span className="text-sm text-emerald-200 mb-1">{spec.label}</span>
                                    <span className="text-xl md:text-2xl font-bold text-white">{spec.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm sm:text-base md:text-lg whitespace-nowrap px-8 py-6 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)] animate-pulse"
                                onClick={() => window.open(affiliateUrl, '_blank')}>
                                公式サイトを見る <ExternalLink className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Text */}
                <section className="py-16 container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        {name}の特徴
                    </h2>
                    <Card className="border-emerald-100 shadow-md">
                        <CardContent className="p-8">
                            <div className="text-lg text-gray-700 leading-relaxed font-medium">
                                {featuresText}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Specs Table */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <Info className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-2xl font-bold text-gray-800">スペック詳細</h2>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <table className="w-full text-center">
                                <thead className="bg-emerald-50 text-emerald-800">
                                    <tr>
                                        {detailedSpecs.row1.map((cell, i) => (
                                            <th key={i} className="py-4 font-semibold border-b border-gray-100">{cell.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800">
                                    <tr>
                                        {detailedSpecs.row1.map((cell, i) => (
                                            <td key={i} className={`py-4 border-r border-gray-100 last:border-r-0 font-bold ${cell.className || ""}`}>
                                                {cell.value}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                                <thead className="bg-emerald-50 text-emerald-800">
                                    <tr>
                                        {detailedSpecs.row2.map((cell, i) => (
                                            <th key={i} className="py-4 font-semibold border-b border-gray-100">{cell.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800">
                                    <tr>
                                        {detailedSpecs.row2.map((cell, i) => (
                                            <td key={i} className={`py-4 border-r border-gray-100 last:border-r-0 font-bold ${cell.className || ""}`}>
                                                {cell.value}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Good Points (Merits) */}
                <section className="py-16 container mx-auto px-4 max-w-5xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
                        <CheckCircle className="text-emerald-500" /> おすすめポイント
                    </h3>
                    <div className="grid md:grid-cols-1 gap-4">
                        {goodPoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
                                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-lg text-gray-800 font-bold">{point}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Start Guide */}
                {startGuide && (
                    <section className="py-16 bg-emerald-50">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{startGuide.title}</h2>
                                <p className="text-gray-600">{startGuide.description}</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {startGuide.steps.map((step, idx) => (
                                    <Card key={idx} className="border-none shadow-lg relative overflow-visible">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-emerald-900 font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                                            {idx + 1}
                                        </div>
                                        <CardContent className="pt-8 pb-6 px-4 text-center">
                                            <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed text-left">
                                                {step.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 px-12 text-sm sm:text-base md:text-lg whitespace-nowrap rounded-full shadow-lg transition-transform hover:scale-105"
                                    onClick={() => window.open(affiliateUrl, '_blank')}>
                                    口座開設を申し込む <ExternalLink className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </section>
                )}

            </main>
            <Footer />
        </div>
    );
};

export default CryptoDetailTemplate;
