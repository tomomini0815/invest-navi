
import { ComparisonPageTemplate } from "@/components/templates/ComparisonPageTemplate";
import { SecuritiesHeroSection } from "@/components/features/SecuritiesHeroSection";
import RankingCardV2 from "@/components/features/RankingCardV2";
import { SecuritiesComparisonTable } from "@/components/features/SecuritiesComparisonTable";
import { Company } from "@/components/features/SurveyDiagnostic";
import { ExternalLink } from "lucide-react";

export const securitiesRankingList: Company[] = [
    {
        id: "sbi",
        name: "SBI証券",
        points: ["口座開設数No.1 (1,200万口座超)", "国内株手数料0円 (条件達成で完全無料)", "Tポイント・Pontaポイント等が貯まる", "IPO取扱実績No.1"],
        campaignText: "口座開設でもれなく現金プレゼント + 最大10万円還元",
        specs: [
            { label: "国内株手数料", value: "0円 (条件付)", isHighlight: true },
            { label: "米国株手数料", value: "0.495%" },
            { label: "ポイント", value: "T/Ponta/V", isHighlight: true },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "国内/米国/投信/債券" },
            { label: "ツール", value: "HYPER SBI 2" }
        ],
        badgeText: "総合力No.1！迷ったらコレ",
        affiliateUrl: "https://www.sbisec.co.jp/",
    },
    {
        id: "rakuten",
        name: "楽天証券",
        points: ["楽天ポイントが貯まる・使える", "「マーケットスピード II」が無料", "SPUで楽天市場の買い物がお得", "投信積立のクレカ決済が人気"],
        campaignText: "投信積立で楽天ポイント最大1%還元",
        specs: [
            { label: "国内株手数料", value: "0円 (いちにち)", isHighlight: true },
            { label: "米国株手数料", value: "0.495%" },
            { label: "ポイント", value: "楽天ポイント", isHighlight: true },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "国内/米国/投信/金" },
            { label: "ツール", value: "MARKET SPEED II" }
        ],
        badgeText: "ポイント投資ならコレ！楽天経済圏",
        affiliateUrl: "https://www.rakuten-sec.co.jp/",
    },
    {
        id: "monex",
        name: "マネックス証券",
        points: ["NISAでの売買手数料が無料", "dポイントが貯まる", "米国株に強い", "銘柄スカウターが優秀"],
        campaignText: "d払い連携で20%還元キャンペーン",
        specs: [
            { label: "国内株手数料", value: "55円~" },
            { label: "米国株手数料", value: "実質無料 (NISA)" },
            { label: "ポイント", value: "dポイント/マネックスPt" },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "国内/米国/中国/投信/債券" },
            { label: "ツール", value: "銘柄スカウター", isHighlight: true }
        ],
        badgeText: "外国株・IPO投資に強い",
        affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=0100q1bu00ol0m",
        customLogo: (
            <a href="https://h.accesstrade.net/sp/cc?rk=0100n99e00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                <img src="https://h.accesstrade.net/sp/rr?rk=0100n99e00ol0m" alt="株・投資信託ならネット証券のマネックス" style={{ border: 0 }} />
            </a>
        ),
        customAffiliateButton: (
            <div className="relative w-full">
                <a
                    href="https://h.accesstrade.net/sp/cc?rk=0100q1bu00ol0m"
                    rel="nofollow"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-xs xs:text-sm whitespace-nowrap shadow-sm transition-colors flex items-center justify-center rounded-md"
                    target="_blank"
                >
                    公式サイト <ExternalLink className="ml-2 w-4 h-4" />
                    <img src="https://h.accesstrade.net/sp/rr?rk=0100q1bu00ol0m" width="1" height="1" style={{ border: 0, position: 'absolute', width: 1, height: 1, opacity: 0 }} alt="" />
                </a>
            </div>
        ),
        promotionBanner: (
            <a href="https://h.accesstrade.net/sp/cc?rk=0100p6oa00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                <img src="https://h.accesstrade.net/sp/rr?rk=0100p6oa00ol0m" alt="マネックス証券" style={{ border: 0 }} />
            </a>
        )
    },
    {
        id: "matsui",
        name: "松井証券",
        points: ["1日の約定50万円まで無料", "創業100年以上の歴史と信頼", "サポート体制が充実 (AIチャット等)", "IPO資金拘束なし"],
        campaignText: "NISA口座開設で最大〇〇ポイント",
        specs: [
            { label: "国内株手数料", value: "無料 (50万円迄)", isHighlight: true },
            { label: "米国株手数料", value: "0.495%" },
            { label: "ポイント", value: "松井ポイント" },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "国内/米国/投信/先物" },
            { label: "ツール", value: "ネットストックHS" }
        ],
        badgeText: "老舗の安心感・サポート充実",
        affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=01000t2p00ol0m",
        customAffiliateButton: (
            <div className="relative w-full">
                <a
                    href="https://h.accesstrade.net/sp/cc?rk=01000t2p00ol0m"
                    rel="nofollow"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-xs xs:text-sm whitespace-nowrap shadow-sm transition-colors flex items-center justify-center rounded-md"
                    target="_blank"
                >
                    公式サイト <ExternalLink className="ml-2 w-4 h-4" />
                    <img src="https://h.accesstrade.net/sp/rr?rk=01000t2p00ol0m" width="1" height="1" style={{ border: 0, position: 'absolute', width: 1, height: 1, opacity: 0 }} alt="" />
                </a>
            </div>
        ),
        promotionBanner: (
            <a href="https://h.accesstrade.net/sp/cc?rk=010029jo00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                <img src="https://h.accesstrade.net/sp/rr?rk=010029jo00ol0m" alt="松井証券" style={{ border: 0 }} />
            </a>
        )
    },
    {
        id: "au",
        name: "auカブコム証券",
        points: ["Pontaポイントが貯まる・使える", "三菱UFJグループの安心感", "プチ株 (単元未満株) が便利", "25歳以下 手数料無料"],
        campaignText: "口座開設キャンペーン実施中",
        specs: [
            { label: "国内株手数料", value: "無料 (25歳以下)" },
            { label: "米国株手数料", value: "取扱あり" },
            { label: "ポイント", value: "Pontaポイント" },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "国内株/米国株/投信/債券" },
            { label: "ツール", value: "kabuステーション" }
        ],
        badgeText: "三菱UFJグループの安心感",
        affiliateUrl: "https://kabu.com/",
    },
    {
        id: "gmo",
        name: "GMOクリック証券",
        points: ["国内株手数料が完全無料 (1日定額)", "CFD取引高 国内No.1", "高機能ツール「はっちゅう君」", "貸株サービスも充実"],
        campaignText: "FX/CFD口座開設で最大特典あり",
        specs: [
            { label: "国内株手数料", value: "完全無料", isHighlight: true },
            { label: "米国株手数料", value: "CFDのみ" },
            { label: "ポイント", value: "-" },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "国内株/CFD/FX/先物" },
            { label: "ツール", value: "はっちゅう君" }
        ],
        badgeText: "CFD・先物ならこの1社",
        affiliateUrl: "https://www.click-sec.com/"
    },
    {
        id: "dmm",
        name: "DMM株 (DMM.com証券)",
        points: ["米国株の手数料が0円", "DMMポイントが貯まる (1%還元)", "25歳以下 国内株手数料実質無料", "最短即日取引開始"],
        campaignText: "米国株 信用取引手数料0円キャンペーン",
        specs: [
            { label: "国内株手数料", value: "55円~ (25歳以下実質無料)" },
            { label: "米国株手数料", value: "無料", isHighlight: true },
            { label: "ポイント", value: "DMMポイント" },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "国内株/米国株" },
            { label: "ツール", value: "DMM株 PRO" }
        ],
        badgeText: "米国株の取引手数料0円！",
        affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=0100mkk300ol0m",
        customLogo: (
            <a href="https://h.accesstrade.net/sp/cc?rk=0100mkjo00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                <img src="https://h.accesstrade.net/sp/rr?rk=0100mkjo00ol0m" alt="【DMM 株】口座開設" style={{ border: 0 }} />
            </a>
        ),
        customAffiliateButton: (
            <div className="relative w-full">
                <a
                    href="https://h.accesstrade.net/sp/cc?rk=0100mkk300ol0m"
                    rel="nofollow"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-xs xs:text-sm whitespace-nowrap shadow-sm transition-colors flex items-center justify-center rounded-md"
                    target="_blank"
                >
                    公式サイトはこちら <ExternalLink className="ml-2 w-4 h-4" />
                    <img src="https://h.accesstrade.net/sp/rr?rk=0100mkk300ol0m" width="1" height="1" style={{ border: 0, position: 'absolute', width: 1, height: 1, opacity: 0 }} alt="" />
                </a>
            </div>
        )
    },
    {
        id: "ig",
        name: "IG証券",
        points: ["CFD銘柄数 17,000以上 (世界No.1)", "米国株・欧州株もCFDで取引", "ノックアウトオプション", "プロ級のチャートツール"],
        campaignText: "口座開設+取引で最大5万円キャッシュバック",
        specs: [
            { label: "国内株手数料", value: "CFD (手数料有)" },
            { label: "米国株手数料", value: "CFD (手数料有)" },
            { label: "ポイント", value: "-" },
            { label: "NISA", value: "非対応" },
            { label: "取扱商品", value: "株式CFD/株価指数/商品/FX" },
            { label: "ツール", value: "ProRealTime" }
        ],
        badgeText: "世界No.1のCFD・グローバル投資",
        affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=0100q0r000ol0m",
        promotionBanner: (
            <a href="https://h.accesstrade.net/sp/cc?rk=0100q0qz00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                <img src="https://h.accesstrade.net/sp/rr?rk=0100q0qz00ol0m" alt="IG証券" style={{ border: 0 }} className="w-full sm:!w-[180px] !h-auto !max-w-none sm:!max-h-none" />
            </a>
        ),
        customAffiliateButton: (
            <div className="relative w-full">
                <a
                    href="https://h.accesstrade.net/sp/cc?rk=0100q0r000ol0m"
                    rel="nofollow"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-xs xs:text-sm whitespace-nowrap shadow-sm transition-colors flex items-center justify-center rounded-md"
                    target="_blank"
                >
                    公式サイト <ExternalLink className="ml-2 w-4 h-4" />
                    <img src="https://h.accesstrade.net/sp/rr?rk=0100q0r000ol0m" width="1" height="1" style={{ border: 0, position: 'absolute', width: 1, height: 1, opacity: 0 }} alt="" />
                </a>
            </div>
        )
    },
    {
        id: "moomoo",
        name: "moomoo証券",
        points: ["米国株手数料 業界最安水準", "日本株手数料 完全無料", "機関投資家級の分析ツール", "24時間取引対応"],
        campaignText: "口座開設+入金で最大10万円相当株プレゼント",
        specs: [
            { label: "国内株手数料", value: "無料", isHighlight: true },
            { label: "米国株手数料", value: "0.088%~ (税込)" },
            { label: "ポイント", value: "moomooポイント" },
            { label: "NISA", value: "売買手数料 無料", isHighlight: true },
            { label: "取扱商品", value: "米国株/国内株" },
            { label: "ツール", value: "moomooアプリ" }
        ],
        badgeText: "最先端ツール＆手数料革命",
        affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=0100pd0z00ol0m",
        customAffiliateButton: (
            <div className="relative w-full">
                <a
                    href="https://h.accesstrade.net/sp/cc?rk=0100pd0z00ol0m"
                    rel="nofollow"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-xs xs:text-sm whitespace-nowrap shadow-sm transition-colors flex items-center justify-center rounded-md"
                    target="_blank"
                >
                    公式サイト <ExternalLink className="ml-2 w-4 h-4" />
                    <img src="https://h.accesstrade.net/sp/rr?rk=0100pd0z00ol0m" width="1" height="1" style={{ border: 0, position: 'absolute', width: 1, height: 1, opacity: 0 }} alt="" />
                </a>
            </div>
        ),
        promotionBanner: (
            <a href="https://h.accesstrade.net/sp/cc?rk=0100pnl200ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                <img src="https://h.accesstrade.net/sp/rr?rk=0100pnl200ol0m" alt="moomoo証券【WEB】" style={{ border: 0 }} />
            </a>
        )
    },
    {
        id: "paypay",
        name: "PayPay証券",
        points: ["100円から株が買える", "PayPayポイントで投資可能", "スマホで完結・初心者向け", "NISAも100円から"],
        campaignText: "投資デビュー応援キャンペーン実施中",
        specs: [
            { label: "国内株手数料", value: "スプレッド 0.5%~" },
            { label: "米国株手数料", value: "スプレッド 0.5%~" },
            { label: "ポイント", value: "PayPayポイント" },
            { label: "NISA", value: "対応 (つみたて/成長)" },
            { label: "取扱商品", value: "国内株/米国株/投信" },
            { label: "ツール", value: "PayPay証券アプリ" }
        ],
        badgeText: "スマホで完結！100円から投資",
        affiliateUrl: "https://www.paypay-sec.co.jp/"
    },
];

