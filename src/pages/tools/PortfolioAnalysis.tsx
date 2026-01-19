import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Lightbulb, PieChart, Plus, Trash2, RefreshCw, Pencil, X, Camera, AlertTriangle } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import html2canvas from "html2canvas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    Legend
} from "recharts";

// 資産の型定義
type Asset = {
    id: string;
    name: string;
    category: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
};

// カテゴリの定義
const CATEGORIES = [
    { value: "domestic_stock", label: "国内株式", color: "#3b82f6" }, // blue-500
    { value: "us_stock", label: "米国株式", color: "#ef4444" }, // red-500
    { value: "investment_trust", label: "投資信託", color: "#10b981" }, // emerald-500
    { value: "crypto", label: "暗号資産", color: "#f59e0b" }, // amber-500
    { value: "cash", label: "現金", color: "#64748b" }, // slate-500
    { value: "other", label: "その他", color: "#8b5cf6" }, // violet-500
];

const PortfolioAnalysis = () => {
    // 状態管理
    const [assets, setAssets] = useState<Asset[]>([
        { id: "1", name: "トヨタ自動車", category: "domestic_stock", quantity: 100, purchasePrice: 2000, currentPrice: 3500 },
        { id: "2", name: "Apple", category: "us_stock", quantity: 50, purchasePrice: 15000, currentPrice: 28000 },
        { id: "3", name: "全米株式インデックスファンド", category: "investment_trust", quantity: 100000, purchasePrice: 15000, currentPrice: 16500 },
        { id: "4", name: "Bitcoin", category: "crypto", quantity: 0.1, purchasePrice: 4000000, currentPrice: 9000000 },
    ]);

    // 入力フォームの状態
    const [newName, setNewName] = useState("");
    const [newCategory, setNewCategory] = useState("domestic_stock");
    const [newQuantity, setNewQuantity] = useState("");
    const [newPurchasePrice, setNewPurchasePrice] = useState("");
    const [newCurrentPrice, setNewCurrentPrice] = useState("");

    // 編集中のID
    const [editingId, setEditingId] = useState<string | null>(null);

    // キャプチャ用Ref
    const componentRef = useRef<HTMLDivElement>(null);

    // 画像保存ハンドラー
    const handleSaveImage = async () => {
        if (componentRef.current) {
            try {
                const canvas = await html2canvas(componentRef.current, {
                    scale: 2, // 高解像度でキャプチャ
                    useCORS: true, // クロスオリジン対応
                    logging: false,
                    backgroundColor: '#ffffff', // 背景白
                    onclone: (clonedDoc, element) => {
                        // アニメーションなどを無効化してズレを防ぐ
                        element.style.animation = 'none';
                        element.style.transition = 'none';

                        // Input要素をdivに置換してレンダリングズレを防ぐ
                        const inputs = clonedDoc.querySelectorAll('input');
                        inputs.forEach((input: any) => {
                            const div = clonedDoc.createElement('div');
                            div.textContent = input.value;
                            // クラスをコピー
                            div.className = input.className;

                            // スタイル調整（Shadcn UIのInputに合わせる）
                            div.style.display = 'flex';
                            div.style.alignItems = 'center';
                            div.style.height = '40px'; // デフォルトの高さ
                            // div.style.paddingLeft = '12px'; // px-3相当（クラスで適用されるはずだが念のため）

                            if (input.parentNode) {
                                input.parentNode.replaceChild(div, input);
                            }
                        });

                        // Select要素(Trigger)をdivに置換
                        const selects = clonedDoc.querySelectorAll('button[role="combobox"]');
                        selects.forEach((select: any) => {
                            const div = clonedDoc.createElement('div');
                            div.innerHTML = select.innerHTML;
                            div.className = select.className;

                            div.style.display = 'flex';
                            div.style.alignItems = 'center';
                            div.style.justifyContent = 'space-between';
                            div.style.height = '40px';

                            if (select.parentNode) {
                                select.parentNode.replaceChild(div, select);
                            }
                        });
                    }
                } as any);

                // 画像保存処理
                canvas.toBlob((blob) => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob);

                    // ダウンロード
                    const link = document.createElement('a');
                    link.download = `my-portfolio-${new Date().toISOString().slice(0, 10)}.png`;
                    link.href = url;
                    link.click();

                    // 新しいタブで開く
                    window.open(url, '_blank');

                    // メモリ解放
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                    }, 60000);
                }, 'image/png');

            } catch (error) {
                console.error('画像の保存に失敗しました', error);
                alert('画像の保存に失敗しました。ブラウザの設定等をご確認ください。');
            }
        }
    };

    // 資産追加
    const addAsset = () => {
        // バリデーション
        if (!newName) return;
        if (newCategory === 'cash') {
            if (!newPurchasePrice) return;
        } else {
            if (!newQuantity || !newPurchasePrice || !newCurrentPrice) return;
        }

        const quantity = newCategory === 'cash' ? 1 : parseFloat(newQuantity);
        const purchasePrice = parseFloat(newPurchasePrice);
        const currentPrice = newCategory === 'cash' ? purchasePrice : parseFloat(newCurrentPrice);

        const newAsset: Asset = {
            id: Date.now().toString(),
            name: newName,
            category: newCategory,
            quantity: quantity,
            purchasePrice: purchasePrice,
            currentPrice: currentPrice,
        };

        setAssets([...assets, newAsset]);

        // フォームリセット
        setNewName("");
        setNewQuantity("");
        setNewPurchasePrice("");
        setNewCurrentPrice("");
    };

    // 資産削除
    const removeAsset = (id: string) => {
        setAssets(assets.filter(asset => asset.id !== id));
        if (editingId === id) cancelEdit();
    };

    // 資産編集開始
    const editAsset = (asset: Asset) => {
        setEditingId(asset.id);
        setNewName(asset.name);
        setNewCategory(asset.category);
        setNewQuantity(asset.quantity.toString());
        setNewPurchasePrice(asset.purchasePrice.toString());
        setNewCurrentPrice(asset.currentPrice.toString());
    };

    // 編集キャンセル
    const cancelEdit = () => {
        setEditingId(null);
        setNewName("");
        setNewQuantity("");
        setNewPurchasePrice("");
        setNewCurrentPrice("");
        setNewCategory("domestic_stock");
    };

    // 資産更新
    const updateAsset = () => {
        // バリデーション
        if (!editingId || !newName) return;
        if (newCategory === 'cash') {
            if (!newPurchasePrice) return;
        } else {
            if (!newQuantity || !newPurchasePrice || !newCurrentPrice) return;
        }

        setAssets(assets.map(asset => {
            if (asset.id === editingId) {
                const quantity = newCategory === 'cash' ? 1 : parseFloat(newQuantity);
                const purchasePrice = parseFloat(newPurchasePrice);
                const currentPrice = newCategory === 'cash' ? purchasePrice : parseFloat(newCurrentPrice);

                return {
                    ...asset,
                    name: newName,
                    category: newCategory,
                    quantity: quantity,
                    purchasePrice: purchasePrice,
                    currentPrice: currentPrice,
                };
            }
            return asset;
        }));

        cancelEdit();
    };

    // 分析計算
    const analysis = useMemo(() => {
        let totalValue = 0;
        let totalCost = 0;
        const categoryAllocation: Record<string, number> = {};

        assets.forEach(asset => {
            let currentValue = asset.quantity * asset.currentPrice;
            let costBasis = asset.quantity * asset.purchasePrice;

            // 投資信託の場合、基準価額は1万口あたりなので補正
            if (asset.category === 'investment_trust') {
                currentValue /= 10000;
                costBasis /= 10000;
            }

            totalValue += currentValue;
            totalCost += costBasis;

            // カテゴリ別集計
            if (categoryAllocation[asset.category]) {
                categoryAllocation[asset.category] += currentValue;
            } else {
                categoryAllocation[asset.category] = currentValue;
            }
        });

        const totalGainLoss = totalValue - totalCost;
        const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

        // 円グラフ用データ作成
        const chartData = Object.entries(categoryAllocation).map(([key, value]) => {
            const category = CATEGORIES.find(c => c.value === key);
            return {
                name: category?.label || key,
                value: value,
                color: category?.color || "#cbd5e1",
                percent: (value / totalValue) * 100
            };
        }).sort((a, b) => b.value - a.value);

        return {
            totalValue,
            totalCost,
            totalGainLoss,
            totalGainLossPercent,
            chartData
        };
    }, [assets]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
                    <div className="container mx-auto px-4">
                        <Link
                            to="/stocks"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                            株式投資ガイドに戻る
                        </Link>
                    </div>
                </div>

                {/* Page Header */}
                <section className="relative py-20 container mx-auto px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 animate-fade-in" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
                            便利ツール
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-fade-in">
                            ポートフォリオ分析ツール
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in mb-8" style={{ animationDelay: '0.1s' }}>
                            あなたの資産配分を可視化し、リスクとリターンのバランスを確認しましょう
                        </p>

                        <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <Button onClick={handleSaveImage} className="bg-white text-secondary border border-secondary hover:bg-slate-50 shadow-sm">
                                <Camera className="mr-2 h-4 w-4" />
                                ポートフォリオ画像を保存
                            </Button>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-lg text-left flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    <p className="font-bold mb-1">データの保存について</p>
                                    <p>入力したデータは一時的なもので、ページを閉じると消去されます。記録を残したい場合は、上記の「画像を保存」機能をご利用ください。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Analysis Dashboard */}
                <section ref={componentRef} className="py-8 container mx-auto px-4 bg-white">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* KPI Cards */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <Card className="bg-gradient-to-br from-white to-slate-50 border-l-4 border-l-blue-500 shadow-sm">
                                <CardContent className="pt-6">
                                    <p className="text-sm font-medium text-muted-foreground mb-1">総資産評価額</p>
                                    <h3 className="text-3xl font-bold text-slate-800">
                                        ¥{Math.floor(analysis.totalValue).toLocaleString()}
                                    </h3>
                                </CardContent>
                            </Card>
                            <Card className={`bg-gradient-to-br from-white to-slate-50 border-l-4 shadow-sm ${analysis.totalGainLoss >= 0 ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
                                <CardContent className="pt-6">
                                    <p className="text-sm font-medium text-muted-foreground mb-1">評価損益</p>
                                    <div className="flex items-end gap-2">
                                        <h3 className={`text-3xl font-bold ${analysis.totalGainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {analysis.totalGainLoss >= 0 ? '+' : ''}¥{Math.floor(analysis.totalGainLoss).toLocaleString()}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className={`bg-gradient-to-br from-white to-slate-50 border-l-4 shadow-sm ${analysis.totalGainLossPercent >= 0 ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
                                <CardContent className="pt-6">
                                    <p className="text-sm font-medium text-muted-foreground mb-1">損益率</p>
                                    <h3 className={`text-3xl font-bold ${analysis.totalGainLossPercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {analysis.totalGainLoss >= 0 ? '+' : ''}{analysis.totalGainLossPercent.toFixed(2)}%
                                    </h3>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Chart Section */}
                        <div className="lg:col-span-2">
                            <Card className="h-full border-2 bg-gradient-to-br from-card to-card/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChart className="h-5 w-5 text-secondary" />
                                        資産配分（ポートフォリオ）
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        {analysis.chartData.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RechartsPieChart>
                                                    <Pie
                                                        data={analysis.chartData}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={100}
                                                        paddingAngle={2}
                                                        dataKey="value"
                                                        stroke="none"
                                                    >
                                                        {analysis.chartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <RechartsTooltip
                                                        formatter={(value: number) => `¥${Math.floor(value).toLocaleString()}`}
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                    />
                                                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                                                </RechartsPieChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-muted-foreground">
                                                データがありません
                                            </div>
                                        )}
                                    </div>

                                    {/* Allocation Table */}
                                    <div className="mt-4 space-y-2">
                                        {analysis.chartData.map((item) => (
                                            <div key={item.name} className="flex items-center justify-between text-sm p-2 rounded hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                    <span className="font-medium text-slate-700">{item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-slate-500 font-mono">{item.percent.toFixed(1)}%</span>
                                                    <span className="font-bold text-slate-800">¥{Math.floor(item.value).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Input Form */}
                        <div className="lg:col-span-1">
                            <Card className={`h-full border-2 sticky top-4 transition-colors ${editingId ? 'bg-amber-50 border-amber-200' : 'bg-white'}`}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        {editingId ? (
                                            <>
                                                <Pencil className="h-5 w-5 text-amber-600" />
                                                資産を編集
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-5 w-5 text-secondary" />
                                                資産を追加
                                            </>
                                        )}
                                    </CardTitle>
                                    <CardDescription>
                                        {editingId ? "内容を修正して更新ボタンを押してください" : "保有資産の情報を入力してください"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">カテゴリ</Label>
                                        <Select value={newCategory} onValueChange={setNewCategory}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="カテゴリを選択" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map(cat => (
                                                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            {newCategory === 'crypto' ? '通貨名' :
                                                newCategory === 'investment_trust' ? 'ファンド名' :
                                                    newCategory === 'cash' ? '資産名' :
                                                        newCategory === 'other' ? '資産名' : '銘柄名'}
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder={
                                                newCategory === 'crypto' ? '例: Bitcoin, BTC' :
                                                    newCategory === 'investment_trust' ? '例: eMAXIS Slim 米国株式' :
                                                        newCategory === 'us_stock' ? '例: Apple, AAPL' :
                                                            newCategory === 'cash' ? '例: 銀行預金, 日本円' :
                                                                newCategory === 'other' ? '例: 金(ゴールド), 不動産, 時計' :
                                                                    '例: トヨタ自動車'
                                            }
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                        />
                                        {newCategory === 'crypto' && (
                                            <p className="text-xs text-muted-foreground">
                                                ビットコインやイーサリアムなどの通貨名を入力
                                            </p>
                                        )}
                                        {newCategory === 'us_stock' && (
                                            <p className="text-xs text-muted-foreground">
                                                ※ティッカーシンボル（例: AAPL）や企業名を入力
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {newCategory !== 'cash' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="quantity">
                                                    {newCategory === 'investment_trust' ? '保有口数' : '保有数量'}
                                                </Label>
                                                <Input
                                                    id="quantity"
                                                    type="number"
                                                    placeholder={newCategory === 'crypto' ? '0.1' : '100'}
                                                    value={newQuantity}
                                                    onChange={(e) => setNewQuantity(e.target.value)}
                                                />
                                            </div>
                                        )}
                                        <div className={`space-y-2 ${newCategory === 'cash' ? 'col-span-2' : ''}`}>
                                            <Label htmlFor="avg-price">
                                                {newCategory === 'crypto' ? '平均取得レート' :
                                                    newCategory === 'cash' ? '金額' :
                                                        newCategory === 'other' ? '取得価格' :
                                                            newCategory === 'us_stock' ? '平均取得単価(円)' :
                                                                newCategory === 'investment_trust' ? '平均取得基準価額' : '平均取得単価'}
                                            </Label>
                                            <Input
                                                id="avg-price"
                                                type="number"
                                                placeholder={
                                                    newCategory === 'crypto' ? '5000000' :
                                                        newCategory === 'cash' ? '例: 1000000' :
                                                            newCategory === 'other' ? '例: 500000' :
                                                                newCategory === 'us_stock' ? '例: 20000 (円換算)' :
                                                                    newCategory === 'investment_trust' ? '例: 15000' : '2000'
                                                }
                                                value={newPurchasePrice}
                                                onChange={(e) => setNewPurchasePrice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {newCategory !== 'cash' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="current-price">
                                                {newCategory === 'crypto' ? '現在レート' :
                                                    newCategory === 'investment_trust' ? '現在基準価額' :
                                                        newCategory === 'other' ? '現在評価額' :
                                                            newCategory === 'us_stock' ? '現在値(円)' : '現在値'}
                                            </Label>
                                            <Input
                                                id="current-price"
                                                type="number"
                                                placeholder={
                                                    newCategory === 'crypto' ? '6000000' :
                                                        newCategory === 'other' ? '例: 600000' :
                                                            newCategory === 'us_stock' ? '例: 28000 (円換算)' : '2500'
                                                }
                                                value={newCurrentPrice}
                                                onChange={(e) => setNewCurrentPrice(e.target.value)}
                                            />
                                            {newCategory === 'investment_trust' && (
                                                <p className="text-xs text-muted-foreground">
                                                    ※基準価額（1万口あたり）を入力してください。自動で口数計算されます。
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        {editingId ? (
                                            <>
                                                <Button onClick={cancelEdit} variant="outline" className="flex-1">
                                                    <X className="h-4 w-4 mr-2" />
                                                    キャンセル
                                                </Button>
                                                <Button onClick={updateAsset} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold">
                                                    更新する
                                                </Button>
                                            </>
                                        ) : (
                                            <Button onClick={addAsset} className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6">
                                                ポートフォリオに追加
                                            </Button>
                                        )}
                                    </div>

                                    {!editingId && (
                                        <div className="pt-4 border-t">
                                            <Button variant="outline" onClick={() => setAssets([])} className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                データをすべてクリア
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Asset List */}
                        <div className="lg:col-span-3">
                            <Card className="border-2 overflow-hidden">
                                <CardHeader className="bg-slate-50 border-b">
                                    <CardTitle className="text-lg">保有資産一覧</CardTitle>
                                </CardHeader>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-slate-500 font-medium">
                                            <tr>
                                                <th className="px-4 py-3">銘柄名</th>
                                                <th className="px-4 py-3">カテゴリ</th>
                                                <th className="px-4 py-3 text-right">数量</th>
                                                <th className="px-4 py-3 text-right">取得単価</th>
                                                <th className="px-4 py-3 text-right">現在値</th>
                                                <th className="px-4 py-3 text-right">評価額</th>
                                                <th className="px-4 py-3 text-right">損益</th>
                                                <th className="px-4 py-3 text-center">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y border-b">
                                            {assets.length === 0 ? (
                                                <tr>
                                                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                                                        資産データが登録されていません
                                                    </td>
                                                </tr>
                                            ) : (
                                                assets.map((asset) => {
                                                    const value = asset.quantity * asset.currentPrice;
                                                    const cost = asset.quantity * asset.purchasePrice;
                                                    const gain = value - cost;
                                                    const gainPercent = (gain / cost) * 100;
                                                    const isEditing = editingId === asset.id;

                                                    return (
                                                        <tr key={asset.id} className={`transition-colors ${isEditing ? 'bg-amber-50' : 'hover:bg-slate-50'}`}>
                                                            <td className="px-4 py-3 font-medium text-slate-800">
                                                                {isEditing && <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>}
                                                                {asset.name}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <Badge variant="secondary" className="font-normal text-xs bg-slate-100 text-slate-600 hover:bg-slate-200">
                                                                    {CATEGORIES.find(c => c.value === asset.category)?.label}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-4 py-3 text-right font-mono">{asset.quantity.toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-right font-mono text-slate-500">¥{asset.purchasePrice.toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-right font-mono">¥{asset.currentPrice.toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-right font-bold text-slate-700">¥{Math.floor(value).toLocaleString()}</td>
                                                            <td className={`px-4 py-3 text-right font-bold ${gain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                                {gain >= 0 ? '+' : ''}¥{Math.floor(gain).toLocaleString()}
                                                                <span className="block text-xs opacity-80">
                                                                    ({gain >= 0 ? '+' : ''}{gainPercent.toFixed(1)}%)
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <div className="flex items-center justify-center gap-1">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => editAsset(asset)}
                                                                        className={`h-8 w-8 ${isEditing ? 'text-amber-600 bg-amber-100' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => removeAsset(asset.id)}
                                                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>

                    </div>
                </section>

                {/* Introduction / Guide */}
                <section className="py-16 bg-muted/30 mt-8">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <Badge className="mb-4 bg-orange-100 text-orange-700 border-none hover:bg-orange-200">Point</Badge>
                                <h2 className="text-3xl font-bold mb-4 text-slate-800">理想的なポートフォリオの作り方</h2>
                                <p className="text-muted-foreground">
                                    リスクを抑えながら安定したリターンを目指すためのポイント
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="hover:shadow-lg transition-all duration-300">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                            <PieChart className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <CardTitle>分散投資を心がける</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600 leading-relaxed">
                                            「卵を一つのカゴに盛るな」という投資格言があるように、特定の銘柄や資産だけに集中投資するのはリスクが高くなります。
                                            国内株式だけでなく、米国株式、債券、不動産など、異なる値動きをする資産を組み合わせることで、暴落時のダメージを軽減できます。
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-all duration-300">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                            <RefreshCw className="h-6 w-6 text-emerald-600" />
                                        </div>
                                        <CardTitle>定期的なリバランス</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600 leading-relaxed">
                                            時間が経つと、値上がりした資産の割合が増え、当初の資産配分比率からズレてしまいます。
                                            年に1回程度、資産配分を見直し、増えすぎた資産を売って減った資産を買い増す「リバランス」を行うことで、
                                            リスクを一定に保ちながらパフォーマンスを向上させることができます。
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/20 border-2 border-secondary/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-50" />
                                <CardContent className="p-10 text-center relative z-10">
                                    <div className="inline-block p-4 bg-background rounded-full mb-6 animate-pulse">
                                        <Lightbulb className="h-12 w-12 text-secondary" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">より詳しい分析をご希望ですか？</h2>
                                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                        AIを使った高度なポートフォリオ最適化提案や、リスク許容度診断もご用意しています。
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform bg-secondary hover:bg-secondary/90">
                                            <Link to="/tools/risk-assessment#diagnostic-tool">
                                                リスク許容度診断を試す →
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
                                            <Link to="/tools">
                                                ツール一覧に戻る
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PortfolioAnalysis;
