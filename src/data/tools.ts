import { Calculator as CalcIcon, PieChart, TrendingUp, LineChart, Coins } from "lucide-react";

export const tools = [
    {
        id: "compound-interest",
        title: "複利計算シミュレータ",
        description: "長期投資の効果を可視化する複利計算ツール",
        icon: CalcIcon,
        category: "基礎計算",
    },
    {
        id: "nisa-simulation",
        title: "NISA投資シミュレーション",
        description: "NISAの非課税メリットを活用した将来の資産形成をシミュレーション",
        icon: CalcIcon,
        category: "シミュレーション",
        customLink: "/nisa#nisa-simulation",
    },
    {
        id: "saving-calculator",
        title: "積立額計算ツール",
        description: "目標額に応じた最適な積立額と期間を計算",
        icon: PieChart,
        category: "基礎計算",
    },
    {
        id: "risk-assessment",
        title: "リスク許容度診断",
        description: "自分のリスク許容度を診断し、適切な投資戦略を見つけましょう",
        icon: LineChart,
        category: "診断ツール",
    },
    {
        id: "portfolio-analysis",
        title: "ポートフォリオ分析ツール",
        description: "保有資産の配分を可視化し、リスクとリターンを分析",
        icon: PieChart,
        category: "資産管理",
    },
    {
        id: "stock-return",
        title: "株式リターン計算機",
        description: "株式投資のリターンとリスクを計算するシミュレーションツール",
        icon: TrendingUp,
        category: "株式投資",
    },
    {
        id: "fund-return",
        title: "投資信託リターン計算機",
        description: "投資信託の期待リターンとリスクをシミュレーション",
        icon: PieChart,
        category: "投資信託",
    },
    {
        id: "crypto-return",
        title: "仮想通貨リターン計算機",
        description: "仮想通貨投資のリターンとリスクをシミュレーション",
        icon: Coins,
        category: "仮想通貨",
    },
    {
        id: "fx-calculator",
        title: "FX計算シミュレータ",
        description: "FX取引の必要証拠金、利益/損失などを計算するシミュレーションツール",
        icon: TrendingUp,
        category: "FX取引",
    },
];
