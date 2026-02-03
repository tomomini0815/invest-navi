import { TrendingUp, BarChart2, Shield, Globe, Award, Activity, Wallet } from "lucide-react";

export interface StockFinancial {
    period: string;
    revenue: number;
    ordinaryProfit: number;
    netProfit: number;
    eps: number;
    dividend: number;
    isEstimate: boolean;
    remark?: string;
}

export interface StockDetailData {
    name: string;
    code: string;
    market: string;
    tvSymbol: string;
    currentPrice: number;
    change: number;
    changePercent: number;
    per: number;
    pbr: number;
    dividendYield: number;
    marketCap: number; // 億円
    businessProfile?: string; // 事業内容・プロフィール
    strengths: {
        title: string;
        desc: string;
        icon: "award" | "globe" | "trending";
    }[];
    valuation: {
        status: "割安" | "やや割安" | "割安（適正）" | "適正" | "やや割高" | "割高";
        statusEn: string;
        analysis: string;
    };
    latestEarningsInfo?: string;
    financials: StockFinancial[];
}

export const japanStockDetailData: Record<string, StockDetailData> = {
    "6861": {
        name: "キーエンス",
        code: "6861",
        market: "東証P",
        tvSymbol: "TSE:6861",
        currentPrice: 65420.0,
        change: 1240.0,
        changePercent: 1.93,
        per: 38.5,
        pbr: 5.8,
        dividendYield: 0.46,
        marketCap: 158900,
        businessProfile: "1974年創業。ファクトリー・オートメーション（FA）用センサ、測定器、画像処理機器等の開発・販売を手掛ける世界屈指の高収益企業。生産設備を自社で持たない「ファブレス経営」と、代理店を介さない「直販体制」を融合。顧客の潜在的な課題を先回りして解決するコンサルティング営業に強みを持つ。新製品の約7割が「世界初」または「業界初」という圧倒的な開発力を誇り、50%を超える異次元の営業利益率を維持。製造業の自動化・省人化ニーズが加速する中で、グローバルに高付加価値ソリューションを提供し続けている。",
        strengths: [
            { title: "驚異的な営業利益率", desc: "50%を超える異次元の利益率を維持。高付加価値な製品開発力が源泉。", icon: "award" },
            { title: "世界初・業界初の開発力", desc: "新製品の約7割が「世界初」または「業界初」。圧倒的な技術的優位性。", icon: "globe" },
            { title: "直販体制によるソリューション提供", desc: "代理店を介さない直販により、顧客の課題を直接把握し即座に解決。", icon: "trending" }
        ],
        valuation: {
            status: "やや割高",
            statusEn: "PREMIUM VALUATION",
            analysis: "現在のPER 38.5倍は、同社の過去5年間の平均PER（約32〜36倍）と比較してやや高い水準にあります。営業利益率50%超という圧倒的な効率性とキャッシュ創出力が常にプレミアム評価の対象となっており、完全な「割安」圏まで下落することは稀です。"
        },
        latestEarningsInfo: "2025年3月期第3四半期累計の営業利益は前年同期比12%増と好調。FAセンサーの需要がEV・半導体向けに底堅く推移し、円安効果も寄与。",
        financials: [
            { period: "2022.03", revenue: 6269, ordinaryProfit: 3525, netProfit: 2536, eps: 1045.2, dividend: 200, isEstimate: false, remark: "高収益維持" },
            { period: "2023.03", revenue: 8169, ordinaryProfit: 4872, netProfit: 3522, eps: 1452.1, dividend: 300, isEstimate: false, remark: "過去最高" },
            { period: "2024.03", revenue: 9601, ordinaryProfit: 5500, netProfit: 3700, eps: 1526, dividend: 800, isEstimate: false },
            { period: "2025.03", revenue: 10591, ordinaryProfit: 5498, netProfit: 3987, eps: 1645.0, dividend: 1000, isEstimate: false, remark: "売上1兆円突破" }
        ]
    },
    "7203": {
        name: "トヨタ自動車",
        code: "7203",
        market: "東証P",
        tvSymbol: "TSE:7203",
        currentPrice: 2680.5,
        change: 45.0,
        changePercent: 1.71,
        per: 9.8,
        pbr: 1.1,
        dividendYield: 2.9,
        marketCap: 412000,
        businessProfile: "1937年設立。世界トップクラスの販売台数を誇る日本最大の自動車メーカー。1997年に世界初の量産ハイブリッド車（HEV）『プリウス』を発売して以来、電動化技術で世界をリード。現在は「モビリティ・カンパニー」への変革を掲げ、BEV（電気自動車）、FCEV（水素燃料電池車）、HEVを含む「全方位戦略」を展開。独自の『トヨタ生産方式（TPS）』による圧倒的な生産効率と高品質の両立に加え、強固な販売網と財務基盤を背景に、ソフトウェア定義車両（SDV）やウーブン・シティといった次世代モビリティインフラの創造に挑む。",
        strengths: [
            { title: "世界トップの電動化技術", desc: "ハイブリッド車（HEV）で世界をリード。全方位戦略で各国の規制に対応。", icon: "globe" },
            { title: "圧倒的な生産効率", desc: "「トヨタ生産方式（TPS）」による徹底したムダの排除と高品質の両立。", icon: "award" },
            { title: "強固な財務基盤", desc: "莫大な手元資金を背景に、次世代モビリティ（BEV・水素）へ巨額投資。", icon: "trending" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE",
            analysis: "PBR 1.1倍、PER 9.8倍は製造業として標準的。為替感応度が高く円高リスクはあるものの、強固な利益構造と株主還元姿勢が支えとなっています。"
        },
        latestEarningsInfo: "今期は為替影響や認証問題による生産停止が一時的に響くも、ハイブリッド車の世界的な需要増が利益を下支え。通期利益予想は上方修正へ。",
        financials: [
            { period: "2023.03", revenue: 371542, ordinaryProfit: 36687, netProfit: 24513, eps: 179.6, dividend: 60, isEstimate: false, remark: "過去最高売上" },
            { period: "2024.03", revenue: 450953, ordinaryProfit: 53529, netProfit: 49449, eps: 365.1, dividend: 75, isEstimate: false, remark: "過去最高益" },
            { period: "2025.03", revenue: 480367, ordinaryProfit: 47955, netProfit: 47650, eps: 342.3, dividend: 90, isEstimate: false, remark: "高水準維持" }
        ]
    },
    "6758": {
        name: "ソニーグループ",
        code: "6758",
        market: "東証P",
        tvSymbol: "TSE:6758",
        currentPrice: 2945.0,
        change: 12.0,
        changePercent: 0.41,
        per: 16.5,
        pbr: 1.9,
        dividendYield: 0.85,
        marketCap: 178000,
        businessProfile: "1946年創業。日本を代表する総合電機メーカーから、ゲーム、音楽、映画のエンターテインメント、およびイメージセンサーを中心とした半導体、金融を統合した持株会社へ。PlayStationを軸としたゲーム事業は世界最大のプラットフォームを構築。音楽・映画分野でも世界的IPを多数保有し、コンテンツ経済圏を確立。また、スマホ向けCMOSイメージセンサーで世界シェア首位を独走し、車載・産機向けへも展開。エレクトロニクス由来の技術力と多様なエンタメ資産を融合させ、人々の感性に訴える『クリエイティビティとテクノロジーの力で、世界を感動で満たす』をパーパスに掲げる。",
        strengths: [
            { title: "エンタメ経済圏の確立", desc: "ゲーム、音楽、映画の3本柱で世界的なIP（知的財産）ビジネスを展開。", icon: "globe" },
            { title: "イメージセンサ世界シェア1位", desc: "スマホ向け高付加価値センサで圧倒的シェア。車載向けも成長中。", icon: "award" },
            { title: "金融サービスとのシナジー", desc: "ソニー生命を中心とした安定収益源。グループ全体の資金効率に寄与。", icon: "trending" }
        ],
        valuation: {
            status: "やや割安",
            statusEn: "SLIGHTLY UNDERVALUED",
            analysis: "グローバルな総合エンタメ企業としての期待値に対し、PER 16倍台は成長余力を考慮すると魅力的。センサー事業のリバウンドが鍵となります。"
        },
        latestEarningsInfo: "イメージセンサー事業がスマホ市場の回復で底打ち。ゲーム事業もPS5の普及拡大とソフト販売好調により利益率が改善傾向。",
        financials: [
            { period: "2023.03", revenue: 115398, ordinaryProfit: 12082, netProfit: 9371, eps: 754.7, dividend: 265, isEstimate: false },
            { period: "2024.03", revenue: 130208, ordinaryProfit: 12082, netProfit: 9706, eps: 785.4, dividend: 300, isEstimate: false },
            { period: "2025.03", revenue: 129571, ordinaryProfit: 14072, netProfit: 11416, eps: 923.4, dividend: 350, isEstimate: false, remark: "過去最高益" }
        ]
    },
    "9984": {
        name: "ソフトバンクグループ",
        code: "9984",
        market: "東証P",
        tvSymbol: "TSE:9984",
        currentPrice: 8970.0,
        change: -110.0,
        changePercent: -1.21,
        per: 24.5,
        pbr: 0.85,
        dividendYield: 0.49,
        marketCap: 132000,
        businessProfile: "1981年創業。孫正義氏率いる、世界最大級のテクノロジー投資会社。傘下に英半導体設計大手Armを擁し、AI革命を先導する「AI企業のハブ」を自認。ソフトバンク・ビジョン・ファンド（SVF）を通じ、世界中のAI先進ベンチャーへ投資。さらにOpenAIやNVIDIAなど戦略的パートナーとの連携を強化中。国内通信事業のソフトバンク(株)をキャッシュカウとしつつ、保有資産価値（NAV）の増大と株主還元を重視。通信、インターネット、半導体、AIの全レイヤーで情報革命を推進する、グローバルな資本家・事業家集団。",
        strengths: [
            { title: "圧倒的なAI投資ポートフォリオ", desc: "Armを中心に、世界中のAI先進企業へ投資。テック業界のハブ。", icon: "globe" },
            { title: "保有資産価値（NAV）の大きさ", desc: "株価はNAVに対して大幅なディスカウント状態。含み益が実質価値。", icon: "trending" },
            { title: "Armを通じたエコシステム支配", desc: "スマホ、PC、データセンターのCPUアーキテクチャで覇権を握る。", icon: "award" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED (BY NAV)",
            analysis: "保有資産価値に対して株価が低く、PBR 0.85倍は極めて割安。ただし、投資先の評価変動リスクが大きく、ハイリスク・ハイリターンの性格が強い。"
        },
        latestEarningsInfo: "投資先の評価益により最終黒字を維持。Armのナスダック上場後の株価上昇が純資産価値（NAV）を大きく押し上げている。AI関連投資を再加速中。",
        financials: [
            { period: "2023.03", revenue: 65704, ordinaryProfit: -4647, netProfit: -9701, eps: -675, dividend: 44, isEstimate: false, remark: "大幅赤字" },
            { period: "2024.03", revenue: 67565, ordinaryProfit: -2900, netProfit: -2276, eps: -155, dividend: 44, isEstimate: false, remark: "黒字転換" },
            { period: "2025.03", revenue: 72437, ordinaryProfit: 17047, netProfit: 11533, eps: 792.1, dividend: 44, isEstimate: false, remark: "黒字定着・大幅増益" }
        ]
    },
    "7974": {
        name: "任天堂",
        code: "7974",
        market: "東証P",
        tvSymbol: "TSE:7974",
        currentPrice: 7850.0,
        change: 65.0,
        changePercent: 0.83,
        per: 21.2,
        pbr: 3.5,
        dividendYield: 2.4,
        marketCap: 95000,
        businessProfile: "1889年に花札製造からスタートした、京都発の世界的なエンターテインメント企業。娯楽のプロとして、独自の体験を提供するゲーム機（ハード）と、マリオ、ポケモン、ゼルダ等の自社IPソフトを融合させた『ハード・ソフト一体型ビジネス』で独自進化を遂げる。現在は「ゲーム人口の拡大」から「任天堂IPに触れる人口の拡大」へ戦略を深化。ユニバーサル・スタジオ・ジャパン（USJ）等でのテーマパーク展開や映画製作を通じて、世界中で愛されるキャラクター資産の収益化とブランド強化をグローバルに加速させている。",
        strengths: [
            { title: "唯一無二のキャラクター資産", desc: "マリオ、ポケモン、ゼルダなど、世代を超えて愛される強力なIP。", icon: "award" },
            { title: "ハード・ソフト一体の開発力", desc: "娯楽のプロとして、独自の体験を提供するデバイスとソフトを創出。", icon: "globe" },
            { title: "莫大なキャッシュと高い自己資本", desc: "無借金経営に近い財務の安全性。次世代機開発への十分な余力。", icon: "trending" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE",
            analysis: "次世代機（Switch後継機）の発表待ちの状態。PER 21倍は期待感を一定程度織り込んでおり、新ハードのスペックや発売時期次第で評価が分かれる。"
        },
        financials: [
            { period: "2023.03", revenue: 16016, ordinaryProfit: 5043, netProfit: 4327, eps: 365, dividend: 203, isEstimate: false },
            { period: "2024.03", revenue: 16718, ordinaryProfit: 5289, netProfit: 4906, eps: 421, dividend: 211, isEstimate: false },
            { period: "2025.03", revenue: 11649, ordinaryProfit: 2825, netProfit: 2788, eps: 240.2, dividend: 129, isEstimate: false, remark: "Switch次世代機待ち" }
        ]
    },
    "1942": {
        name: "関電工",
        code: "1942",
        market: "東証P",
        tvSymbol: "TSE:1942",
        currentPrice: 5759.0,
        change: 85.0,
        changePercent: 1.5,
        per: 24.6,
        pbr: 2.89,
        dividendYield: 2.8,
        marketCap: 3800,
        businessProfile: "1944年、関東配電（現・東京電力）の全額出資により設立。東京電力ホールディングスを筆頭株主とする日本最大級の総合設備企業。電気工事、給排水、空調、情報通信まで多岐にわたるインフラエンジニアリングの実績を持つ。現在は脱炭素社会に向けた送電網の更新や、膨大な電力消費を要するAIデータセンター建設需要を主導。東電グループ向け案件に加え、一般建築や再生エネルギー関連の受注も拡大しており、国内電力インフラの維持・高度化において欠かせない存在。",
        strengths: [
            { title: "データセンター建設の急増", desc: "電力設備工事の技術力を背景に、DC建設需要を独占的に取り込み。", icon: "trending" },
            { title: "再エネ・送電網の更新需要", desc: "脱炭素社会に向けた送電インフラの整備、更新工事が長期成長を支える。", icon: "globe" },
            { title: "受注残高の積み上がり", desc: "豊富な手持ち工事により、将来の収益見通しが極めて高い。", icon: "award" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED",
            analysis: "PBR 1倍割れ、PER 12倍台はインフラ建設株として割安圏。DC需要という強力なカタリストがある中で、再評価の余地が大きい。"
        },
        financials: [
            { period: "2023.03", revenue: 5313, ordinaryProfit: 325, netProfit: 212, eps: 104.5, dividend: 32, isEstimate: false },
            { period: "2024.03", revenue: 5824, ordinaryProfit: 412, netProfit: 285, eps: 140.2, dividend: 45, isEstimate: false },
            { period: "2025.03", revenue: 6200, ordinaryProfit: 450, netProfit: 310, eps: 152.0, dividend: 52, isEstimate: false },
            { period: "2026.03", revenue: 7350, ordinaryProfit: 800, netProfit: 610, eps: 300.0, dividend: 120, isEstimate: true, remark: "大幅増益・増配" }
        ]
    },
    "9983": {
        name: "ファーストリテイリング",
        code: "9983",
        market: "東証P",
        tvSymbol: "TSE:9983",
        currentPrice: 48500.0,
        change: 850.0,
        changePercent: 1.78,
        per: 42.5,
        pbr: 6.2,
        dividendYield: 1.34,
        marketCap: 118000,
        businessProfile: "山口県の一衣料品店から成長し、現在では世界第3位のアパレルグループへと飛躍。主力ブランド『ユニクロ』を中心に『ジーユー』『セオリー』等を展開。素材開発（ヒートテック等）からデザイン、製造、物流、販売までを一貫して行うSPA（製造小売業）モデルに定着。現在は「情報製造小売業」へ進化し、RFID等のデジタル技術で在庫・物流を極限まで最適化。欧米市場でのブランド確立とアジア全域への積極出店を加速させ、日本発のグローバルブランドとして、世界一のアパレル企業を目指して急成長を続けている。",
        strengths: [
            { title: "世界トップクラスのSPAモデル", desc: "企画から製造、販売まで一貫して行うことで、高品質・低価格なベーシック衣料を実現。", icon: "award" },
            { title: "グローバルな成長加速", desc: "欧米市場でのブランド確立と、アジア各地での店舗網拡大が利益成長を強力に牽引。", icon: "globe" },
            { title: "強固なデジタル・サプライチェーン", desc: "RFID活用や自動倉庫により、在庫管理と物流効率を極限まで最適化。", icon: "trending" }
        ],
        valuation: {
            status: "割高",
            statusEn: "PREMIUM / GROWTH",
            analysis: "世界的なブランド力と成長性を背景に、常に高いPERで推移。8月期決算に向けた上方修正期待も強く、プレミアム評価が定着している。"
        },
        latestEarningsInfo: "欧米・アジアでの好調な販売を受け、通期利益予想を上方修正。特に北米事業の収益性が飛躍的に向上しており、グローバルブランドとしての地位を確立。",
        financials: [
            { period: "2023.08", revenue: 27665, ordinaryProfit: 4135, netProfit: 2962, eps: 965.4, dividend: 290, isEstimate: false },
            { period: "2024.08", revenue: 31038, ordinaryProfit: 5053, netProfit: 3719, eps: 1212.0, dividend: 450, isEstimate: false },
            { period: "2025.08", revenue: 34000, ordinaryProfit: 6000, netProfit: 4300, eps: 1400.0, dividend: 520, isEstimate: false, remark: "過去最高益予想" },
            { period: "2026.08", revenue: 38000, ordinaryProfit: 6500, netProfit: 4500, eps: 1460.0, dividend: 540, isEstimate: true, remark: "上方修正（最新）" }
        ]
    },
    "8306": {
        name: "三菱UFJ",
        code: "8306",
        market: "東証P",
        tvSymbol: "TSE:8306",
        currentPrice: 1542.0,
        change: 15.0,
        changePercent: 0.98,
        per: 12.4,
        pbr: 0.95,
        dividendYield: 3.2,
        marketCap: 185000,
        businessProfile: "1919年創立の三菱銀行を祖とする、日本最大の民間総合金融グループ。傘下に三菱UFJ銀行、三菱UFJ信託銀行、三菱UFJモルガン・スタンレー証券、アコム等を擁する。米モルガン・スタンレーとの戦略的提携や、タイのアユタヤ銀行（クルンシィ）買収等の海外展開により、世界屈指のユニバーサル・バンク体制を構築。マクロ経済環境（金利上昇）の恩恵を最も受ける立場にありつつ、信託、証券、資産運用を組み合わせた非金利収益の強化と、DX投資による生産性向上を強力に推進中。",
        strengths: [
            { title: "圧倒的な収益力と資本基盤", desc: "邦銀随一の業務純益を誇り、高い自己資本比率を背景に積極的な株主還元を展開。", icon: "award" },
            { title: "グローバルな事業展開", desc: "米国やアジア市場での存在感。海外収益比率が高く、金利上昇局面での恩恵が大きい。", icon: "globe" },
            { title: "デジタルと非金融の強化", desc: "DX投資と非金融分野（アセットマネジメント等）への注力により、収益源を多角化。", icon: "trending" }
        ],
        valuation: {
            status: "割安（適正）",
            statusEn: "UNDERVALUED / PBR-IMPROVEMENT",
            analysis: "PBR 1倍割れが続く中、累進配当と自社株買いによる還元強化を継続。国内金利の上昇シナリオが強力な支援材料。"
        },
        financials: [
            { period: "2023.03", revenue: 92830, ordinaryProfit: 16143, netProfit: 11162, eps: 89.2, dividend: 32, isEstimate: false },
            { period: "2024.03", revenue: 104243, ordinaryProfit: 20043, netProfit: 14907, eps: 125.4, dividend: 41, isEstimate: false },
            { period: "2025.03", revenue: 110000, ordinaryProfit: 21500, netProfit: 16000, eps: 135.0, dividend: 50, isEstimate: false },
            { period: "2026.03", revenue: 120000, ordinaryProfit: 25000, netProfit: 17500, eps: 154.0, dividend: 64, isEstimate: true, remark: "上方修正・増配" }
        ]
    },
    "8035": {
        name: "東京エレクトロン",
        code: "8035",
        market: "東証P",
        tvSymbol: "TSE:8035",
        currentPrice: 24530.0,
        change: 420.0,
        changePercent: 1.74,
        per: 23.5,
        pbr: 5.8,
        dividendYield: 2.1,
        marketCap: 115000,
        businessProfile: "1963年創業。半導体製造装置で世界4強の一角を占める、日本最大の半導体製造装置メーカー。半導体製造の前工程に不可欠なコータ・デベロッパ（感光材塗布・現像装置）で世界シェア約9割。その他、エッチング装置、成膜装置、洗浄装置等でも高いシェアを誇る。売上の約9割が海外。先端半導体（EUV等）や生成AI向けHBM製造装置の開発に巨額の研究開発費を投入。独自の開発・製造・サービスの連携体制を武器に、デジタル化・グリーン化が進む世界の半導体サプライチェーンを根底から支え、高収益を維持している。",
        strengths: [
            { title: "世界シェア首位級の製品軍", desc: "コータ・デベロッパなどで圧倒的。次世代プロセスのEUV露光対応装置も強化。", icon: "award" },
            { title: "高い研究開発投資と技術力", desc: "将来の半導体微細化を見据えた先行投資。顧客との共同開発を通じた密な連携。", icon: "trending" },
            { title: "堅実なキャッシュ創出能力", desc: "高い営業利益率を維持し、安定したキャッシュフローを創出。高いDOEを目標とした還元。", icon: "globe" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE / GROWTH",
            analysis: "生成AI向け装置の出荷が好調。PER 20倍台は過去のサイクル平均と比較して適正範囲。25年度の市況回復を織り込む局面。"
        },
        latestEarningsInfo: "生成AI関連の投資活発化により、先端半導体向けエッチング装置等の引き合いが急増。次世代プロセスの受注も好調で、来期は過去最高益を更新する勢い。",
        financials: [
            { period: "2023.03", revenue: 22090, ordinaryProfit: 6253, netProfit: 4715, eps: 335.2, dividend: 285, isEstimate: false, remark: "過去最高" },
            { period: "2024.03", revenue: 18305, ordinaryProfit: 4562, netProfit: 3640, eps: 258.4, dividend: 250, isEstimate: false, remark: "微減" },
            { period: "2025.03", revenue: 22000, ordinaryProfit: 6000, netProfit: 4500, eps: 320.0, dividend: 450, isEstimate: false },
            { period: "2026.03", revenue: 24000, ordinaryProfit: 6500, netProfit: 4800, eps: 345.0, dividend: 520, isEstimate: true, remark: "上方修正" }
        ]
    },
    "9432": {
        name: "NTT",
        code: "9432",
        market: "東証P",
        tvSymbol: "TSE:9432",
        currentPrice: 172.5,
        change: 0.5,
        changePercent: 0.29,
        per: 11.8,
        pbr: 1.6,
        dividendYield: 3.1,
        marketCap: 155000,
        businessProfile: "1952年設立。日本最大の通信事業者グループ。持株会社体制の下、NTTドコモ、NTT東日本・西日本、NTTデータ等を擁する世界的通信大企業。固定電話からモバイル、データセンター、システム統合までを網羅。現在は電力消費を劇的に抑える次世代光技術『IOWN（アイオン）』の開発を主導し、ポスト5G/6G時代の国際標準化とデータセンターの高度化を目指す。経済安全保障上の重要インフラを担う公共性と、世界初の光電融合技術による成長性を併せ持つ「デジタルの根幹」を支える国策的企業。",
        strengths: [
            { title: "圧倒的な顧客基盤とインフラ", desc: "国内最大の契約者数を有し、光回線網などの重要インフラを独占的に保有。", icon: "globe" },
            { title: "次世代光技術IOWN", desc: "低消費電力・大容量・低遅延の次世代通信基盤で世界のデファクトを狙う。", icon: "award" },
            { title: "安定した配当と自己株買い", desc: "累進配当を掲げ、強力なキャッシュフローを背景に機動的な自社株買いを継続。", icon: "trending" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED",
            analysis: "PER 11倍、配当利回り3%超は、ディフェンシブ株として非常に魅力的。IOWNの実用化期待が長期的なカタリスト。"
        },
        financials: [
            { period: "2023.03", revenue: 131362, ordinaryProfit: 18290, netProfit: 12131, eps: 14.2, dividend: 4.8, isEstimate: false },
            { period: "2024.03", revenue: 133746, ordinaryProfit: 17621, netProfit: 12487, eps: 14.5, dividend: 5.1, isEstimate: false },
            { period: "2025.03", revenue: 135000, ordinaryProfit: 18000, netProfit: 12600, eps: 14.8, dividend: 5.2, isEstimate: false },
            { period: "2026.03", revenue: 137000, ordinaryProfit: 18500, netProfit: 13000, eps: 15.2, dividend: 5.4, isEstimate: true }
        ]
    },
    "8316": {
        name: "三井住友FG",
        code: "8316",
        market: "東証P",
        tvSymbol: "TSE:8316",
        currentPrice: 3245.0,
        change: 28.0,
        changePercent: 0.87,
        per: 12.8,
        pbr: 0.92,
        dividendYield: 3.4,
        marketCap: 125000,
        businessProfile: "2002年に住友銀行とさくら銀行の合併により誕生した三井住友銀行を中核とする、日本3大メガバンクの一つ。グループ全体での「スピード」と「効率性」を重視した経営に定評。SMBC日興証券、三井住友カード等との連携により、リテールからホールセールまで強固な顧客基盤を保有。現在は個人向け総合金融サービス『Olive』を軸としたデジタル戦略を加速させ、銀行・証券・カードのシームレスな体験を提供。アジア市場でのマルチフランチャイズ戦略拡大や、米ジェフリーズとの提携を通じた海外証券ビジネスの高度化にも注力している。",
        strengths: [
            { title: "業界トップの収益効率", desc: "メガバンクの中で最も経費率が低く、利益率が高い、筋肉質な経営体質。", icon: "award" },
            { title: "OliveによるDX戦略", desc: "銀行・カード・証券を統合したプラットフォームで、若年層を含むリテール層を囲い込み。", icon: "trending" },
            { title: "積極的な株主還元方針", desc: "累進配当の導入と、余剰資本の自社株買いへの活用。PBR 1倍回復へのコミットが強い。", icon: "globe" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED / PBR-IMPROVEMENT",
            analysis: "PBR 1倍割れの解消を経営目標に掲げ、増配と自社株買いをセットで実施。金融政策の変化が最大のプラス要因。"
        },
        financials: [
            { period: "2023.03", revenue: 61421, ordinaryProfit: 11843, netProfit: 8058, eps: 215.4, dividend: 80, isEstimate: false },
            { period: "2024.03", revenue: 78563, ordinaryProfit: 13421, netProfit: 9653, eps: 265.2, dividend: 95, isEstimate: false },
            { period: "2025.03", revenue: 85000, ordinaryProfit: 15000, netProfit: 10600, eps: 310.0, dividend: 110, isEstimate: false },
            { period: "2026.03", revenue: 95000, ordinaryProfit: 17000, netProfit: 12000, eps: 350.0, dividend: 135, isEstimate: true, remark: "過去最高益（修正）" }
        ]
    },
    "6501": {
        name: "日立製作所",
        code: "6501",
        market: "東証P",
        tvSymbol: "TSE:6501",
        currentPrice: 4235.0,
        change: 65.0,
        changePercent: 1.56,
        per: 21.4,
        pbr: 2.85,
        dividendYield: 1.8,
        marketCap: 195000,
        businessProfile: "1910年創業。日本最大の総合電機・重電メーカーから、IT（Lumada）、グリーンエネルギー、モビリティ、インダストリーの4分野を核とする社会イノベーション事業の世界的リーダーへ転換。かつてのコングロマリット路線を脱却し、ABBの送電事業買収や日立ハイテクの完全子会社化等の大規模な事業再編を完了。強みであるOT（制御技術）とIT、プロダクトを融合させた独自の『Lumada』プラットフォームにより、製造・インフラ・金融等、あらゆる業界のDXと脱炭素化をグローバルに支援する。データセンターの高度化や系統用蓄電池等、生成AI時代のインフラ需要も取り込む。",
        strengths: [
            { title: "LumadaによるDX支援", desc: "ITとOT（制御技術）の融合。膨大なデータを活用した高付加価値なサービス事業が急成長。", icon: "trending" },
            { title: "事業再編の先行事例", desc: "上場子会社の完全子会社化や非中核事業の売却を完了。高収益な事業ポートフォリオを構築。", icon: "award" },
            { title: "グローバルのインフラ需要", desc: "ABBの送電事業買収などにより、世界の電力インフラ市場で強力な競争力を保有。", icon: "globe" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE / RE-RATING",
            analysis: "コングロマリット・プレミアムへの移行段階。Lumadaの成長が続く限り、PER 20倍台の評価が正当化される。"
        },
        financials: [
            { period: "2023.03", revenue: 108811, ordinaryProfit: 8192, netProfit: 6491, eps: 212.4, dividend: 70, isEstimate: false },
            { period: "2024.03", revenue: 97287, ordinaryProfit: 7123, netProfit: 5899, eps: 195.2, dividend: 80, isEstimate: false },
            { period: "2025.03", revenue: 102000, ordinaryProfit: 8500, netProfit: 6200, eps: 215.0, dividend: 90, isEstimate: false },
            { period: "2026.03", revenue: 110000, ordinaryProfit: 9500, netProfit: 7200, eps: 250.0, dividend: 105, isEstimate: true, remark: "上方修正" }
        ]
    },
    "8001": {
        name: "伊藤忠商事",
        code: "8001",
        market: "東証P",
        tvSymbol: "TSE:8001",
        currentPrice: 7850.0,
        change: 120.0,
        changePercent: 1.55,
        per: 13.8,
        pbr: 1.85,
        dividendYield: 2.5,
        marketCap: 115000,
        businessProfile: "1858年創業。繊維、食品、住生活等の「非資源」分野で独走する日本を代表する総合商社。かつての「資源への依存」から脱却し、景気変動に左右されにくい安定した収益構造を構築。傘下にファミリーマート、デサント、エドウィン等を持ち、川下（小売・消費者接点）に強いのが最大の特徴。SDGsや環境・社会・ガバナンス（ESG）を重視した経営に加え、現場主義を徹底。データ活用によるサプライチェーンの高度化や、次世代の食文化・ライフスタイル提案を通じて、川上から川下までを一貫して繋ぐ『生活消費分野の盟主』を目指している。",
        strengths: [
            { title: "非資源ナンバーワンの収益力", desc: "資源価格に左右されにくい安定した利益構造。生活消費分野での圧倒的なプレゼンス。", icon: "award" },
            { title: "ファミリーマートとのシナジー", desc: "リテール拠点を核にしたDX、物流、金融の融合。消費者接点を活かした事業展開。", icon: "trending" },
            { title: "徹底した現場主義（三方よし）", desc: "効率重視の経営と、厳格な投資規律。高い株主還元意識（累進配当の先駆け）。", icon: "globe" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE / QUALITY",
            analysis: "商社株の中で最も高いPBRを維持。安定したROEと配当成長が評価されており、下押し局面は限定的。"
        },
        financials: [
            { period: "2023.03", revenue: 139457, ordinaryProfit: 11843, netProfit: 8009, eps: 545.2, dividend: 140, isEstimate: false },
            { period: "2024.03", revenue: 142358, ordinaryProfit: 12421, netProfit: 8017, eps: 555.0, dividend: 160, isEstimate: false },
            { period: "2025.03", revenue: 150000, ordinaryProfit: 14000, netProfit: 8800, eps: 600.0, dividend: 200, isEstimate: false },
            { period: "2026.03", revenue: 160000, ordinaryProfit: 15500, netProfit: 9500, eps: 650.0, dividend: 220, isEstimate: true, remark: "過去最高益予想" }
        ]
    },
    "7409": {
        name: "AeroEdge",
        code: "7409",
        market: "東証G",
        tvSymbol: "TSE:7409",
        currentPrice: 4150.0,
        change: 120.0,
        changePercent: 2.98,
        per: 28.5,
        pbr: 4.2,
        dividendYield: 0,
        marketCap: 210,
        strengths: [
            { title: "航空機エンジン部品の特化技術", desc: "チタンアルミ等の難削材加工で世界屈指の技術。サフラン社等と長期契約。", icon: "award" },
            { title: "LEAPエンジンの独占供給", desc: "次世代ベストセラー機（A320neo等）向けエンジン部品で強固な地位。", icon: "globe" },
            { title: "スタートアップ的な急成長", desc: "足元の受注急増に対応した増産投資を継続。高い成長ポテンシャル。", icon: "trending" }
        ],
        valuation: {
            status: "やや割高",
            statusEn: "PREMIUM VALUATION",
            analysis: "将来の航空機需要回復と高い成長性を織り込む。小型株特有のボラティリティがあるが、技術模倣が困難な点で中長期の評価は高い。"
        },
        latestEarningsInfo: "航空機需要の本格的な回復に伴い、主力のLEAPエンジン部品の出荷が拡大。大型案件の受注も重なり、通期の売上高は過去最高を更新する見通し。量産体制を強化中。",
        financials: [
            { period: "2022.06", revenue: 12.5, ordinaryProfit: 0.8, netProfit: 0.5, eps: 12.3, dividend: 0, isEstimate: false, remark: "回復期" },
            { period: "2023.06", revenue: 18.2, ordinaryProfit: 2.5, netProfit: 1.8, eps: 45.1, dividend: 0, isEstimate: false, remark: "利益急拡大" },
            { period: "2024.06", revenue: 23.5, ordinaryProfit: 3.8, netProfit: 2.6, eps: 62.4, dividend: 0, isEstimate: false, remark: "半導体洗浄好調" },
            { period: "2025.06", revenue: 31.0, ordinaryProfit: 5.2, netProfit: 3.5, eps: 84.0, dividend: 0, isEstimate: false, remark: "成長継続予想" }
        ]
    },
    "5805": {
        name: "SWCC",
        code: "5805",
        market: "東証P",
        tvSymbol: "TSE:5805",
        currentPrice: 11540.0,
        change: 140.0,
        changePercent: 1.23,
        per: 9.3,
        pbr: 1.25,
        dividendYield: 3.9,
        marketCap: 1450,
        businessProfile: "1936年に昭和電線として創業した老舗の総合電線メーカー。2023年に昭和電線ホールディングスから商号を変更。電力安定供給を支える高圧ケーブルや、次世代送電システムにおける世界最小レベルの低損失を実現する独自技術に強みを持つ。エネルギー・インフラ事業（SICONEX等）を収益基盤とし、車載関連や精密デバイス事業も育成。「インフラの血管」とも言える電線・光ファイバ供給を通じて、日本の電力網強靭化とGX（グリーン・トランスフォーメーション）を牽引する中核企業。",
        strengths: [
            { title: "電力インフラの強靭化", desc: "老朽化した送電網の更新需要や再生可能エネルギーの接続需要が追い風。", icon: "globe" },
            { title: "免震装置トップクラス", desc: "建築・土木向け免震装置で国内屈指。防災・減災意識の高まりが追い風。", icon: "award" },
            { title: "収益構造の劇的な転換", desc: "低採算事業の撤退と高付加価値製品への注力により、利益率が急上昇中。", icon: "trending" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED / RE-RATING",
            analysis: "フジクラに続く「電線祭り」の本命。PER 10倍割れ、配当利回り3%台後半は、構造改革後の収益力を考慮すると極めて割安。"
        },
        financials: [
            { period: "2023.03", revenue: 2068, ordinaryProfit: 105, netProfit: 72, eps: 236.4, dividend: 80, isEstimate: false },
            { period: "2024.03", revenue: 2154, ordinaryProfit: 135, netProfit: 95, eps: 312.5, dividend: 100, isEstimate: false },
            { period: "2025.03", revenue: 2350, ordinaryProfit: 210, netProfit: 145, eps: 480.2, dividend: 150, isEstimate: false },
            { period: "2026.03", revenue: 2700, ordinaryProfit: 260, netProfit: 160, eps: 540.7, dividend: 200, isEstimate: true, remark: "上方修正" }
        ]
    },
    "6315": {
        name: "TOWA",
        code: "6315",
        market: "東証P",
        tvSymbol: "TSE:6315",
        currentPrice: 2085.0,
        change: 45.0,
        changePercent: 2.21,
        per: 22.8,
        pbr: 3.42,
        dividendYield: 0.96,
        marketCap: 1560,
        businessProfile: "1979年設立。半導体後工程の中で、チップを樹脂で包み込み外部環境から保護する「モールディング（封止）」装置の世界トップメーカー。独自開発の『マルチプランジャシステム』や『コンプレッション・モールディング』技術により、高精度かつ高歩留まりな生産を実現。生成AI向けに不可欠なHBM（高帯域幅メモリ）の製造プロセスにおいて、同社の圧縮封止技術がデファクトスタンダードとなっており、次世代AIチップ製造のキープレイヤーとして世界中の半導体メーカーから熱視線を浴びている。",
        strengths: [
            { title: "HBM製造の必須技術", desc: "SKハイニックス等の大手メモリメーカーに独占的な供給力を持ち、生成AIバブルの恩恵を直接享受。", icon: "award" },
            { title: "圧倒的な製品占有率", desc: "トランスファーモールディング装置で世界シェア約6割。高い参入障壁を誇る。", icon: "globe" },
            { title: "次世代チップ技術への適応", desc: "チップレットや先進パッケージング技術の進展に伴い、同社のモールディング技術の重要性が一段と向上。", icon: "trending" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE / MOMENTUM",
            analysis: "半導体サイクルの底打ちと生成AI特需により、成長期待は最大。PER 20倍台はグロース株として許容範囲内。"
        },
        financials: [
            { period: "2023.03", revenue: 531, ordinaryProfit: 105, netProfit: 75, eps: 100.2, dividend: 15, isEstimate: false },
            { period: "2024.03", revenue: 502, ordinaryProfit: 85, netProfit: 62, eps: 82.5, dividend: 15, isEstimate: false },
            { period: "2025.03", revenue: 540, ordinaryProfit: 125, netProfit: 95, eps: 126.4, dividend: 20, isEstimate: false },
            { period: "2026.03", revenue: 560, ordinaryProfit: 98, netProfit: 68, eps: 91.4, dividend: 20, isEstimate: true, remark: "AI需要継続" }
        ]
    },
    "3778": {
        name: "さくらインターネット",
        code: "3778",
        market: "東証P",
        tvSymbol: "TSE:3778",
        currentPrice: 4850.0,
        change: -120.0,
        changePercent: -2.42,
        per: 245.5,
        pbr: 18.2,
        dividendYield: 0.1,
        marketCap: 1800,
        businessProfile: "1996年、学生起業家（現社長・田中邦裕氏）により創業された国内独立系データセンターの最大手。自社拠点のデータセンター運営を通じ、サーバー・ネットワークのホスティングサービスを展開。現在はガバメントクラウド（政府クラウド）への認定や、AI開発に不可欠なGPU（NVIDIA等）の国内最大級の供給基地として、日本のデジタル・ソブリン（情報主権）を支える戦略的インフラ企業へと進化。生成AI革命を国家レベルで推進するための計算資源提供を一身に担う。",
        strengths: [
            { title: "国産クラウドの国策期待", desc: "経済安全保障の観点から、政府クラウド選定や補助金交付など、強力な公的支援を背景に急成長。", icon: "award" },
            { title: "GPU計算資源の確保", desc: "入手困難なNVIDIA H100等を早期導入。AI開発向けの計算パワー提供で独走状態。", icon: "trending" },
            { title: "圧倒的な知名度と信頼", desc: "国内DC市場での長い実績とブランド力により、大手企業や自治体との連携がスムーズ。", icon: "globe" }
        ],
        valuation: {
            status: "割高",
            statusEn: "SPECULATIVE / PREMIUM",
            analysis: "PERは異常値だが、国策によるインフラ構築という「夢」を買う銘柄。純利益ベースではなく、将来の市場独占力で評価される局面。"
        },
        financials: [
            { period: "2023.03", revenue: 206, ordinaryProfit: 11, netProfit: 8, eps: 18.5, dividend: 3, isEstimate: false },
            { period: "2024.03", revenue: 220, ordinaryProfit: 12, netProfit: 9, eps: 20.2, dividend: 3.5, isEstimate: false },
            { period: "2025.03", revenue: 310, ordinaryProfit: 45, netProfit: 32, eps: 75.0, dividend: 5, isEstimate: false },
            { period: "2026.03", revenue: 365, ordinaryProfit: 4, netProfit: 2, eps: 5.0, dividend: 5, isEstimate: true, remark: "GPU投資先行" }
        ]
    },
    "5595": {
        name: "QPS研究所",
        code: "5595",
        market: "東証G",
        tvSymbol: "TSE:5595",
        currentPrice: 1980.0,
        change: 85.0,
        changePercent: 4.49,
        per: -15.5,
        pbr: 8.4,
        dividendYield: 0,
        marketCap: 720,
        businessProfile: "2005年に九州大学発の宇宙ベンチャーとして設立。世界最高水準の小型SAR（合成開口レーダー）衛星の開発・運用および衛星データの提供を手掛ける。夜間や雲、豪雨などの悪天候下でも地表を鮮明に観測できる独自アンテナ技術を持ち、24時間365日の高頻度観測を目指す。2025年には持株会社体制へ移行。防災、インフラ監視、安全保障など、膨大なデータを活用した『宇宙からの地球センサー』として、新たな宇宙ビジネスのパイオニアを目指すグローバルベンチャー。",
        strengths: [
            { title: "世界最高峰の小型SAR", desc: "従来のSAR衛星の数十キロから数キロへ超軽量化。夜間や厚い雲を通した高解像度観測が可能。", icon: "award" },
            { title: "衛星コンステレーション計画", desc: "最終的に36機の運用で、世界中を10分間隔で「準リアルタイム」監視することを目指す。", icon: "globe" },
            { title: "防衛装備庁との大型契約", desc: "安全保障分野での需要が急拡大。実証実験から実運用のフェーズへ移行し、収益化が本格化。", icon: "trending" }
        ],
        valuation: {
            status: "適正",
            statusEn: "STARTUP / GROWTH",
            analysis: "足元は赤字だが、防衛需要という確実なバイサイドがある。衛星打ち上げ成功の度に資産価値が向上する独自の評価モデルが必要。"
        },
        financials: [
            { period: "2023.05", revenue: 9.5, ordinaryProfit: -8.2, netProfit: -8.5, eps: -22.4, dividend: 0, isEstimate: false },
            { period: "2024.05", revenue: 16.5, ordinaryProfit: -3.5, netProfit: -3.2, eps: -8.2, dividend: 0, isEstimate: false },
            { period: "2025.05", revenue: 40.0, ordinaryProfit: 6.0, netProfit: 5.0, eps: 12.0, dividend: 0, isEstimate: false, remark: "黒字化予想" }
        ]
    },
    "6506": {
        name: "安川電機",
        code: "6506",
        market: "東証P",
        tvSymbol: "TSE:6506",
        currentPrice: 4837.0,
        change: 52.0,
        changePercent: 1.09,
        per: 33.9,
        pbr: 2.71,
        dividendYield: 1.41,
        marketCap: 12800,
        businessProfile: "1915年、安川敬一郎氏らにより設立された、世界の産業オートメーションを支える巨頭。サーボモーターとインバーターで世界首位のシェアを誇り、多関節ロボット『MOTOMAN』は自動車製造などの過酷な現場で圧倒的な実績を持つ。現在はロボットとモーション制御を融合させたデジタルデータソリューション『i³-Mechatronics』を提唱し、製造現場のDXを世界規模で推進。日本のモノづくり精神と最先端のIT技術を融合させ、スマート工場の未来を切り拓く。",
        strengths: [
            { title: "モーション制御で世界首位級", desc: "ACサーボ、インバータで圧倒的シェア。メカトロニクスのパイオニア。", icon: "award" },
            { title: "産業用ロボット「MOTOMAN」", desc: "世界4大ロボットメーカーの一角。自動車から半導体まで幅広く対応。", icon: "globe" },
            { title: "NVIDIAとのAI提携", desc: "物理的な現場でのAI（フィジカルAI）活用でNVIDIAと協力。DX化をリード。", icon: "trending" }
        ],
        valuation: {
            status: "適正",
            statusEn: "FAIR VALUE",
            analysis: "中国市場の回復遅れが懸念されるが、NVIDIA提携によるAIロボットの将来性は絶大。短期的調整は長期の買い場。"
        },
        financials: [
            { period: "2023.02", revenue: 5560, ordinaryProfit: 683, netProfit: 517, eps: 196.4, dividend: 64, isEstimate: false },
            { period: "2024.02", revenue: 5756, ordinaryProfit: 712, netProfit: 506, eps: 192.5, dividend: 64, isEstimate: false },
            { period: "2025.02", revenue: 5850, ordinaryProfit: 700, netProfit: 500, eps: 190.0, dividend: 68, isEstimate: false },
            { period: "2026.02", revenue: 5250, ordinaryProfit: 505, netProfit: 370, eps: 142.7, dividend: 68, isEstimate: true, remark: "利益予想上方修正" }
        ]
    },
    "6269": {
        name: "三井海洋開発",
        code: "6269",
        market: "東証P",
        tvSymbol: "TSE:6269",
        currentPrice: 15090.0,
        change: 320.0,
        changePercent: 2.17,
        per: 19.64,
        pbr: 5.56,
        dividendYield: 0.93,
        marketCap: 10300,
        businessProfile: "三井物産と三井造船の出資により設立された、海洋石油・ガス開発における浮体式生産設備（FPSO等）の設計・建造・据付からリース、保守（O&M）までを一貫して提供する世界的なリーディングカンパニー。海洋の過酷な条件下で20年以上にわたり石油・ガスを安定生産し続けるための高度なエンジニアリング力を持ち、世界中の主要な深海油田プロジェクトに参画。近年は浮体式洋上風力発電やメタンハイドレート開発など、海洋エネルギーのフロンティア開拓にも積極的に取り組む。",
        strengths: [
            { title: "FPSO事業の世界的大手", desc: "浮体式海洋石油・ガス生産設備で世界屈指。ブラジル沖深海開発に強み。", icon: "globe" },
            { title: "高収益なリカーリングモデル", desc: "20年以上の長期リース・運営保守（チャーター事業）が収益の柱に。", icon: "trending" },
            { title: "深海レアアース開発期待", desc: "日本の排他的経済水域内でのレアアース泥採取プロジェクトの中心的担い手。", icon: "award" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED / CATALYST",
            analysis: "過去最高益を更新中で、配当も増額。レアアースという強烈な国策テーマを内包しており、バリュエーション向上余地は大きい。"
        },
        financials: [
            { period: "2022.12", revenue: 3828, ordinaryProfit: 125, netProfit: 85, eps: 145.2, dividend: 40, isEstimate: false },
            { period: "2023.12", revenue: 4765, ordinaryProfit: 185, netProfit: 135, eps: 230.1, dividend: 60, isEstimate: false },
            { period: "2024.12", revenue: 5200, ordinaryProfit: 500, netProfit: 350, eps: 512.0, dividend: 140, isEstimate: false, remark: "過去最高益（修正後）" }
        ]
    },
    "6965": {
        name: "浜松ホトニクス",
        code: "6965",
        market: "東証P",
        tvSymbol: "TSE:6965",
        currentPrice: 1712.0,
        change: 15.0,
        changePercent: 0.88,
        per: 35.77,
        pbr: 1.59,
        dividendYield: 2.22,
        marketCap: 5350,
        businessProfile: "1953年、テレビ用光電管の研究からスタートした、世界最高水準の光技術を誇る開発型企業。光を検出する『光電子増倍管（PMT）』において世界シェア約9割を独占し、素粒子観測（カミオカンデ）からがん診断（PET）、半導体検査装置まで、文明の進化に不可欠なあらゆる先端分野を支える。売上高の1割以上を研究開発に投じ、まだ誰も実現していない未知の光領域を拓き続けることで、人類の知の最前線を更新し続ける『知の探索者』的企業。",
        strengths: [
            { title: "光検出器で世界をリード", desc: "光電子増倍管で世界シェア約9割。科学研究・医療・産業の発展に不可欠。", icon: "award" },
            { title: "ノーベル賞を支える技術力", desc: "ニュートリノ観測など多くのノーベル賞研究に貢献。技術的信頼性は絶対。 ", icon: "globe" },
            { title: "光技術の無限の可能性", desc: "核融合、量子コンピュータ、がん診断など、未来の成長分野に全て関与。", icon: "trending" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED / DEEP-TECH",
            analysis: "短期的には半導体サイクルや中国景気の影響を受けるが、技術的優位性は不変。PBR 1倍台、利回り2%超は長期投資の好機。"
        },
        financials: [
            { period: "2023.09", revenue: 2214, ordinaryProfit: 569, netProfit: 410, eps: 132.5, dividend: 76, isEstimate: false },
            { period: "2024.09", revenue: 2114, ordinaryProfit: 188, netProfit: 143, eps: 46.1, dividend: 38, isEstimate: false },
            { period: "2025.09", revenue: 2220, ordinaryProfit: 172, netProfit: 143, eps: 48.7, dividend: 38, isEstimate: false, remark: "回復局面（予想）" }
        ]
    },
    "5253": {
        name: "カバー",
        code: "5253",
        market: "東証G",
        tvSymbol: "TSE:5253",
        currentPrice: 1622.0,
        change: -12.0,
        changePercent: -0.73,
        per: 18.69,
        pbr: 5.62,
        dividendYield: 0,
        marketCap: 1087,
        businessProfile: "2016年設立。VTuber事務所『ホロライブプロダクション』を運営。タレントの活動を支援する「配信・コンテンツ」、世界中のファンに届ける「マーチャンダイジング（グッズ販売）」、そして「ライブ・イベント」を多角的に展開。メタバースプラットフォーム『ホロアース』の開発を通じ、二次元キャラクターとファンが三次元を超えて繋がる新しい文化圏の創造を目指す。日本発のキャラクター文化を最新テクノロジーで世界へ展開する、エンターテインメント・テックの急先鋒。",
        strengths: [
            { title: "VTuber「ホロライブ」運営", desc: "世界的なファン層を持つVTuberプロダクション。強固なコミュニティを構築。", icon: "globe" },
            { title: "キャラクターIPビジネスの雄", desc: "グッズ販売、ライセンス、ライブ収益が拡大。高利益率なビジネスモデル。", icon: "award" },
            { title: "メタバース・新技術への挑戦", desc: "自社メタバースプラットフォーム「ホロアース」等、次世代エンタメを創出。", icon: "trending" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED / GLOBAL-IP",
            analysis: "成長率に対してPER 20倍弱は割安感。海外市場の開拓余地は大きく、キャラクタービジネスとしての拡張性は極めて高い。"
        },
        financials: [
            { period: "2023.03", revenue: 204, ordinaryProfit: 34, netProfit: 25, eps: 41.2, dividend: 0, isEstimate: false },
            { period: "2024.03", revenue: 301, ordinaryProfit: 55, netProfit: 41, eps: 67.5, dividend: 0, isEstimate: false },
            { period: "2025.03", revenue: 360, ordinaryProfit: 73, netProfit: 52, eps: 85.0, dividend: 0, isEstimate: false },
            { period: "2026.03", revenue: 525, ordinaryProfit: 82, netProfit: 57, eps: 86.8, dividend: 0, isEstimate: true, remark: "高成長継続予想" }
        ]
    },
    "6228": {
        name: "ジェイ・イー・ティ",
        code: "6228",
        market: "東証S",
        tvSymbol: "TSE:6228",
        currentPrice: 775.0,
        change: -5.0,
        changePercent: -0.64,
        per: 31.3,
        pbr: 0.82,
        dividendYield: 0,
        marketCap: 45,
        businessProfile: "半導体製造工程に不可欠な『洗浄装置』の専業メーカー。岡山県に拠点を置き、枚葉式、バッチ式の両方式に対応する高度な洗浄技術を持つ。2009年に韓国のゼウス傘下に入り、経営基盤とグローバルな販路を強化。特に中国や台湾、韓国など東アジア圏の主要半導体メーカーからの受注が売上の大半を占める。半導体の微細化・多層化に伴い、パーティクル（異物）除去の重要性が飛躍的に高まる中、独自の洗浄プロセスで歩留まり向上に貢献する。",
        strengths: [
            { title: "半導体洗浄装置の専業メーカー", desc: "中小型・パワー半導体向け洗浄装置で強み。韓国など海外シェアも高い。", icon: "award" },
            { title: "Rapidusプロジェクト参画", desc: "次世代半導体の国産化プロジェクト（ラピダス）向け装置開発に携わる。", icon: "globe" },
            { title: "次世代パワー半導体対応", desc: "SiC（炭化ケイ素）半導体など、EV化で需要が急増する新素材に対応。", icon: "trending" }
        ],
        valuation: {
            status: "割安",
            statusEn: "UNDERVALUED / PBR-BELOW-1",
            analysis: "足元の業績悪化で株価は低迷しているが、PBR 1倍割れは底値。ラピダス関連としての再評価カタリストを待つフェーズ。"
        },
        financials: [
            { period: "2022.12", revenue: 135, ordinaryProfit: 12, netProfit: 8, eps: 175.4, dividend: 25, isEstimate: false },
            { period: "2023.12", revenue: 154, ordinaryProfit: 15, netProfit: 11, eps: 245.1, dividend: 35, isEstimate: false },
            { period: "2024.12", revenue: 160, ordinaryProfit: -18, netProfit: -27, eps: -260.0, dividend: 0, isEstimate: false, remark: "一時的赤字（修正後）" }
        ]
    }
};
