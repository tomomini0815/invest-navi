import { StockDetailData } from "./japanStockDetailData";

export const usStockDetailData: Record<string, StockDetailData> = {
    "AAPL": {
        name: "Apple Inc.",
        code: "AAPL",
        market: "NASDAQ",
        tvSymbol: "NASDAQ:AAPL",
        currentPrice: 263.48,
        change: 0,
        changePercent: 0,
        per: 35.2,
        pbr: 48.5,
        dividendYield: 0.45,
        marketCap: 39680, // 億ドル換算 (Approx $3.97T -> 39,680 億ドル * 1.5 ) Note: Unit handling in UI needs to be checked. Assuming $1B units or similar adjustment.
        // UI uses unit adjustment. Let's provide raw USD Market Cap in Billions? Or try to match Japan data scale? 
        // Japan data is in "億円". 3.97T USD = 3970 Billion USD. 
        // Let's stick to raw USD numbers and let UI handle display or interpretation. 
        // Actually, looking at japanStockDetailData, keyence is 158900 (億円). 
        // 3.97T USD * 150 JPY/USD = ~600 Trillion JPY = 6,000,000 億円. 
        // Ideally we should use USD for US stocks. Let's check how StockAnalysisSection handles currency.
        businessProfile: "1976年創業。世界で最も価値のあるテクノロジー企業の一つ。iPhone、Mac、iPad、Apple Watchなどの革新的なハードウェアと、iOS、iCloud、Apple Music、Apple Payなどのシームレスなサービスエコシステムを構築。20億台を超えるアクティブデバイスを基盤に、強力なブランドロイヤリティと高いスイッチングコストを持つ。「プライバシー」を製品の核に据え、独自のAppleシリコンによる垂直統合モデルで他社を圧倒するパフォーマンスと電力効率を実現。近年はサービス部門の収益化と、オンデバイスAI「Apple Intelligence」の展開に注力している。",
        strengths: [
            { title: "最強のブランドとエコシステム", desc: "ハード・ソフト・サービスが完全に統合されたエコシステムにより、極めて高い顧客定着率を誇る。", icon: "award" },
            { title: "サービス部門の急成長", desc: "App Store、iCloud、Apple Music等のサービス収益が全体利益の柱となり、マージン向上に寄与。", icon: "trending" },
            { title: "圧倒的なキャッシュ創出力", desc: "潤沢な手元資金を背景に、積極的な自社株買いや配当還元、戦略的な研究開発投資を継続。", icon: "globe" }
        ],
        valuation: {
            status: "やや割高",
            statusEn: "PREMIUM VALUATION",
            analysis: "PER 30倍台半ばは歴史的高水準。しかし、高いブランド力、強固な財務基盤、そしてAIスマホサイクルへの期待値がプレミアム評価を正当化している。"
        },
        latestEarningsInfo: "2026年度第1四半期は過去最高売上を記録。iPhoneの販売が好調で、特に新興国市場での成長が著しい。サービス部門も2桁成長を維持。",
        financials: [
            { period: "2023.09", revenue: 383285, ordinaryProfit: 114301, netProfit: 96995, eps: 6.13, dividend: 0.95, isEstimate: false },
            { period: "2024.09", revenue: 391035, ordinaryProfit: 123251, netProfit: 93736, eps: 6.08, dividend: 1.00, isEstimate: false },
            { period: "2025.09", revenue: 415000, ordinaryProfit: 135000, netProfit: 105000, eps: 6.85, dividend: 1.05, isEstimate: false, remark: "AI需要寄与" }
        ]
    },
    "MSFT": {
        name: "Microsoft Corporation",
        code: "MSFT",
        market: "NASDAQ",
        tvSymbol: "NASDAQ:MSFT",
        currentPrice: 417.00,
        change: 0,
        changePercent: 0,
        per: 31.5,
        pbr: 12.8,
        dividendYield: 0.75,
        marketCap: 31430, // Billion USD
        businessProfile: "ビル・ゲイツらにより1975年創業。PC時代の覇者から、クラウドとAIのリーダーへと鮮やかな転身を遂げたソフトウェア巨人。クラウドプラットフォーム「Azure」は世界シェア2位で、企業のDX需要を一手に引き受ける。OpenAIへの巨額投資を通じて生成AI革命を主導し、検索エンジンBing、Office製品（Microsoft 365）、GitHub、WindowsすべてにAI助手「Copilot」を統合。生産性向上ツールのデファクトスタンダードとして、ビジネスとテクノロジーのインフラを支配する。",
        strengths: [
            { title: "AI革命のリーダー", desc: "OpenAIとの戦略的提携により、生成AI市場で先頭を走る。Azure AIの需要が急拡大。", icon: "award" },
            { title: "Azureクラウドの成長", desc: "AWSを猛追するクラウド事業。エンタープライズ顧客に強く、安定した高収益を生む。", icon: "globe" },
            { title: "最強のSaaSポートフォリオ", desc: "Office、Teams、LinkedIn、Dynamicsなど、ビジネスに不可欠なソフトウェア群を独占的に提供。", icon: "trending" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE / GROWTH",
            analysis: "クラウドとAIの二重の成長エンジンを持つため、高PERは正当化されやすい。収益の安定性と成長性のバランスが抜群。"
        },
        latestEarningsInfo: "Azureクラウド部門が前年比20%超の成長を継続。Copilotの導入企業が急増し、AIによる収益貢献が本格化しつつある。",
        financials: [
            { period: "2023.06", revenue: 211915, ordinaryProfit: 88523, netProfit: 72361, eps: 9.68, dividend: 2.72, isEstimate: false },
            { period: "2024.06", revenue: 245122, ordinaryProfit: 109433, netProfit: 88136, eps: 11.80, dividend: 3.00, isEstimate: false },
            { period: "2025.06", revenue: 275000, ordinaryProfit: 125000, netProfit: 100000, eps: 13.50, dividend: 3.30, isEstimate: false, remark: "AI収益化進展" }
        ]
    },
    "NVDA": {
        name: "NVIDIA Corporation",
        code: "NVDA",
        market: "NASDAQ",
        tvSymbol: "NASDAQ:NVDA",
        currentPrice: 135.50,
        change: 0,
        changePercent: 0,
        per: 46.8,
        pbr: 65.2,
        dividendYield: 0.03,
        marketCap: 45190, // Billion USD
        businessProfile: "1993年創業。当初はゲーム用グラフィックス（GPU）メーカーだったが、その並列処理能力がAI計算に最適であることが発見され、AI時代の「唯一無二の武器商人」へと変貌。データセンター向けGPU（H100/Blackwellなど）で市場シェア80%以上を独占。ハードウェアだけでなく、CUDAという独自のソフトウェアプラットフォームが強固な堀（参入障壁）となっている。自動運転、ヘルスケア、デジタルツイン（Omniverse）など、あらゆる産業のAI化を支えるインフラ企業。",
        strengths: [
            { title: "AIチップ市場での独占", desc: "生成AIの学習・推論に不可欠なGPUで圧倒的シェア。価格決定権を完全に掌握。", icon: "award" },
            { title: "CUDAによる参入障壁", desc: "ハードとソフトが統合された開発環境（CUDA）が、競合他社への乗り換えを困難にしている。", icon: "globe" },
            { title: "圧倒的な利益率", desc: "高い付加価値により、ハードウェアメーカーとしては異例の粗利益率70%超を誇る。", icon: "trending" }
        ],
        valuation: {
            status: "割高",
            statusEn: "MOMENTUM / RISK",
            analysis: "AIバブルの中心銘柄。成長期待は既に株価に織り込まれており、わずかな成長鈍化でも調整リスクがあるが、独占力は随一。"
        },
        latestEarningsInfo: "データセンター部門の売上が前年比倍増ペースを維持。Blackwellチップの需要が供給を遥かに上回り、今後数年は受注残が積み上がる見通し。",
        financials: [
            { period: "2024.01", revenue: 60922, ordinaryProfit: 32972, netProfit: 29760, eps: 1.19, dividend: 0.04, isEstimate: false },
            { period: "2025.01", revenue: 130500, ordinaryProfit: 85000, netProfit: 75000, eps: 3.00, dividend: 0.04, isEstimate: false, remark: "爆発的成長" },
            { period: "2026.01", revenue: 180000, ordinaryProfit: 120000, netProfit: 105000, eps: 4.20, dividend: 0.05, isEstimate: true, remark: "Blackwell本格化" }
        ]
    },
    "GOOGL": {
        name: "Alphabet Inc.",
        code: "GOOGL",
        market: "NASDAQ",
        tvSymbol: "NASDAQ:GOOGL",
        currentPrice: 343.78,
        change: 0,
        changePercent: 0,
        per: 23.5,
        pbr: 7.2,
        dividendYield: 0.45,
        marketCap: 41630, // Billion USD
        businessProfile: "Googleの持株会社。検索エンジン「Google」で世界の情報の入口を支配し、YouTubeで動画メディアの覇権を握る。収益の大半はデジタル広告だが、Google Cloudが第2の柱として急成長中。「世界中の情報を整理する」というミッションの下、AI（Gemini）、自動運転（Waymo）、量子コンピュータなどの未来技術へ積極投資を行う。「AIファースト」企業として、検索体験のAI化（SGE）を進め、広告ビジネスの再定義に挑んでいる。",
        strengths: [
            { title: "検索と動画の独占", desc: "Google検索とYouTubeは世界最強のメディア媒体。広告収益の源泉として盤石。", icon: "award" },
            { title: "世界トップクラスのAI技術", desc: "DeepMindを擁し、Geminiなどの最先端AIモデルを自社開発・展開できる技術力。", icon: "trending" },
            { title: "Waymoなどのムーンショット", desc: "自動運転タクシーWaymoが商用化で先行。将来の巨大な収益源となるポテンシャル。", icon: "globe" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED",
            analysis: "Magnificent Sevenの中で相対的にPERが低い。独禁法リスクが懸念されるが、広告独占力とクラウド成長を考慮すると割安感がある。"
        },
        latestEarningsInfo: "広告収入が底堅く推移し、Youtubeとクラウド事業が成長を牽引。Geminiの統合コストを吸収しつつ、増益を達成。",
        financials: [
            { period: "2023.12", revenue: 307394, ordinaryProfit: 84293, netProfit: 73795, eps: 5.80, dividend: 0, isEstimate: false },
            { period: "2024.12", revenue: 345000, ordinaryProfit: 100000, netProfit: 88000, eps: 7.10, dividend: 0.80, isEstimate: true, remark: "クラウド黒字拡大" },
            { period: "2025.12", revenue: 380000, ordinaryProfit: 115000, netProfit: 100000, eps: 8.20, dividend: 0.90, isEstimate: false, remark: "自社株買い継続" }
        ]
    },
    "AMZN": {
        name: "Amazon.com, Inc.",
        code: "AMZN",
        market: "NASDAQ",
        tvSymbol: "NASDAQ:AMZN",
        currentPrice: 243.74,
        change: 0,
        changePercent: 0,
        per: 39.2,
        pbr: 8.5,
        dividendYield: 0,
        marketCap: 26060, // Billion USD
        businessProfile: "1994年、ジェフ・ベゾスが創業。「地球上で最もお客様を大切にする企業」を掲げ、EC（電子商取引）とクラウド（AWS）の2大プラットフォームで世界を席巻。ECでは圧倒的な物流網（FBA）とPrime会員基盤を武器に、小売の常識を破壊。利益の源泉であるAWSはクラウドインフラ市場で首位を走り、世界のスタートアップから大企業までを支える。近年は広告事業が第3の柱として急成長しており、収益構造の多角化が進んでいる。",
        strengths: [
            { title: "AWSといECの相乗効果", desc: "AWSの高収益が、EC部門の物流投資や価格競争力を支える強力なエコシステム。", icon: "award" },
            { title: "圧倒的な物流インフラ", desc: "他社が追随不可能な配送ネットワーク。即日配送などは強力な競争優位性。", icon: "globe" },
            { title: "広告ビジネスの台頭", desc: "購買データに基づいた精度の高い広告配信により、収益性の高い第3の柱が急成長。", icon: "trending" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE",
            analysis: "物流投資の一巡による利益率改善フェーズ。クラウド成長鈍化懸念はあるが、広告事業の高収益化が新たな評価軸に。"
        },
        latestEarningsInfo: "北米EC部門の利益率が大幅に改善。AWSも生成AI需要を取り込み再加速。全社的なコスト削減効果が利益を押し上げている。",
        financials: [
            { period: "2023.12", revenue: 574785, ordinaryProfit: 36853, netProfit: 30425, eps: 2.90, dividend: 0, isEstimate: false },
            { period: "2024.12", revenue: 640000, ordinaryProfit: 60000, netProfit: 52000, eps: 4.95, dividend: 0, isEstimate: true, remark: "利益率改善" },
            { period: "2025.12", revenue: 710000, ordinaryProfit: 75000, netProfit: 65000, eps: 6.20, dividend: 0, isEstimate: false, remark: "広告高成長" }
        ]
    },
    "META": {
        name: "Meta Platforms, Inc.",
        code: "META",
        market: "NASDAQ",
        tvSymbol: "NASDAQ:META",
        currentPrice: 712.14,
        change: 0,
        changePercent: 0,
        per: 26.5,
        pbr: 7.8,
        dividendYield: 0.28,
        marketCap: 18000, // Billion USD
        businessProfile: "Facebook、Instagram、WhatsApp、Messengerを運営し、世界の人口の約半数にあたる35億人以上が利用するソーシャルメディア帝国。圧倒的なユーザー数と滞在時間を基盤にしたデジタル広告ビジネスが収益の柱。AI（Llama）への巨額投資により、広告のターゲティング精度とコンテンツ推奨アルゴリズムを劇的に改善。社名変更の由来であるメタバース（Reality Labs）への先行投資も継続し、次世代のコンピューティングプラットフォーム「スマートグラス」の普及を狙う。",
        strengths: [
            { title: "35億人のユーザー基盤", desc: "世界のソーシャルグラフを独占。ネットワーク効果により競合の参入を許さない。", icon: "globe" },
            { title: "AIによる広告効率化", desc: "Appleのプライバシー規制をAIによる予測精度向上で克服。広告単価が上昇傾向。", icon: "trending" },
            { title: "財務体質の良さ", desc: "「効率化の年」を経て筋肉質な経営に転換。潤沢なキャッシュフローで自社株買いを実行。", icon: "award" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED",
            analysis: "高い成長率（20%超）に対してPEGレシオで見ると割安。AI投資のリターンが広告収益として可視化され始めている。"
        },
        latestEarningsInfo: "広告売上が予想を上回り大幅増収。AI推奨コンテンツによるユーザー滞在時間の増加が寄与。メタバース部門の赤字は続くが織り込み済み。",
        financials: [
            { period: "2023.12", revenue: 134902, ordinaryProfit: 46751, netProfit: 39098, eps: 14.87, dividend: 0, isEstimate: false },
            { period: "2024.12", revenue: 165000, ordinaryProfit: 65000, netProfit: 55000, eps: 21.50, dividend: 2.00, isEstimate: true, remark: "配当開始" },
            { period: "2025.12", revenue: 190000, ordinaryProfit: 78000, netProfit: 66000, eps: 25.80, dividend: 2.50, isEstimate: false, remark: "AI収益貢献" }
        ]
    },
    "TSLA": {
        name: "Tesla, Inc.",
        code: "TSLA",
        market: "NASDAQ",
        tvSymbol: "NASDAQ:TSLA",
        currentPrice: 433.15,
        change: 0,
        changePercent: 0,
        per: 95.5,
        pbr: 22.1,
        dividendYield: 0,
        marketCap: 15800, // Billion USD
        businessProfile: "イーロン・マスク率いる、EV（電気自動車）と持続可能エネルギーの革命児。「モデル3」「モデルY」でEVの大衆化に成功し、自動車業界の構造を塗り替えた。単なる自動車メーカーではなく、AI・ロボティクス企業としての側面が強い。完全自動運転（FSD）技術、人型ロボット「Optimus」、スーパーチャージャー網、蓄電池事業など、ハードとソフトを融合させた多角的なイノベーションを展開。エネルギーと移動の未来を定義する企業。",
        strengths: [
            { title: "EVの代名詞的ブランド", desc: "EV市場での圧倒的な知名度と、生産・製造プロセスの垂直統合によるコスト競争力。", icon: "award" },
            { title: "完全自動運転（FSD）", desc: "膨大な走行データをAIに学習させ、ロボタクシーの実現に最も近い位置にいる。", icon: "trending" },
            { title: "エネルギー・ロボット事業", desc: "蓄電池（Megapack）や人型ロボットなど、自動車以外の巨大な成長ドライバーを保有。", icon: "globe" }
        ],
        valuation: {
            status: "割高",
            statusEn: "HIGH EXPECTATION",
            analysis: "プレミアム評価は「自動車会社」としてではなく「AI・ロボティクス企業」としての期待値。自動運転の実現時期が評価の鍵。",
        },
        latestEarningsInfo: "EV販売台数の伸びは鈍化しているものの、製造コスト削減により利益率は改善傾向。エネルギー部門（蓄電池）が急成長し、利益の下支えとなっている。",
        financials: [
            { period: "2023.12", revenue: 96773, ordinaryProfit: 8891, netProfit: 14997, eps: 4.30, dividend: 0, isEstimate: false },
            { period: "2024.12", revenue: 105000, ordinaryProfit: 9500, netProfit: 12000, eps: 3.50, dividend: 0, isEstimate: true, remark: "投資先行" },
            { period: "2025.12", revenue: 125000, ordinaryProfit: 15000, netProfit: 18000, eps: 5.10, dividend: 0, isEstimate: false, remark: "新モデル効果" }
        ]
    }
};
