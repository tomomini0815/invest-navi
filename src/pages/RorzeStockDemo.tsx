import RorzeVisualizer from "@/components/financial/RorzeVisualizer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RorzeStockDemo = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        戻る
                    </Button>
                </div>

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        ローツェ（6323）株式分析
                    </h1>
                    <p className="text-slate-600">
                        業績推移と株価トレンドの可視化
                    </p>
                </div>

                <RorzeVisualizer />

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>※ データは2026年1月17日時点の情報に基づいています</p>
                    <p>※ 予想値は会社発表または市場予想に基づきます</p>
                </div>
            </div>
        </div>
    );
};

export default RorzeStockDemo;
