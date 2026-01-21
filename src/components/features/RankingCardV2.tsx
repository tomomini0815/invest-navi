
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Star, ExternalLink, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { FxStartGuide } from "@/components/features/FxStartGuide";
import { ComparisonRow } from "@/components/features/ComparisonTable";

interface RankingCardV2Props {
    rank: number;
    name: string;
    rating: number;
    points: string[];
    specs: {
        label: string;
        value: string;
        isHighlight?: boolean;
    }[];
    campaignText?: string;
    badgeText?: string;
    affiliateUrl: string;
    detailUrl: string;
    detailedSpecs?: ComparisonRow; // Optional to avoid initial break, but logic depends on it
}

const RankingCardV2 = ({
    rank,
    name,
    rating,
    points,
    specs,
    campaignText,
    badgeText,
    affiliateUrl,
    detailUrl,
    detailedSpecs
}: RankingCardV2Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const isTop3 = rank <= 3;
    const cardBorder = isTop3 ? "border-orange-200" : "border-gray-200";

    return (
        <Card className={`overflow-hidden border-2 ${cardBorder} shadow-sm hover:shadow-md transition-shadow relative`}>
            {/* "Best For" Badge */}
            {badgeText && (
                <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-br-xl z-20 shadow-sm flex items-center gap-1">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    {badgeText}
                </div>
            )}

            <div className="flex flex-col md:flex-row mt-6 md:mt-0">
                {/* Left Side: Logo & Info */}
                <div className={`flex-1 p-3 sm:p-4 flex items-start gap-3 sm:gap-4 ${badgeText ? "pt-10 sm:pt-11" : "pt-4"}`}>
                    {/* Logo Placeholder - simplified style */}
                    <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-400 shrink-0 font-bold">
                        {detailedSpecs?.logoText || "LOGO"}
                    </div>

                    <div className="flex-1 mt-1 sm:mt-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap pr-8">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">{name}</h3>
                        </div>

                        {campaignText && (
                            <div className="text-[10px] sm:text-xs text-red-600 font-bold bg-red-50 border border-red-100 px-2 py-1 rounded inline-block mb-2">
                                {campaignText}
                            </div>
                        )}

                        <ul className="space-y-1">
                            {points.map((point, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-600">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span className="font-medium leading-snug">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side: Specs & CTA */}
                <div className="bg-gray-50 p-3 sm:p-4 md:w-[260px] border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-between gap-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        {specs.slice(0, 4).map((spec, i) => (
                            <div key={i} className="bg-white p-1.5 rounded border border-gray-200 text-center">
                                <div className="text-gray-400 text-[10px]">{spec.label}</div>
                                <div className={`font-bold ${spec.isHighlight ? "text-red-500" : "text-gray-700"}`}>{spec.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Button
                            onClick={() => window.open(affiliateUrl, '_blank')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-sm shadow-sm transition-colors"
                        >
                            公式サイト <ExternalLink className="ml-1 w-3 h-3" />
                        </Button>
                        <div className="text-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-full text-sm font-bold text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1 h-10 border border-gray-200"
                            >
                                {isOpen ? "閉じる" : "詳細を見る"}
                                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordion Detail Section */}
            {isOpen && detailedSpecs && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-6 animate-in slide-in-from-top-2 duration-300">
                    {/* 1. Features Description */}
                    <div className="mb-6">
                        <h4 className="font-bold text-gray-800 mb-2 text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-orange-400 rounded-full"></span>
                            {name}の特徴
                        </h4>
                        <div className="bg-white p-4 rounded border border-gray-200">
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                {detailedSpecs.features}
                            </p>
                            {/* Good Points List */}
                            {detailedSpecs.goodPoints && detailedSpecs.goodPoints.length > 0 && (
                                <ul className="space-y-2 mt-2 pt-2 border-t border-gray-100">
                                    {detailedSpecs.goodPoints.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-bold">
                                            <div className="min-w-[18px] h-[18px] rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mt-0.5">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* 2. Detailed Specs Table */}
                    <div className="mb-8">
                        <h4 className="font-bold text-gray-800 mb-2 text-sm flex items-center gap-2">
                            <span className="w-1 h-4 bg-teal-400 rounded-full"></span>
                            スプレッド・スペック詳細
                        </h4>
                        <div className="bg-white rounded border border-gray-200 overflow-hidden text-sm">
                            <table className="w-full text-center">
                                <thead className="bg-gray-50 text-gray-500 text-xs">
                                    <tr>
                                        <th className="py-2 border-r border-gray-100 font-normal">米ドル/円</th>
                                        <th className="py-2 border-r border-gray-100 font-normal">ユーロ/円</th>
                                        <th className="py-2 border-r border-gray-100 font-normal">豪ドル/円</th>
                                        <th className="py-2 font-normal">ポンド/円</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 font-bold">
                                    <tr className="border-b border-gray-100">
                                        <td className="py-2 border-r border-gray-100">{detailedSpecs.spreadUsdJpyText}</td>
                                        <td className="py-2 border-r border-gray-100">{detailedSpecs.spreadEurJpyText}</td>
                                        <td className="py-2 border-r border-gray-100">{detailedSpecs.spreadAudJpyText}</td>
                                        <td className="py-2">{detailedSpecs.spreadGbpJpyText}</td>
                                    </tr>
                                </tbody>
                                <thead className="bg-gray-50 text-gray-500 text-xs">
                                    <tr>
                                        <th className="py-2 border-r border-gray-100 font-normal">ユーロ/ドル</th>
                                        <th className="py-2 border-r border-gray-100 font-normal">取引単位</th>
                                        <th className="py-2 border-r border-gray-100 font-normal">デモ取引</th>
                                        <th className="py-2 font-normal">キャッシュバック</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 font-bold">
                                    <tr>
                                        <td className="py-2 border-r border-gray-100">{detailedSpecs.spreadEurUsdText}</td>
                                        <td className="py-2 border-r border-gray-100">{detailedSpecs.transactionUnitText}</td>
                                        <td className="py-2 border-r border-gray-100">{detailedSpecs.demoPeriod}</td>
                                        <td className="py-2 text-red-500">{detailedSpecs.cashbackText}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 3. FX Start Guide */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <FxStartGuide
                            companyName={name.replace(/（.*?）/g, '')}
                            affiliateUrl={affiliateUrl}
                            steps={detailedSpecs.startGuideSteps}
                            guideTitle={detailedSpecs.guideTitle}
                            guideDescription={detailedSpecs.guideDescription}
                        />
                    </div>

                    <div className="text-center mt-4">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center mx-auto gap-1"
                        >
                            <ChevronUp className="w-4 h-4" /> 閉じる
                        </button>
                    </div>
                </div>
            )}
        </Card>
    );
};


export default RankingCardV2;
