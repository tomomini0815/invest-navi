import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, UserCircle2, Wallet, Settings2, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Company {
    name: string;
    points: string[];
    specs: { label: string; value: string; isHighlight?: boolean }[];
    campaignText?: string;
    badgeText?: string;
    affiliateUrl?: string;
    // Extended properties for various page logic
    id?: string;
    rank?: number;
    rating?: number;
    detailUrl?: string;
    customLogo?: React.ReactNode;
    promotionBanner?: React.ReactNode;
    customAffiliateButton?: React.ReactNode;
    accordionData?: {
        features: string;
        goodPoints: string[];
        specTitle?: string;
        specTable: {
            row1: { label: string; value: string; className?: string }[];
            row2: { label: string; value: string; className?: string }[];
        };
        startGuide: {
            title: string;
            description: string;
            steps: { title: string; description: string }[];
        };
    };
}


interface SurveyDiagnosticProps {
    data: Company[];
    onSearch: (filtered: Company[]) => void;
    type?: "fx" | "securities" | "crypto"; // Added crypto
}

export const SurveyDiagnostic = ({ data, onSearch, type = "fx" }: SurveyDiagnosticProps) => {
    const [step, setStep] = useState(1);

    // Unified state structure
    const [answers, setAnswers] = useState({
        experience: "",
        product: "", // For Securities/Crypto
        style: "", // For FX
        priorities: [] as string[], // For Securities/Crypto
        conditions: [] as string[], // For FX
    });

    const [filteredData, setFilteredData] = useState<Company[]>(data);

    // Reset state when type changes
    useEffect(() => {
        setStep(1);
        setAnswers({
            experience: "",
            product: "",
            style: "",
            priorities: [],
            conditions: [],
        });
        setFilteredData(data);
    }, [type, data]);

    // Filter Logic
    useEffect(() => {
        let result = data;

        if (type === "securities") {
            // ... (Securities Logic) ...
            // 1. Experience Filter
            if (answers.experience === "beginner") {
                result = result.filter(c =>
                    c.points.some(p => p.includes("初心者") || p.includes("ポイント") || p.includes("100円") || p.includes("サポート")) ||
                    ["SBI証券", "楽天証券", "松井証券", "auカブコム証券", "PayPay証券", "DMM株"].some(n => c.name.includes(n))
                );
            } else if (answers.experience === "expert") {
                result = result.filter(c =>
                    c.points.some(p => p.includes("高機能") || p.includes("分析") || p.includes("CFD") || p.includes("IPO") || p.includes("米国株")) ||
                    ["SBI証券", "マネックス証券", "GMOクリック証券", "IG証券", "moomoo証券", "松井証券"].some(n => c.name.includes(n))
                );
            }

            // 2. Product Filter
            if (answers.product === "nisa") {
                result = result.filter(c =>
                    c.specs.some(s => s.label === "NISA" && (s.value.includes("無料") || s.value.includes("対応"))) ||
                    c.points.some(p => p.includes("積立") || p.includes("NISA"))
                );
            } else if (answers.product === "jp") {
                result = result.filter(c =>
                    c.specs.some(s => s.label === "国内株手数料" && (s.value.includes("無料") || s.value.includes("安"))) ||
                    c.points.some(p => p.includes("国内株") || p.includes("IPO") || p.includes("1株"))
                );
            } else if (answers.product === "us") {
                result = result.filter(c =>
                    c.specs.some(s => s.label === "米国株手数料" && (s.value.includes("無料") || s.value.includes("安") || s.value.includes("0.495"))) ||
                    c.points.some(p => p.includes("米国株") || p.includes("CFD")) ||
                    c.name.includes("moomoo") || c.name.includes("IG") || c.name.includes("DMM")
                );
            }

            // 3. Priority Filter
            if (answers.priorities.length > 0) {
                result = result.filter(c => {
                    return answers.priorities.every(cond => {
                        if (cond === "手数料が安い") return c.points.some(p => p.includes("無料") || p.includes("安")) || c.specs.some(s => s.value.includes("無料") || s.value.includes("0円"));
                        if (cond === "ポイント重視") return c.points.some(p => p.includes("ポイント")) || c.specs.some(s => s.label === "ポイント" && s.value !== "-");
                        if (cond === "ツールが高機能") return c.points.some(p => p.includes("ツール") || p.includes("アプリ") || p.includes("分析")) || ["GMO", "moomoo", "IG", "マネックス", "楽天"].some(n => c.name.includes(n));
                        if (cond === "IPOに強い") return c.points.some(p => p.includes("IPO")) || c.specs.some(s => s.label === "IPO取扱") || ["SBI", "マネックス", "楽天", "松井"].some(n => c.name.includes(n));
                        if (cond === "少額から投資") return c.points.some(p => p.includes("100円") || p.includes("1株") || p.includes("単元未満")) || c.name.includes("PayPay") || c.name.includes("auカブコム") || c.name.includes("DMM");
                        return true;
                    });
                });
            }

            // Safety fallback
            if (result.length === 0) {
                if (answers.experience === "expert") {
                    result = data.filter(c => ["SBI証券", "楽天証券", "GMOクリック証券", "マネックス証券", "moomoo証券"].some(n => c.name.includes(n)));
                } else {
                    result = data.filter(c => ["SBI証券", "楽天証券", "松井証券", "PayPay証券"].some(n => c.name.includes(n)));
                }
            }

        } else if (type === "crypto") {
            // --- CRYPTO LOGIC (Purple) ---

            // 1. Experience
            if (answers.experience === "beginner") {
                result = result.filter(c => c.points.some(p => p.includes("初心者") || p.includes("UI") || p.includes("簡単")));
            } else if (answers.experience === "expert") {
                result = result.filter(c => c.points.some(p => p.includes("板") || p.includes("手数料") || p.includes("ツール")));
            }

            // 2. Product (Style)
            if (answers.product === "accumulate") { // 積立
                result = result.filter(c => c.points.some(p => p.includes("積立") || p.includes("少額")));
            } else if (answers.product === "trading") { // トレード
                result = result.filter(c => c.points.some(p => p.includes("板") || p.includes("スプレッド") || p.includes("ツール")));
            } else if (answers.product === "altcoin") { // アルトコイン
                result = result.filter(c =>
                    c.specs.some(s => s.label === "取扱通貨数" && parseInt(s.value) > 20)
                );
            }

            // 3. Priorities
            if (answers.priorities.length > 0) {
                result = result.filter(c => {
                    return answers.priorities.every(cond => {
                        if (cond === "手数料が安い") return c.specs.some(s => s.label === "取引手数料" && (s.value.includes("無料") || s.value.includes("安")));
                        if (cond === "銘柄数が多い") return c.specs.some(s => s.label === "取扱通貨数" && parseInt(s.value) > 25);
                        if (cond === "アプリが使いやすい") return c.points.some(p => p.includes("アプリ") && p.includes("使いやすい"));
                        if (cond === "送金無料") return c.specs.some(s => s.label === "送金手数料" && s.value.includes("無料"));
                        return true;
                    });
                });
            }

            if (result.length === 0) result = data.slice(0, 3);

        } else {
            // --- FX LOGIC (Orange) ---
            // ... (FX Logic) ...
            // 1. Experience Filter
            if (answers.experience === "beginner") {
                result = result.filter(c =>
                    c.points.some(p => p.includes("初心者") || p.includes("サポート") || p.includes("直感的")) ||
                    c.specs.some(s => s.label === "最小取引単位" && (s.value === "1通貨" || s.value === "1,000通貨")) ||
                    c.name.includes("DMM")
                );
            } else if (answers.experience === "expert") {
                result = result.filter(c =>
                    c.points.some(p => p.includes("高機能") || p.includes("分析")) ||
                    c.specs.some(s => s.label === "通貨ペア" && parseInt(s.value.replace(/[^0-9]/g, "")) >= 29)
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
                        if (cond === "少額から可能") return c.specs.some(s => s.label === "最小取引単位" && (s.value === "1通貨" || s.value === "100円" || s.value === "1,000通貨"));
                        if (cond === "ツールが使いやすい") return c.points.some(p => p.includes("ツール") || p.includes("アプリ") || p.includes("操作")) || c.name.includes("DMM");
                        if (cond === "自動売買対応") return c.points.some(p => p.includes("自動売買") || c.name.includes("トライオート") || c.name.includes("松井"));
                        if (cond === "サポート充実") return c.points.some(p => p.includes("サポート") || p.includes("問い合わせ") || p.includes("安心")) || c.name.includes("DMM");
                        return true;
                    });
                });
            }

            // Safety fallback
            if (result.length === 0) {
                result = data.slice(0, 3);
            }
        }

        setFilteredData(result);
    }, [answers, data, type]);

    const handleSelect = (key: string, value: any) => {
        setAnswers({ ...answers, [key]: value });
        if (key !== "priorities" && key !== "conditions" && step < 3) {
            setTimeout(() => setStep(step + 1), 300);
        }
    };

    const toggleList = (key: "priorities" | "conditions", item: string) => {
        const current = answers[key];
        const next = current.includes(item)
            ? current.filter((c) => c !== item)
            : [...current, item];
        setAnswers({ ...answers, [key]: next });
    };

    const handleSearchClick = () => {
        onSearch(filteredData.length > 0 ? filteredData : data);
    };

    // Logic Switches
    const isSecurities = type === "securities";
    const isCrypto = type === "crypto";

    // Dynamic Styling - Unified for all types as per user request
    const bgGradient = "bg-gradient-to-r from-emerald-500 to-teal-500";
    const bgLight = "bg-emerald-50";
    const textColor = "text-emerald-700";
    const borderColor = "border-emerald-500";
    const ringColor = "ring-emerald-500";
    const searchButtonBg = "bg-emerald-600 hover:bg-emerald-700";

    // Helper to get conditional classes
    const getActiveClasses = (isActive: boolean) => isActive ? `${borderColor} ${ringColor} ring-1` : "border-gray-200 hover:border-gray-300";
    const getIconBg = (isActive: boolean) => isActive ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400";
    const getStepClasses = (s: number) => {
        if (step >= s) {
            return "bg-emerald-500 text-white border-emerald-500 shadow-md";
        }
        return "bg-white text-gray-300 border-gray-200";
    }
    const getStepBarClasses = (s: number) => {
        if (step > s) {
            return "bg-emerald-500";
        }
        return "bg-gray-100";
    }

    return (
        <div className={`w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white border-2 border-emerald-100`}>
            {/* Header */}
            <div className={`p-4 text-white text-center ${bgGradient}`}>
                <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-3 drop-shadow-md whitespace-nowrap">
                    <Search className="w-6 h-6" />
                    あなたの投資スタイルから診断
                </h2>
                <p className="text-emerald-100 text-sm mt-1">3つの質問に答えるだけで、最適な口座が見つかります</p>
            </div>

            <div className="p-4 sm:p-6 bg-white">
                {/* Progress Bar */}
                <div className="flex items-center justify-center mb-6 gap-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all ${getStepClasses(s)}`}
                            >
                                {step > s ? <Check className="w-6 h-6" /> : s}
                            </div>
                            {s < 3 && <div className={`w-12 h-1 mx-2 rounded-full ${getStepBarClasses(s)}`} />}
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
                                    <h3 className="text-xl font-bold text-gray-800">Q1. {isSecurities ? "株式投資の経験はありますか？" : (isCrypto ? "暗号資産投資の経験はありますか？" : "FX取引の経験はありますか？")}</h3>
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
                                            className={`p-2 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 sm:gap-2 text-center group bg-white hover:shadow-md ${getActiveClasses(answers.experience === item.val)}`}
                                        >
                                            <div className={`p-3 rounded-full ${getIconBg(answers.experience === item.val)}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className={`font-bold text-lg ${answers.experience === item.val ? textColor : "text-gray-700"}`}>{item.label}</div>
                                                <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
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
                                    <h3 className="text-xl font-bold text-gray-800">Q2. {isSecurities ? "興味のある商品は？" : (isCrypto ? "投資スタイルは？" : "重視するポイントは？")}</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {isSecurities ? (
                                        // Securities Options
                                        [
                                            { label: "NISA・投信", val: "nisa", desc: "将来のための積立" },
                                            { label: "日本株", val: "jp", desc: "おなじみの企業" },
                                            { label: "米国株", val: "us", desc: "AppleやAmazon" },
                                        ].map((item) => (
                                            <button
                                                key={item.val}
                                                onClick={() => handleSelect("product", item.val)}
                                                className={`p-2 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 sm:gap-2 text-center group bg-white hover:shadow-md ${getActiveClasses(answers.product === item.val)}`}
                                            >
                                                <div className={`font-bold text-lg ${answers.product === item.val ? textColor : "text-gray-700"}`}>{item.label}</div>
                                                <div className="text-xs text-gray-400">{item.desc}</div>
                                            </button>
                                        ))
                                    ) : isCrypto ? (
                                        // Crypto Options
                                        [
                                            { label: "コツコツ積立", val: "accumulate", desc: "毎月定額" },
                                            { label: "アクティブ", val: "trading", desc: "値動きで利益" },
                                            { label: "アルトコイン", val: "altcoin", desc: "いろんな通貨" },
                                        ].map((item) => (
                                            <button
                                                key={item.val}
                                                onClick={() => handleSelect("product", item.val)}
                                                className={`p-2 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 sm:gap-2 text-center group bg-white hover:shadow-md ${getActiveClasses(answers.product === item.val)}`}
                                            >
                                                <div className={`font-bold text-lg ${answers.product === item.val ? textColor : "text-gray-700"}`}>{item.label}</div>
                                                <div className="text-xs text-gray-400">{item.desc}</div>
                                            </button>
                                        ))

                                    ) : (
                                        // FX Options
                                        [
                                            { label: "コスト重視", val: "short", desc: "スプレッド・手数料" },
                                            { label: "金利収入", val: "long", desc: "スワップポイント" },
                                            { label: "ツール・機能", val: "medium", desc: "使いやすさ・分析" },
                                        ].map((item) => (
                                            <button
                                                key={item.val}
                                                onClick={() => handleSelect("style", item.val)}
                                                className={`p-2 sm:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 sm:gap-2 text-center group bg-white hover:shadow-md ${getActiveClasses(answers.style === item.val)}`}
                                            >
                                                <div className={`font-bold text-lg ${answers.style === item.val ? textColor : "text-gray-700"}`}>{item.label}</div>
                                                <div className="text-xs text-gray-400">{item.desc}</div>
                                            </button>
                                        ))
                                    )}
                                </div>
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
                                    <h3 className="text-xl font-bold text-gray-800">Q3. {isSecurities ? "重視するポイントは？" : (isCrypto ? "こだわり条件は？" : "その他こだわり条件は？")}</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {isSecurities ? (
                                        // Securities Conditions
                                        [
                                            "手数料が安い", "ポイント重視", "ツールが高機能",
                                            "IPOに強い", "少額から投資"
                                        ].map((cond) => (
                                            <div
                                                key={cond}
                                                onClick={() => toggleList("priorities", cond)}
                                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-center text-center font-bold text-sm bg-white hover:shadow-sm ${answers.priorities.includes(cond)
                                                    ? `${borderColor} ${bgLight} ${textColor} shadow-sm`
                                                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                                                    }`}
                                            >
                                                {cond}
                                            </div>
                                        ))
                                    ) : isCrypto ? (
                                        // Crypto Conditions
                                        [
                                            "手数料が安い", "銘柄数が多い", "アプリが使いやすい",
                                            "送金無料", "セキュリティ"
                                        ].map((cond) => (
                                            <div
                                                key={cond}
                                                onClick={() => toggleList("priorities", cond)}
                                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-center text-center font-bold text-sm bg-white hover:shadow-sm ${answers.priorities.includes(cond)
                                                    ? `${borderColor} ${bgLight} ${textColor} shadow-sm`
                                                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                                                    }`}
                                            >
                                                {cond}
                                            </div>
                                        ))
                                    ) : (
                                        // FX Conditions
                                        [
                                            "スプレッドが狭い", "スワップが高い", "少額から可能",
                                            "ツールが使いやすい", "自動売買対応", "サポート充実"
                                        ].map((cond) => (
                                            <div
                                                key={cond}
                                                onClick={() => toggleList("conditions", cond)}
                                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-center text-center font-bold text-sm bg-white hover:shadow-sm ${answers.conditions.includes(cond)
                                                    ? `${borderColor} ${bgLight} ${textColor} shadow-sm`
                                                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                                                    }`}
                                            >
                                                {cond}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <div className="text-gray-600 font-bold drop-shadow-sm text-center sm:text-left">
                        現在のおすすめ: <span className="text-3xl ml-1 text-emerald-600">{filteredData.length}</span> 社
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setStep(step - 1)}
                                className="flex-1 sm:flex-none border-2 border-gray-300 text-gray-500 hover:text-emerald-700 hover:border-emerald-500 font-bold px-6 py-6 rounded-full"
                            >
                                戻る
                            </Button>
                        )}
                        <Button
                            size="lg"
                            onClick={handleSearchClick}
                            className={`flex-1 sm:flex-none ${searchButtonBg} text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-1 border-2 border-transparent`}
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

