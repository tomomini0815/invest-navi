import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink, ChevronDown, ChevronUp, Star, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

interface FXBroker {
  name: string;
  spread: string;
  minTradeUnit: string;
  currencyPairs: number;
  buySwapPoints: string;
  sellSwapPoints: string;
  scalping: string;
  rating: number;
  affiliateUrl: string;
  isDomestic: boolean;
  features: string; // 各FX業者の特徴を追加
}

const FXComparisonTable = () => {
  const [sortBy, setSortBy] = useState<keyof FXBroker | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showDomestic, setShowDomestic] = useState<boolean>(true);

  const domesticBrokers: FXBroker[] = [
    // 国内FX業者（人気ランキング順）
    {
      name: "GMOクリック証券（FXネオ）",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 20,
      buySwapPoints: "ドル円: 約230円\nポンド円: 約280円\nユーロ円: 約210円",
      sellSwapPoints: "ドル円: 約-230円\nポンド円: 約-280円\nユーロ円: 約-210円",
      scalping: "非推奨（明記なし）",
      rating: 5,
      affiliateUrl: "https://www.click-sec.com/",
      isDomestic: true,
      features: "高機能取引ツール、低スプレッド、通貨ペア数が多い",
    },
    {
      name: "DMM FX",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "10,000通貨",
      currencyPairs: 21,
      buySwapPoints: "ドル円: 約225円\nポンド円: 約270円\nユーロ円: 約205円",
      sellSwapPoints: "ドル円: 約-225円\nポンド円: 約-270円\nユーロ円: 約-205円",
      scalping: "非推奨",
      rating: 5,
      affiliateUrl: "https://fx.dmm.com/",
      isDomestic: true,
      features: "初心者向け、LINEサポート対応、最短当日取引開始、スワップポイントが高い",
    },
    {
      name: "SBI FXトレード",
      spread: "米ドル/円 0.18銭～",
      minTradeUnit: "1通貨",
      currencyPairs: 34,
      buySwapPoints: "ドル円: 約240円\nポンド円: 約290円\nユーロ円: 約215円",
      sellSwapPoints: "ドル円: 約-240円\nポンド円: 約-290円\nユーロ円: 約-215円",
      scalping: "可能",
      rating: 5,
      affiliateUrl: "https://www.sbifxt.co.jp/",
      isDomestic: true,
      features: "1通貨から取引可能、業界最狭水準スプレッド、スワップポイントが高い",
    },
    {
      name: "IG証券FX",
      spread: "米ドル/円 0.2～0.4銭",
      minTradeUnit: "10,000通貨",
      currencyPairs: 100,
      buySwapPoints: "ドル円: 約262円\nポンド円: 約288円\nユーロ円: 約216円",
      sellSwapPoints: "ドル円: 約-262円\nポンド円: 約-288円\nユーロ円: 約-216円",
      scalping: "過度でない限り可能(推奨はしていない)",
      rating: 5,
      affiliateUrl: "https://www.ig.com/jp/",
      isDomestic: true,
      features: "約100種類の通貨ペア取引可能、最大保有数量無制限、ノックアウトオプション取引可能、FX・CFD・バイナリーオプションを1口座で取引",
    },
    {
      name: "松井証券 MATSUI FX",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1通貨",
      currencyPairs: 20,
      buySwapPoints: "ドル円: 約235円\nポンド円: 約275円\nユーロ円: 約208円",
      sellSwapPoints: "ドル円: 約-235円\nポンド円: 約-275円\nユーロ円: 約-208円",
      scalping: "可能",
      rating: 4,
      affiliateUrl: "https://www.matsui.co.jp/fx/",
      isDomestic: true,
      features: "1通貨から取引可能、老舗証券会社の信頼性、サポート充実、通貨ペア数が多い",
    },
    {
      name: "外為どっとコム（外貨ネクストネオ）",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 30,
      buySwapPoints: "ドル円: 約238円\nポンド円: 約285円\nユーロ円: 約212円",
      sellSwapPoints: "ドル円: 約-238円\nポンド円: 約-285円\nユーロ円: 約-212円",
      scalping: "可能",
      rating: 5,
      affiliateUrl: "https://www.gaitame.com/",
      isDomestic: true,
      features: "情報コンテンツ充実、セミナー豊富、分析ツール高性能、通貨ペア数が多い",
    },
    {
      name: "みんなのFX（トレイダーズ証券）",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 34,
      buySwapPoints: "ドル円: 約242円\nポンド円: 約288円\nユーロ円: 約218円",
      sellSwapPoints: "ドル円: 約-242円\nポンド円: 約-288円\nユーロ円: 約-218円",
      scalping: "可能",
      rating: 4,
      affiliateUrl: "https://min-fx.jp/",
      isDomestic: true,
      features: "高水準スワップポイント、シンプルな取引画面、初心者向け、通貨ペア数が多い",
    },
    {
      name: "ヒロセ通商（LION FX）",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 54,
      buySwapPoints: "ドル円: 約232円\nポンド円: 約278円\nユーロ円: 約206円",
      sellSwapPoints: "ドル円: 約-232円\nポンド円: 約-278円\nユーロ円: 約-206円",
      scalping: "公認",
      rating: 4,
      affiliateUrl: "https://hirose-fx.co.jp/",
      isDomestic: true,
      features: "スキャルピング公認、通貨ペア数最多クラス、キャンペーン豊富、スワップポイントが高い",
    },
    {
      name: "GMO外貨（外貨ex）",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 24,
      buySwapPoints: "ドル円: 約228円\nポンド円: 約272円\nユーロ円: 約203円",
      sellSwapPoints: "ドル円: 約-228円\nポンド円: 約-272円\nユーロ円: 約-203円",
      scalping: "条件付き可能",
      rating: 4,
      affiliateUrl: "https://www.gaikaex.com/",
      isDomestic: true,
      features: "スマホアプリ高性能、PayPayポイント付与、GMOグループ、通貨ペア数が多い",
    },
    {
      name: "楽天証券（楽天FX）",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 28,
      buySwapPoints: "ドル円: 約227円\nポンド円: 約268円\nユーロ円: 約200円",
      sellSwapPoints: "ドル円: 約-227円\nポンド円: 約-268円\nユーロ円: 約-200円",
      scalping: "非推奨",
      rating: 4,
      affiliateUrl: "https://www.rakuten-sec.co.jp/web/fx/",
      isDomestic: true,
      features: "楽天ポイントが貯まる、楽天証券口座と連携、MT4対応、スワップポイントが高い",
    },
    {
      name: "三菱UFJ eスマート証券 FX",
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 19,
      buySwapPoints: "ドル円: 約225円\nポンド円: 約265円\nユーロ円: 約198円",
      sellSwapPoints: "ドル円: 約-225円\nポンド円: 約-265円\nユーロ円: 約-198円",
      scalping: "非推奨",
      rating: 4,
      affiliateUrl: "https://kabu.com/fx/",
      isDomestic: true,
      features: "三菱UFJグループ、Pontaポイント付与、株式との連携、通貨ペア数が多い",
    },
  ];

  const foreignBrokers: FXBroker[] = [
    // 海外FX業者（人気ランキング順）
    {
      name: "XMTrading（エックスエム）",
      spread: "米ドル/円 1.6pips（スタンダード口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 57,
      buySwapPoints: "ドル円: -8.5/+2.5USD\nポンド円: -12.3/+3.8USD\nユーロ円: -10.2/+3.1USD",
      sellSwapPoints: "ドル円: -8.5USD\nポンド円: -12.3USD\nユーロ円: -10.2USD",
      scalping: "可能",
      rating: 5,
      affiliateUrl: "https://www.xmtrading.com/",
      isDomestic: false,
      features: "最大1000倍レバレッジ、豪華ボーナス、日本語サポート完備、運営実績15年以上、通貨ペア数が多い",
    },
    {
      name: "FXGT（エフエックスジーティー）",
      spread: "米ドル/円 1.5pips（スタンダード+口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 53,
      buySwapPoints: "ドル円: -7.8/+2.2USD\nポンド円: -11.5/+3.5USD\nユーロ円: -9.8/+2.9USD",
      sellSwapPoints: "ドル円: -7.8USD\nポンド円: -11.5USD\nユーロ円: -9.8USD",
      scalping: "可能",
      rating: 5,
      affiliateUrl: "https://fxgt.com/",
      isDomestic: false,
      features: "最大1000倍レバレッジ、仮想通貨FXに強い、充実のボーナス、新興ながら急成長、通貨ペア数が多い",
    },
    {
      name: "Exness（エクスネス）",
      spread: "米ドル/円 1.1pips（スタンダード口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 95,
      buySwapPoints: "ドル円: -6.9/+1.8USD\nポンド円: -10.2/+2.9USD\nユーロ円: -8.5/+2.3USD",
      sellSwapPoints: "ドル円: -6.9USD\nポンド円: -10.2USD\nユーロ円: -8.5USD",
      scalping: "可能",
      rating: 5,
      affiliateUrl: "https://www.exness.com/",
      isDomestic: false,
      features: "無制限レバレッジ、低スプレッド、ボーナスなしでスペック重視、高速約定、通貨ペア数が多い",
    },
    {
      name: "TitanFX（タイタンエフエックス）",
      spread: "米ドル/円 1.33pips（スタンダード口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 60,
      buySwapPoints: "ドル円: -7.2/+2.0USD\nポンド円: -10.8/+3.2USD\nユーロ円: -9.1/+2.6USD",
      sellSwapPoints: "ドル円: -7.2USD\nポンド円: -10.8USD\nユーロ円: -9.1USD",
      scalping: "可能（推奨）",
      rating: 4,
      affiliateUrl: "https://titanfx.com/",
      isDomestic: false,
      features: "最大500倍レバレッジ、低スプレッド、スキャルピング特化、高い約定力、通貨ペア数が多い",
    },
    {
      name: "AXIORY（アキシオリー）",
      spread: "米ドル/円 1.3pips（スタンダード口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 61,
      buySwapPoints: "ドル円: -7.5/+2.3USD\nポンド円: -11.0/+3.3USD\nユーロ円: -9.3/+2.7USD",
      sellSwapPoints: "ドル円: -7.5USD\nポンド円: -11.0USD\nユーロ円: -9.3USD",
      scalping: "可能",
      rating: 4,
      affiliateUrl: "https://www.axiory.com/",
      isDomestic: false,
      features: "最大400倍レバレッジ、透明性の高い運営、cTrader対応、信託保全あり、通貨ペア数が多い",
    },
    {
      name: "ThreeTrader（スリートレーダー）",
      spread: "米ドル/円 0.5pips～（Rawゼロ口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 40,
      buySwapPoints: "ドル円: -6.5/+1.5USD\nポンド円: -9.8/+2.5USD\nユーロ円: -8.2/+2.0USD",
      sellSwapPoints: "ドル円: -6.5USD\nポンド円: -9.8USD\nユーロ円: -8.2USD",
      scalping: "可能",
      rating: 4,
      affiliateUrl: "https://www.threetrader.com/",
      isDomestic: false,
      features: "最大500倍レバレッジ、業界最狭スプレッド、低コスト特化、取引制限なし、通貨ペア数が多い",
    },
    {
      name: "HFM（旧HotForex）",
      spread: "米ドル/円 1.6pips（プレミアム口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 53,
      buySwapPoints: "ドル円: -8.0/+2.4USD\nポンド円: -11.8/+3.6USD\nユーロ円: -9.9/+3.0USD",
      sellSwapPoints: "ドル円: -8.0USD\nポンド円: -11.8USD\nユーロ円: -9.9USD",
      scalping: "可能",
      rating: 4,
      affiliateUrl: "https://www.hfm.com/",
      isDomestic: false,
      features: "最大1000倍レバレッジ、豊富なボーナス、多数の受賞歴、コピートレード充実、通貨ペア数が多い",
    },
    {
      name: "BigBoss（ビッグボス）",
      spread: "米ドル/円 1.4pips（スタンダード口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 41,
      buySwapPoints: "ドル円: -7.6/+2.1USD\nポンド円: -11.2/+3.1USD\nユーロ円: -9.4/+2.5USD",
      sellSwapPoints: "ドル円: -7.6USD\nポンド円: -11.2USD\nユーロ円: -9.4USD",
      scalping: "可能",
      rating: 4,
      affiliateUrl: "https://www.bigboss-financial.com/",
      isDomestic: false,
      features: "最大1111倍レバレッジ、日本語サポート充実、独自のBBPポイント制度、取引制限少ない、通貨ペア数が多い",
    },
    {
      name: "iFOREX（アイフォレックス）",
      spread: "米ドル/円 0.7pips～",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 86,
      buySwapPoints: "ドル円: -7.8/+2.2USD\nポンド円: -11.5/+3.4USD\nユーロ円: -9.7/+2.8USD",
      sellSwapPoints: "ドル円: -7.8USD\nポンド円: -11.5USD\nユーロ円: -9.7USD",
      scalping: "制限あり",
      rating: 4,
      affiliateUrl: "https://www.iforex.jpn.com/",
      isDomestic: false,
      features: "最大400倍レバレッジ、運営歴25年以上の老舗、独自プラットフォーム、初回入金ボーナス豪華、通貨ペア数が多い",
    },
    {
      name: "TradeView（トレードビュー）",
      spread: "米ドル/円 0.2pips～（ILC口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 60,
      buySwapPoints: "ドル円: -6.3/+1.2USD\nポンド円: -9.5/+2.2USD\nユーロ円: -8.0/+1.8USD",
      sellSwapPoints: "ドル円: -6.3USD\nポンド円: -9.5USD\nユーロ円: -8.0USD",
      scalping: "可能",
      rating: 4,
      affiliateUrl: "https://www.tradeviewforex.com/",
      isDomestic: false,
      features: "最大400倍レバレッジ、超低スプレッド、ECN特化、cTrader/MT5対応、上級者向け、通貨ペア数が多い",
    },
  ];

  const companies = showDomestic ? domesticBrokers : foreignBrokers;

  // 表示するFX業者をフィルタリング
  const filteredCompanies = companies.filter(company =>
    showDomestic ? company.isDomestic : !company.isDomestic
  );

  const handleSort = (key: keyof FXBroker) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (!sortBy) {
      // デフォルトでは評価順にソート
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return 0;
    }

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // 評価を星アイコンで表示するコンポーネント
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  // モバイル向けカードコンポーネント
  const MobileCompanyCard = ({ company }: { company: FXBroker }) => (
    <Card className="mb-4 shadow-md border border-border bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex justify-between items-center">
          <span>{company.name}</span>
          <Badge variant="secondary" className="text-xs">
            {company.currencyPairs}通貨ペア
          </Badge>
        </CardTitle>
        {company.name === "DMM FX" && (
          <div className="mt-2">
            <a href="https://h.accesstrade.net/sp/cc?rk=01004oa800ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
              <img src="https://h.accesstrade.net/sp/rr?rk=01004oa800ol0m" alt="【DMM FX】入金" style={{ border: '0' }} />
            </a>
          </div>
        )}
      </CardHeader>
      {/* 詳細情報ボタンを会社名下に配置 */}
      <Button
        size="sm"
        className="text-xs py-2 bg-blue-100 text-primary hover:bg-blue-200 shadow-md hover:shadow-lg transition-all duration-300 justify-between"
        asChild
      >
        <a
          href={company.affiliateUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          詳細情報
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">スプレッド</p>
            <p className="font-semibold">{company.spread}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">最低取引単位</p>
            <p className="font-semibold">{company.minTradeUnit}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">スキャルピング</span>
          <div className="text-xs">{company.scalping}</div>
        </div>

        {/* 国内業者の場合、古いスワップポイント表示を削除 */}
        {/* {company.isDomestic && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">スワップポイント(売)</span>
              <div className="text-xs whitespace-pre-line">{company.sellSwapPoints}</div>
            </div>
          </div>
        )} */}

        <div>
          <p className="text-muted-foreground text-xs mb-1">評価</p>
          <RatingStars rating={company.rating} />
        </div>

        {/* 特徴を追加 */}
        <div>
          <p className="text-muted-foreground text-xs mb-1">特徴</p>
          <p className="text-sm">{company.features}</p>
        </div>

        <Button
          size="sm"
          className="w-full text-xs py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 justify-center"
          asChild
        >
          <a
            href={company.name === "DMM FX" ? "https://h.accesstrade.net/sp/cc?rk=01004ixl00ol0m" : company.affiliateUrl}
            target="_blank"
            rel={company.name === "DMM FX" ? "nofollow noopener" : "noopener noreferrer"}
            referrerPolicy={company.name === "DMM FX" ? "no-referrer-when-downgrade" : undefined}
          >
            {company.name === "DMM FX" ? (
              <>
                公式サイトへ
                <img src="https://h.accesstrade.net/sp/rr?rk=01004ixl00ol0m" width="1" height="1" style={{ border: '0' }} alt="" />
                <ExternalLink className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                公式サイトへ
                <ExternalLink className="ml-1 h-3 w-3" />
              </>
            )}
          </a>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="px-4 sm:px-6 pb-4">
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">FX業者詳細比較表</CardTitle>
        <p className="text-sm text-muted-foreground text-center mt-4">
          各FX業者のスプレッド、最低取引単位、通貨ペア数、スワップポイント、スキャルピング可否、評価などの情報を比較できます
        </p>
        {/* 国内/国外切り替えボタン */}
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant={showDomestic ? "default" : "outline"}
            onClick={() => setShowDomestic(true)}
            className="px-6 py-2"
          >
            国内FX業者
          </Button>
          <Button
            variant={!showDomestic ? "default" : "outline"}
            onClick={() => setShowDomestic(false)}
            className="px-6 py-2"
          >
            海外FX業者
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* モバイル向け表示 - 768px未満で表示 */}
        <div className="md:hidden px-4 py-2">
          {sortedCompanies.map((company) => (
            <MobileCompanyCard key={company.name} company={company} />
          ))}
        </div>

        {/* デスクトップ向け表示 - 768px以上で表示 */}
        <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="px-4 sm:px-6">
              <Table className="min-w-[600px]">
                <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
                  <TableRow className="hover:bg-muted/50 border-b-2 border-primary/20">
                    <TableHead className="min-w-[120px] text-xs sm:text-sm font-bold text-primary whitespace-nowrap">FX業者</TableHead>
                    <TableHead className="min-w-[180px] text-xs sm:text-sm font-bold text-primary whitespace-nowrap">スプレッド</TableHead>
                    <TableHead className="min-w-[80px] text-xs sm:text-sm font-bold text-primary whitespace-nowrap">最低取引単位</TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-muted/50 min-w-[80px] text-xs sm:text-sm font-bold text-primary whitespace-nowrap"
                      onClick={() => handleSort("currencyPairs")}
                    >
                      <div className="flex items-center justify-between">
                        <span>通貨ペア数</span>
                        {sortBy === "currencyPairs" && (
                          <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[80px] text-xs sm:text-sm font-bold text-primary whitespace-nowrap">スキャルピング</TableHead>
                    <TableHead className="min-w-[120px] text-xs sm:text-sm font-bold text-primary whitespace-nowrap">評価</TableHead>
                    <TableHead className="min-w-[200px] text-xs sm:text-sm font-bold text-primary whitespace-nowrap">特徴</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCompanies.map((company) => (
                    <TableRow
                      key={company.name}
                      className="hover:bg-primary/5 transition-colors duration-200 border-b border-muted"
                    >
                      <TableCell className="font-semibold text-xs sm:text-sm py-3">
                        {company.name}
                        {/* 詳細情報ボタンを追加 */}
                        <div className="mt-2 text-center">
                          <Button
                            size="sm"
                            className="w-full text-xs py-2 bg-blue-100 text-primary hover:bg-blue-200 shadow-md hover:shadow-lg transition-all duration-300 justify-between"
                            asChild
                          >
                            <a
                              href={company.affiliateUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              詳細情報
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm py-3 whitespace-pre-line" dangerouslySetInnerHTML={{
                        __html: company.spread
                          .replace(/([\d.]+)(pips)/g, '<span class="font-semibold">$1</span>$2')
                          .replace(/([\d.]+)(銭)/g, '<span class="font-semibold">$1</span>$2')
                          .replace(/([\d.]+)(～)/g, '<span class="font-semibold">$1</span>$2')
                          .replace(/(\([^)]+\))/g, '\n$1')
                      }} />
                      <TableCell className="text-xs sm:text-sm py-3">{company.minTradeUnit}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-3">{company.currencyPairs}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-3">{company.scalping}</TableCell>
                      <TableCell className="py-3">
                        <RatingStars rating={company.rating} />
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm py-3 break-words max-w-[200px]">
                        <div className="grid grid-cols-1 gap-1">
                          {(() => {
                            const features = company.features.split('、');
                            // 指定された特徴のキーワードを定義
                            const additionalHighlightedKeywords = [
                              'FX取引高世界第1位', '高機能取引ツール',
                              'LINEサポート対応', '最短当日取引開始',
                              '老舗証券会社の信頼性', 'サポート充実',
                              '楽天ポイントが貯まる',
                              'Pontaポイント付与', '株式との連携'
                            ];

                            // 業界標準クラスのキーワードを定義
                            const industryStandardKeywords = ['最大', '最多', '最狭', '高機能', '高性能', '業界', 'クラス'];

                            // マーカーを適用する特徴のリスト
                            const highlightedFeatures = [];

                            // 既存の重要な特徴にマーカーをつける（業界標準クラスを除く）
                            features.forEach((feature, index) => {
                              const isIndustryStandard = industryStandardKeywords.some(keyword => feature.includes(keyword));
                              const hasImportantKeyword = (
                                feature.includes('最大') || feature.includes('最多') || feature.includes('最狭') ||
                                feature.includes('高機能') || feature.includes('高性能') || feature.includes('業界') ||
                                feature.includes('クラス')
                              );
                              const shouldHighlightExisting = hasImportantKeyword && !isIndustryStandard;

                              // 指定された特徴にマーカーをつける
                              const shouldHighlightAdditional = additionalHighlightedKeywords.some(keyword => feature.includes(keyword));

                              // どちらかの条件に該当する場合にマーカーをつける
                              if (shouldHighlightExisting || shouldHighlightAdditional) {
                                highlightedFeatures.push({ index, feature, highlighted: true });
                              } else {
                                highlightedFeatures.push({ index, feature, highlighted: false });
                              }
                            });

                            // 最低1つ〜2つまで重要ポイントにマーカーをつける
                            let highlightCount = 0;
                            const maxHighlights = 2;

                            return features.map((feature, index) => {
                              let shouldHighlight = false;

                              // 既存のロジックでマーカーをつけるべき特徴
                              const isIndustryStandard = industryStandardKeywords.some(keyword => feature.includes(keyword));
                              const hasImportantKeyword = (
                                feature.includes('最大') || feature.includes('最多') || feature.includes('最狭') ||
                                feature.includes('高機能') || feature.includes('高性能') || feature.includes('業界') ||
                                feature.includes('クラス')
                              );
                              const shouldHighlightExisting = hasImportantKeyword && !isIndustryStandard;

                              // 指定された特徴にマーカーをつける
                              const shouldHighlightAdditional = additionalHighlightedKeywords.some(keyword => feature.includes(keyword));

                              // どちらかの条件に該当する場合にマーカーをつける
                              if (shouldHighlightExisting || shouldHighlightAdditional) {
                                shouldHighlight = true;
                                highlightCount++;
                              } else if (highlightCount < maxHighlights) {
                                // マーカーがまだ2つ未満の場合、他の特徴にもマーカーをつける
                                shouldHighlight = true;
                                highlightCount++;
                              }

                              return (
                                <div key={index} className="flex items-start">
                                  <span className={shouldHighlight || (index > 0 && features[index - 1] && (() => {
                                    // 前の要素がハイライトされているかチェック
                                    const prevFeature = features[index - 1];
                                    const isPrevIndustryStandard = industryStandardKeywords.some(keyword => prevFeature.includes(keyword));
                                    const hasPrevImportantKeyword = (
                                      prevFeature.includes('最大') || prevFeature.includes('最多') || prevFeature.includes('最狭') ||
                                      prevFeature.includes('高機能') || prevFeature.includes('高性能') || prevFeature.includes('業界') ||
                                      prevFeature.includes('クラス')
                                    );
                                    const shouldHighlightPrevExisting = hasPrevImportantKeyword && !isPrevIndustryStandard;
                                    const shouldHighlightPrevAdditional = additionalHighlightedKeywords.some(keyword => prevFeature.includes(keyword));
                                    return shouldHighlightPrevExisting || shouldHighlightPrevAdditional;
                                  })()) ? "bg-yellow-200 dark:bg-yellow-600 px-1 mr-1" : "mr-1"}>
                                    {shouldHighlight ?
                                      <span className="bg-yellow-200 dark:bg-yellow-600 px-1">{feature}</span> :
                                      feature
                                    }
                                  </span>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <Button
                          size="sm"
                          className="whitespace-nowrap text-xs px-3 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 min-w-[130px]"
                          asChild
                        >
                          <a
                            href={company.name === "DMM FX" ? "https://h.accesstrade.net/sp/cc?rk=0100kz3n00ol0m" : company.affiliateUrl}
                            target="_blank"
                            rel={company.name === "DMM FX" ? "nofollow noopener" : "noopener noreferrer"}
                            referrerPolicy={company.name === "DMM FX" ? "no-referrer-when-downgrade" : undefined}
                          >
                            {company.name === "DMM FX" ? (
                              <>
                                DMM FX公式サイトへ
                                <img src="https://h.accesstrade.net/sp/rr?rk=0100kz3n00ol0m" width="1" height="1" style={{ border: '0' }} alt="" />
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </>
                            ) : company.name === "松井証券 MATSUI FX" ? (
                              <>
                                詳細を見る
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </>
                            ) : (
                              <>
                                公式サイト
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </>
                            )}
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4 px-4 sm:hidden">
            ← 横にスクロールして全項目を確認できます →
          </p>
        </div>
      </CardContent>
      <div className="px-4 sm:px-6 pb-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-bold">注意事項:</span>
                <br />
                <span className="block mt-1">・スプレッドはリアルタイム相場やキャンペーン、時間帯によっても変動します。</span>
                <span className="block mt-1">・スキャルピングの可否は明示的に禁止していない場合でも、約定拒否やレート配信などで事実上制限される場合があります。</span>
                <span className="block mt-1">・評価はあくまで一般的なユーザーの声や取引条件の傾向を総合的に見た参考レベルです。</span>
                <span className="block mt-1">・最新の情報や詳細な数値を確認する際は、必ず各社の公式サイトや最新の取引約款・告知文書をチェックしてください。</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FXComparisonTable;