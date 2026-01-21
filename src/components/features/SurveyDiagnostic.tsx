import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, UserCircle2, Wallet, Settings2, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Company {
    name: string;
    points: string[];
    specs: { label: string; value: string; isHighlight?: boolean }[];
    campaignText?: string;
    // ... add any other necessary fields for filtering if available
}

interface SurveyDiagnosticProps {
    data: Company[];
    onSearch: (filtered: Company[]) => void;
}

export const SurveyDiagnostic = ({ data, onSearch }: SurveyDiagnosticProps) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        experience: "",
        style: "",
        conditions: [] as string[],
    });

    const [filteredData, setFilteredData] = useState<Company[]>(data);

    // Filtering Logic
    useEffect(() => {
        let result = data;

        // 1. Experience Filter (Heuristic)
        if (answers.experience === "beginner") {
            // Filter for companies with "beginner" friendly keywords or top rankings
            result = result.filter(c =>
                c.points.some(p => p.includes("初心者") || p.includes("サポート") || p.includes("直感的")) ||
                c.specs.some(s => s.label === "最小取引単位" && (s.value === "1通貨" || s.value === "1,000通貨")) ||
                c.name.includes("DMM") // Explicitly include DMM for beginners due to high support quality
            );
        } else if (answers.experience === "expert") {
            result = result.filter(c =>
                c.points.some(p => p.includes("高機能") || p.includes("分析")) ||
                c.specs.some(s => s.label === "通貨ペア" && parseInt(s.value.replace(/[^0-9]/g, "")) >= 29) // Adjusted to >= 29 to include DMM (approx 29 pairs)
            );
        }

        // 2. Style Filter
        if (answers.style === "short") { // Scalping/Day
            result = result.filter(c => c.specs.some(s => s.label.includes("スプレッド") && parseFloat(s.value) <= 0.2));
        } else if (answers.style === "long") { // Swap
            result = result.filter(c => c.specs.some(s => s.label.includes("スワップ") && parseInt(s.value.replace("円", "")) >= 200));
        }

        // 3. Conditions Filter
        if (answers.conditions.length > 0) {
            result = result.filter(c => {
                return answers.conditions.every(cond => {
                    if (cond === "スプレッドが狭い") return c.specs.some(s => s.label.includes("スプレッド") && parseFloat(s.value) <= 0.2);
                    if (cond === "スワップが高い") return c.specs.some(s => s.label.includes("スワップ") && parseInt(s.value.replace("円", "")) >= 220);
                    // Allow DMM (10,000 units) to pass "Small Amount" if other criteria match, or keep it strict? User wants MORE DMM.
                    // Let's relax "Small Amount" slightly or explicit include DMM if user selected it?
                    // Actually, purely strict "Small Amount" (1000 or 1) implies DMM is excluded.
                    // To make it hit MORE, we can add a logic: if (cond === "少額" && c.name.includes("DMM")) return true; ? 
                    // That might be too aggressive if it's strictly 10k. 
                    // Let's assume "Small Amount" filter remains strict for now unless DMM changes their specs. 
                    // But we can check "Tool", "Support" etc.

                    if (cond === "少額から可能") return c.specs.some(s => s.label === "最小取引単位" && (s.value === "1通貨" || s.value === "100円" || s.value === "1,000通貨")); // Relaxed to 1000 for broader reach (DMM is 10k, so still excluded here unless we go to 10k)

                    if (cond === "ツールが使いやすい") return c.points.some(p => p.includes("ツール") || p.includes("アプリ") || p.includes("操作")) || c.name.includes("DMM"); // DMM has good tools
                    if (cond === "自動売買対応") return c.points.some(p => p.includes("自動売買") || c.name.includes("トライオート") || c.name.includes("松井"));
                    if (cond === "サポート充実") return c.points.some(p => p.includes("サポート") || p.includes("問い合わせ") || p.includes("安心")) || c.name.includes("DMM"); // DMM has 24h LINE support
                    return true;
                });
            });
        }

        // Ensure at least 1 result if possible, or handle 0
        if (result.length === 0) {
            // result = data.slice(0, 3); // Fallback if needed
        }

        setFilteredData(result);
    }, [answers, data]);

    const handleSelect = (key: string, value: any) => {
        setAnswers({ ...answers, [key]: value });
        if (key !== "conditions" && step < 3) {
            setTimeout(() => setStep(step + 1), 300);
        }
    };

    const toggleCondition = (condition: string) => {
        const current = answers.conditions;
        const next = current.includes(condition)
            ? current.filter((c) => c !== condition)
            : [...current, condition];
        setAnswers({ ...answers, conditions: next });
    };

    const handleSearchClick = () => {
        onSearch(filteredData.length > 0 ? filteredData : data);
    };

    return (
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white border-2 border-orange-100">
            {/* Header - ORANGE BACKGROUND */}
            <div className="p-4 text-white text-center bg-gradient-to-r from-orange-500 to-red-500">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-3 drop-shadow-md whitespace-nowrap">
                    <Search className="w-6 h-6" />
                    あなたの投資スタイルから診断
                </h2>
                <p className="text-orange-100 text-sm mt-1">3つの質問に答えるだけで、最適な口座が見つかります</p>
            </div>

            <div className="p-4 sm:p-6 bg-white">
                {/* Progress Bar - Adjusted for White Background */}
                <div className="flex items-center justify-center mb-6 gap-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all ${step >= s
                                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                                    : "bg-white text-gray-300 border-gray-200"
                                    }`}
                            >
                                {step > s ? <Check className="w-6 h-6" /> : s}
                            </div>
                            {s < 3 && <div className={`w-12 h-1 mx-2 rounded-full ${step > s ? "bg-orange-500" : "bg-gray-100"}`} />}
                        </div>
                    ))}
                </div>

                <div className="min-h-[200px] bg-slate-50 rounded-2xl p-4 sm:p-6 shadow-inner border border-slate-100">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">Q1. 投資経験はありますか？</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {[
                                        { label: "初めて", icon: UserCircle2, val: "beginner", desc: "これから始める" },
                                        { label: "少しある", icon: Wallet, val: "intermediate", desc: "数回程度" },
                                        { label: "経験者", icon: Settings2, val: "expert", desc: "1年以上" },
                                    ].map((item) => (
                                        <button
                                            key={item.val}
                                            onClick={() => handleSelect("experience", item.val)}
                                            className={`p-2 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 sm:gap-2 text-center group bg-white hover:shadow-md ${answers.experience === item.val
                                                ? "border-orange-500 ring-1 ring-orange-500"
                                                : "border-gray-200 hover:border-orange-300"
                                                }`}
                                        >
                                            <div className={`p-3 rounded-full ${answers.experience === item.val ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500"}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className={`font-bold text-lg ${answers.experience === item.val ? "text-orange-700" : "text-gray-700"}`}>{item.label}</div>
                                                <div className="hidden sm:block text-xs text-gray-400 mt-1">{item.desc}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">Q2. 重視するポイントは？</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {[
                                        { label: "コスト重視", val: "short", desc: "スプレッド・手数料" },
                                        { label: "金利収入", val: "long", desc: "スワップポイント" },
                                        { label: "ツール・機能", val: "medium", desc: "使いやすさ・分析" },
                                    ].map((item) => (
                                        <button
                                            key={item.val}
                                            onClick={() => handleSelect("style", item.val)}
                                            className={`p-2 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 sm:gap-2 text-center group bg-white hover:shadow-md ${answers.style === item.val
                                                ? "border-orange-500 ring-1 ring-orange-500"
                                                : "border-gray-200 hover:border-orange-300"
                                                }`}
                                        >
                                            <div className={`font-bold text-lg ${answers.style === item.val ? "text-orange-700" : "text-gray-700"}`}>{item.label}</div>
                                            <div className="hidden sm:block text-xs text-gray-400">{item.desc}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Removed Step 2 Back Button */}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">Q3. その他こだわり条件は？</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                        "スプレッドが狭い", "スワップが高い", "少額から可能",
                                        "ツールが使いやすい", "自動売買対応", "サポート充実"
                                    ].map((cond) => (
                                        <div
                                            key={cond}
                                            onClick={() => toggleCondition(cond)}
                                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-center text-center font-bold text-sm bg-white hover:shadow-sm ${answers.conditions.includes(cond)
                                                ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                                                : "border-gray-200 hover:border-orange-300 text-gray-600"
                                                }`}
                                        >
                                            {cond}
                                        </div>
                                    ))}
                                </div>

                                {/* Removed Step 3 Back Button */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <div className="text-gray-600 font-bold drop-shadow-sm text-center sm:text-left">
                        現在のおすすめ: <span className="text-3xl text-orange-600 ml-1">{filteredData.length}</span> 社
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setStep(step - 1)}
                                className="flex-1 sm:flex-none border-2 border-gray-300 text-gray-500 hover:text-orange-500 hover:border-orange-500 font-bold px-6 py-6 rounded-full"
                            >
                                戻る
                            </Button>
                        )}
                        <Button
                            size="lg"
                            onClick={handleSearchClick}
                            className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-1 border-2 border-transparent"
                        >
                            この条件で検索する
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SurveyDiagnostic;
