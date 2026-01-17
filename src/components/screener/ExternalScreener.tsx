import { ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExternalScreenerProps {
    market: "japan" | "us";
}

export const ExternalScreener = ({ market }: ExternalScreenerProps) => {
    const config = {
        japan: {
            title: "日本株スクリーナー",
            description: "東証上場銘柄の完全なスクリーナー機能をTradingViewで利用できます",
            url: "https://www.tradingview.com/screener/?exchange=TSE",
            features: [
                "時価総額・出来高でソート",
                "業種・セクター別フィルター",
                "テクニカル指標での検索",
                "リアルタイム株価更新"
            ]
        },
        us: {
            title: "米国株スクリーナー",
            description: "NASDAQ・NYSE上場銘柄の完全なスクリーナー機能をTradingViewで利用できます",
            url: "https://www.tradingview.com/screener/?exchange=NASDAQ%2CNYSE",
            features: [
                "S&P500・NASDAQ100銘柄",
                "時価総額・PERでソート",
                "セクター別フィルター",
                "詳細なファンダメンタル分析"
            ]
        }
    };

    const { title, description, url, features } = config[market];

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-6 p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-blue-600">
                <TrendingUp className="w-20 h-20" />
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 max-w-md">{description}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md max-w-md w-full">
                <h3 className="font-semibold text-gray-800 mb-3">利用できる機能：</h3>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <Button
                onClick={() => window.open(url, '_blank')}
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
                <ExternalLink className="w-5 h-5 mr-2" />
                TradingViewで開く
            </Button>

            <p className="text-sm text-gray-500">※ 新しいタブでTradingViewの公式サイトが開きます</p>
        </div>
    );
};