const SecuritiesComparison = () => {
    return (
        <ComparisonPageTemplate
            metaTitle="ネット証券 徹底比較 2026 | 手数料・NISA・ポイント | 投資総合ナビ"
            metaDescription="【2026年最新】SBI証券、楽天証券など主要ネット証券を徹底比較。手数料、NISA対応、ポイント還元率、ツールなど、あなたに最適な証券会社が必ず見つかります。"
            categoryName="ネット証券"
            surveyType="securities"
            heroSection={<SecuritiesHeroSection />}
            rankingList={securitiesRankingList}
            renderRankingCard={(item, index) => {
                // Since we removed internal detailed pages, ensure all navigation goes to affiliate links
                const name = item.name;

                // Keep the accordion logic but ensure detailUrl is correct
                const detailUrl = item.affiliateUrl;
                let accordionData;

                if (name.includes("SBI証券")) {
                    accordionData = {
                        features: "SBI証券は、グループ全体で1,200万口座を突破した業界最大手のネット証券です。「ゼロ革命」により、インターネットコースの国内株式売買手数料が恒久的に0円（条件あり）となるなど、圧倒的なコストパフォーマンスを誇ります。初心者から上級者まで、全ての投資家におすすめできる総合力の高さが魅力です。",
                        goodPoints: [
                            "口座開設数No.1：多くの投資家に選ばれている圧倒的な実績と安心感",
                            "手数料革命：「ゼロ革命」で国内株売買手数料が0円、新NISAも売買手数料0円",
                            "ポイント投資：Vポイント、Tポイント、Pontaなど主要ポイントが「貯まる・使える」",
                            "IPOに強い：取扱銘柄数が業界トップクラスで、当選チャンスを広げる独自ポイント制度もあり"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "0円", className: "text-red-600" },
                                { label: "米国株手数料", value: "0.495%" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "IPO取扱", value: "No.1" }
                            ],
                            row2: [
                                { label: "ポイント", value: "T/Ponta/V" },
                                { label: "クレカ積立", value: "最大5.0%", className: "text-red-600" },
                                { label: "ツール", value: "HYPER SBI 2" },
                                { label: "口座開設", value: "最短5分" }
                            ]
                        },
                        startGuide: {
                            title: "SBI証券の始め方 3 STEP",
                            description: "お申し込みから最短即日で取引スタートできます",
                            steps: [
                                { title: "口座開設申し込み", description: "スマホから5分で入力完了。本人確認もオンラインで完結します。", image: "/images/step1_icon.png" },
                                { title: "初期設定・入金", description: "審査完了後、ログインして初期設定。即時入金なら手数料無料。", image: "/images/step2_icon.png" },
                                { title: "取引スタート", description: "準備完了です！少額から好きな銘柄を購入してみましょう。", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("楽天証券")) {
                    accordionData = {
                        features: "楽天証券は、楽天経済圏との強力な連携が最大の魅力です。国内株・米国株の手数料は「ゼロコース」なら完全無料。さらに投信積立などの取引で楽天ポイントがザクザク貯まり、貯まったポイントで投資も可能。最強のポイ活投資環境を提供しています。",
                        goodPoints: [
                            "手数料無料：「ゼロコース」で国内株・米国株・NISAの売買手数料が完全0円",
                            "ポイント投資：楽天ポイントが日常的に「貯まる・使える」。SPUで楽天市場の倍率UPも",
                            "最強ツール：「マーケットスピード II」はプロ級の機能を備えながら誰でも無料で利用可能",
                            "日経新聞が無料：スマホアプリ「iSPEED」で日経テレコン（楽天証券版）が読み放題"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "0円", className: "text-red-600" },
                                { label: "米国株手数料", value: "0円", className: "text-red-600" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "IPO取扱", value: "多い" }
                            ],
                            row2: [
                                { label: "ポイント", value: "楽天P" },
                                { label: "クレカ積立", value: "最大1.0%" },
                                { label: "ツール", value: "MS II" },
                                { label: "口座開設", value: "最短翌日" }
                            ]
                        },
                        startGuide: {
                            title: "楽天証券の始め方 3 STEP",
                            description: "楽天会員なら入力補助でさらにスムーズに開設可能です",
                            steps: [
                                { title: "Web申し込み", description: "楽天IDがあれば最短30秒で入力完了。無い方も5分程度です。", image: "/images/step1_icon.png" },
                                { title: "本人確認書類提出", description: "スマホで「マイナンバーカード」等を撮影してアップロード。", image: "/images/step2_icon.png" },
                                { title: "ID受取・取引", description: "翌営業日以降にログインIDがメールで届きます。すぐ取引可能！", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("マネックス証券")) {
                    accordionData = {
                        features: "マネックス証券は、米国株投資と強力な分析ツールに強みを持つ証券会社です。米国株の取扱銘柄数は豊富で、時間外取引にも対応。「銘柄スカウター」は企業の業績や財務を視覚的に分析できる神ツールとして投資家に大人気です。dポイントとの連携も強化されています。",
                        goodPoints: [
                            "米国株に強い：取扱銘柄5,000超、時間外取引可能、買付時の為替手数料無料",
                            "分析ツール：「銘柄スカウター」はプロも認める高性能。日本株・米国株の分析が捗る",
                            "クレカ積立：dカード積立なら還元率最大1.1%。NISAとの相性も抜群",
                            "NISA売買手数料：日本株・米国株・中国株の売買手数料が恒久的に無料"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "55円~" },
                                { label: "米国株手数料", value: "0.495%" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "銘柄分析", value: "最強" }
                            ],
                            row2: [
                                { label: "ポイント", value: "dポイント" },
                                { label: "クレカ積立", value: "最大1.1%", className: "text-red-600" },
                                { label: "ツール", value: "スカウター" },
                                { label: "口座開設", value: "最短翌日" }
                            ]
                        },
                        startGuide: {
                            title: "マネックス証券の始め方 3 STEP",
                            description: "dアカウントをお持ちなら連携で開設がスムーズです",
                            steps: [
                                { title: "口座開設フォーム", description: "メール登録後、フォームにお客様情報を入力します。", image: "/images/step1_icon.png" },
                                { title: "本人確認", description: "「スマホで本人確認」なら郵送不要でスピーディーに完結。", image: "/images/step2_icon.png" },
                                { title: "口座開設完了", description: "最短翌営業日に開設完了メールが届きます。設定して取引開始！", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("松井証券")) {
                    accordionData = {
                        features: "老舗の安心感と革新的なサービスを併せ持つ松井証券。25歳以下は株式手数料が無料、NISA取引も無料です。「松井証券 日本株アプリ」はシンプルで使いやすく、投資初心者へのサポート体制（電話相談など）も業界最高水準の手厚さを誇ります。",
                        goodPoints: [
                            "手数料無料：25歳以下は現物取引手数料が完全無料。新NISAも売買手数料0円",
                            "サポート体制：HDI-Japan問合せ窓口格付けで「三つ星」を12年連続獲得",
                            "最大1%還元：投資信託の保有残高に応じて最大1%のポイント還元（業界最高水準）",
                            "FXも安心：100円から自動売買が可能で、初心者でもリスクを抑えて運用できる"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "0円(U25)", className: "text-red-600" },
                                { label: "米国株手数料", value: "0.495%" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "IPO取扱", value: "普通" }
                            ],
                            row2: [
                                { label: "ポイント", value: "松井P" },
                                { label: "投信保有", value: "最大1.0%", className: "text-red-600" },
                                { label: "ツール", value: "高機能" },
                                { label: "口座開設", value: "最短即日" }
                            ]
                        },
                        startGuide: {
                            title: "松井証券の始め方 3 STEP",
                            description: "オンラインで完結、最短即日で取引可能です",
                            steps: [
                                { title: "WEB申し込み", description: "公式サイトからメールアドレスを登録し、申し込み画面へ。", image: "/images/step1_icon.png" },
                                { title: "eKYCで確認", description: "スマホで本人確認書類と顔写真を撮影して送信します。", image: "/images/step2_icon.png" },
                                { title: "開設完了", description: "最短即日で口座開設完了メールが届きます。すぐに取引OK！", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("auカブコム")) {
                    accordionData = {
                        features: "MUFGグループとKDDIグループの強みを融合した証券会社。Pontaポイントが「貯まる・使える」のが最大の特徴で、au PAY カード決済による投信積立は還元率最大1.0%。プチ株（単元未満株）なら1株から少額で投資でき、NISAでの少額投資にも最適です。",
                        goodPoints: [
                            "Pontaポイント：au PAY カード積立で最大1%還元、保有残高でもポイントが貯まる",
                            "プチ株®：1株から手数料実質無料で取引可能。少額からコツコツ投資できる",
                            "MUFGの信頼：三菱UFJフィナンシャル・グループの安心感と充実の商品ラインナップ",
                            "手数料：一日定額手数料コースなら100万円まで現物取引手数料0円"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "0円(条件)", className: "text-red-600" },
                                { label: "米国株手数料", value: "0.495%" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "1株投資", value: "対応" }
                            ],
                            row2: [
                                { label: "ポイント", value: "Ponta" },
                                { label: "クレカ積立", value: "最大1.0%" },
                                { label: "ツール", value: "kabuステ" },
                                { label: "口座開設", value: "最短翌日" }
                            ]
                        },
                        startGuide: {
                            title: "auカブコム証券の始め方 3 STEP",
                            description: "au IDをお持ちなら個人情報入力が短縮できます",
                            steps: [
                                { title: "申し込み", description: "お客様情報を入力。au ID連携ならさらにスムーズです。", image: "/images/step1_icon.png" },
                                { title: "本人確認", description: "スマホで本人確認書類を撮影して提出（eKYC対応）。", image: "/images/step2_icon.png" },
                                { title: "開設完了", description: "最短翌営業日に口座開設完了。パスワード設定して開始！", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("GMOクリック")) {
                    accordionData = {
                        features: "GMOクリック証券は、業界最安水準の手数料と高機能な取引ツールが魅力です。FX取引高で長年No.1の実績を持ち、CFDやバイナリーオプションも充実。2024年からは株式取引手数料も大幅に引き下げ（条件により無料）、コスト重視のアクティブトレーダーに最強の環境を提供します。",
                        goodPoints: [
                            "手数料格安：現物取引手数料は業界最安水準。27歳以下は現物手数料無料！",
                            "最強ツール：「はっちゅう君」やスマホアプリはプロも納得の操作性と機能性",
                            "FX・CFD：株だけでなく幅広い金融商品を一つの口座でシームレスに取引可能",
                            "財務分析：企業の財務諸表をグラフで直感的に分析できるツールが秀逸"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "最安水準", className: "text-red-600" },
                                { label: "米国株手数料", value: "-" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "CFD", value: "国内No.1" }
                            ],
                            row2: [
                                { label: "ポイント", value: "GMO P" },
                                { label: "貸株金利", value: "高金利" },
                                { label: "ツール", value: "超高機能" },
                                { label: "口座開設", value: "最短即日" }
                            ]
                        },
                        startGuide: {
                            title: "GMOクリック証券の始め方 3 STEP",
                            description: "スマホでスピード本人確認なら最短即日取引！",
                            steps: [
                                { title: "口座開設申し込み", description: "フォームから必要事項を入力。5分程度で完了します。", image: "/images/step1_icon.png" },
                                { title: "スピード本人確認", description: "スマホカメラで本人確認書類と顔を撮影するだけ。", image: "/images/step2_icon.png" },
                                { title: "取引スタート", description: "審査完了後、メールでIDが届き次第すぐに取引可能です。", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("DMM")) {
                    accordionData = {
                        features: "DMM株は、米国株取引に特化した強みを持ちます。米国株の取引手数料が一律0円という驚異的なスペック。もちろんNISA口座での取引も無料です。「DMM株アプリ」は初心者向けの「かんたんモード」と上級者向けの「ノーマルモード」を切り替えられ、誰でも使いやすい設計です。",
                        goodPoints: [
                            "米国株手数料0円：約定代金にかかわらず米国株の取引手数料が完全無料！",
                            "アプリが使いやすい：2つのモードを搭載し、株初心者からデイトレーダーまで対応",
                            "DMMポイント：取引手数料の1%がDMMポイントとして貯まる（国内株）",
                            "最短即日：スマホでスピード本人確認なら、申し込み当日に取引開始可能"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "55円~" },
                                { label: "米国株手数料", value: "0円", className: "text-red-600" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "IPO取扱", value: "あり" }
                            ],
                            row2: [
                                { label: "ポイント", value: "DMM P" },
                                { label: "還元率", value: "1.0%" },
                                { label: "ツール", value: "2モード" },
                                { label: "口座開設", value: "最短即日" }
                            ]
                        },
                        startGuide: {
                            title: "DMM株の始め方 3 STEP",
                            description: "他社にはない「米国株手数料0円」を今すぐ体験",
                            steps: [
                                { title: "WEB申し込み", description: "スマホ・PCから申し込みフォームに入力。", image: "/images/step1_icon.png" },
                                { title: "スマホで本人確認", description: "面倒な郵送手続きは不要。スマホで完結します。", image: "/images/step2_icon.png" },
                                { title: "ID発行・取引", description: "最短即日で口座開設のお知らせが届きます。入金して開始！", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("IG")) {
                    accordionData = {
                        features: "IG証券は世界中の金融商品を取引できるCFDのリーディングカンパニーです。個別株CFD、株価指数、商品、FXなど17,000銘柄以上をラインナップ。レバレッジを効かせた取引や、売りからの取引など、多彩な戦略が可能です。※現物株ではなくCFD取引となります。",
                        goodPoints: [
                            "銘柄数No.1：世界中の株、指数、商品、債券など17,000銘柄以上へアクセス可能",
                            "ノックアウトOP：リスクを限定しながら高い資金効率で投資できる独自商品",
                            "高機能プラットフォーム：プロ仕様のチャート分析やニュース配信が充実",
                            "学習コンテンツ：「IGアカデミー」で投資の基礎から上級テクニックまで学べる"
                        ],
                        specTable: {
                            row1: [
                                { label: "取扱銘柄数", value: "17,000+", className: "text-red-600" },
                                { label: "米国株CFD", value: "対応" },
                                { label: "NISA", value: "対象外", className: "text-gray-400" },
                                { label: "商品CFD", value: "対応" }
                            ],
                            row2: [
                                { label: "ポイント", value: "-" },
                                { label: "取引形態", value: "CFD" },
                                { label: "ツール", value: "ProReal" },
                                { label: "口座開設", value: "最短即日" }
                            ]
                        },
                        startGuide: {
                            title: "IG証券の始め方 3 STEP",
                            description: "グローバルマーケットへの扉を開きましょう",
                            steps: [
                                { title: "申し込み", description: "オンラインフォームから3分程度で入力完了。", image: "/images/step1_icon.png" },
                                { title: "本人確認", description: "スマホで本人確認書類をアップロード（eKYC対応）。", image: "/images/step2_icon.png" },
                                { title: "取引開始", description: "審査後、口座有効化して入金すればすぐに取引できます。", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("moomoo")) {
                    accordionData = {
                        features: "世界で2,000万人が利用する次世代の投資アプリ「moomoo（ムームー）」。プロ並みの機関投資家データやAI分析が無料で手に入ります。米国株は24時間取引可能で、業界最低水準の手数料。アプリひとつで情報収集から取引まで完結する、今話題の証券会社です。",
                        goodPoints: [
                            "情報力革命：機関投資家の保有状況や板情報など、有料級データが無料",
                            "米国株24時間：立会時間外も含めて24時間リアルタイムで米国株取引が可能",
                            "手数料格安：米国株手数料は業界最安水準、NISAなら日本株・米国株ともに0円",
                            "コミュニティ：世界中の投資家と意見交換できるSNS機能が充実"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "0円(NISA)" },
                                { label: "米国株手数料", value: "最安水準", className: "text-red-600" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "分析機能", value: "最強" }
                            ],
                            row2: [
                                { label: "ポイント", value: "-" },
                                { label: "米国株", value: "24時間" },
                                { label: "アプリ", value: "世界2000万" },
                                { label: "口座開設", value: "最短翌日" }
                            ]
                        },
                        startGuide: {
                            title: "moomoo証券の始め方 3 STEP",
                            description: "アプリダウンロードからスムーズに開始できます",
                            steps: [
                                { title: "アプリDL", description: "moomooアプリをダウンロードし、アカウント登録。", image: "/images/step1_icon.png" },
                                { title: "口座開設申請", description: "アプリ内の「口座開設」から必要事項を入力し書類提出。", image: "/images/step2_icon.png" },
                                { title: "承認・取引", description: "審査完了通知が来ればOK。アプリからすぐに入金・取引できます。", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                } else if (name.includes("PayPay")) {
                    accordionData = {
                        features: "PayPay証券は、スマホ一つで1,000円から株式投資ができる初心者特化型の証券会社です。PayPayアプリ内のミニアプリとしても利用でき、PayPayマネーを使って資産運用が可能。「おいたまま買付」なら銀行口座から送金不要で株が買える手軽さが魅力です。",
                        goodPoints: [
                            "1,000円から：日米の有名企業の株を金額指定で1,000円から購入可能",
                            "PayPay連携：PayPayアプリからすぐに投資スタート。PayPay資産運用も便利",
                            "おいたまま買付：銀行口座にお金を入れたまま、振替なしで直接株が買える",
                            "NISA対応：少額からのNISA積立にも対応しており、無理なく資産形成が可能"
                        ],
                        specTable: {
                            row1: [
                                { label: "国内株手数料", value: "スプレッド" },
                                { label: "米国株手数料", value: "スプレッド" },
                                { label: "NISA手数料", value: "0円", className: "text-red-600" },
                                { label: "最低投資", value: "1,000円", className: "text-red-600" }
                            ],
                            row2: [
                                { label: "ポイント", value: "PayPay" },
                                { label: "便利機能", value: "おいたまま" },
                                { label: "アプリ", value: "PayPay内" },
                                { label: "口座開設", value: "最短数日" }
                            ]
                        },
                        startGuide: {
                            title: "PayPay証券の始め方 3 STEP",
                            description: "PayPayユーザーなら圧倒的に手軽に始められます",
                            steps: [
                                { title: "申し込み", description: "PayPayアプリまたは公式サイトから申し込み。", image: "/images/step1_icon.png" },
                                { title: "本人確認", description: "スマホで本人確認書類と顔写真を撮影して提出。", image: "/images/step2_icon.png" },
                                { title: "開設完了", description: "審査完了メールが届いたらログイン設定して取引開始！", image: "/images/step3_icon.png" }
                            ]
                        }
                    };
                }

                // Fallback mock specs for compatibility if dynamic data isn't used

                // Fallback mock specs for compatibility if dynamic data isn't used
                const mockDetailedSpecs: any = {
                    id: item.name,
                    name: item.name,
                    logoText: item.name,
                    detailUrl: item.affiliateUrl,
                    affiliateUrl: item.affiliateUrl,
                    // Minimal fillers to satisfy types if needed, simplified because we rely on accordionData
                    features: item.points.join(" / "),
                    goodPoints: item.points,
                    // These will be ignored by RankingCardV2 if accordionData.specTable is present
                    spreadUsdJpyText: "-", spreadEurJpyText: "-", spreadAudJpyText: "-", spreadGbpJpyText: "-",
                    spreadEurUsdText: "-", transactionUnitText: "100株", demoPeriod: "なし", cashbackText: "-"
                };

                let customLogo = item.customLogo;
                let promotionBanner = item.promotionBanner;
                let customAffiliateButton = item.customAffiliateButton;

                if (item.id === "dmm") {
                    promotionBanner = (
                        <a href="https://h.accesstrade.net/sp/cc?rk=0100mkjo00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                            <img src="https://h.accesstrade.net/sp/rr?rk=0100mkjo00ol0m" alt="【DMM 株】口座開設" style={{ border: 0 }} />
                        </a>
                    );
                }

                return (
                    <RankingCardV2
                        key={item.name}
                        {...item}
                        id={item.id}
                        rating={4.5} // Placeholder
                        affiliateUrl={item.affiliateUrl}
                        detailUrl={
                            item.id === "sbi" ? "/securities/sbi-pro" :
                                item.id === "rakuten" ? "/securities/rakuten-pro" :
                                    item.id === "monex" ? "/securities/monex-pro" :
                                        item.affiliateUrl
                        } // Use internal pro pages for top 3, otherwise affiliate link
                        detailedSpecs={mockDetailedSpecs}
                        accordionData={accordionData}
                        rank={index + 1}
                        customLogo={customLogo}
                        promotionBanner={promotionBanner}
                        customAffiliateButton={customAffiliateButton}
                    />
                );
            }}
            renderComparisonTable={() => (
                <SecuritiesComparisonTable data={securitiesRankingList} />
            )}
            disclaimerText={
                <div className="bg-white py-6 border-t border-gray-100 mt-8">
                    <div className="max-w-4xl mx-auto px-4 text-[10px] text-gray-400 leading-relaxed text-left">
                        <h4 className="font-bold mb-2">【免責事項・注意事項】</h4>
                        <p className="mb-2">
                            ※本ページは、各証券会社の公式サイト等の情報を基に作成していますが、情報の正確性・完全性を保証するものではありません。
                            各社のキャンペーンや手数料体系は変更される場合がありますので、口座開設の際は必ず公式サイトで最新情報をご確認ください。
                        </p>
                        <p className="mb-2">
                            ※NISA口座および手数料無料条件等の詳細は、各証券会社の規定によります。投資信託や株式投資には元本割れのリスクがあります。
                        </p>
                        <p>
                            ※当サイトはアフィリエイト広告を利用しています。
                        </p>
                    </div>
                </div>
            }
        />
    );
};

export default SecuritiesComparison;
