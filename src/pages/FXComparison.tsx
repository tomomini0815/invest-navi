import Header from "@/components/layout/Header";
import TickerTape from "@/components/features/TickerTape";
import FXHeroSection from "@/components/features/FXHeroSection";
import SurveyDiagnostic from "@/components/features/SurveyDiagnostic";
import RankingCardV2 from "@/components/features/RankingCardV2";
import ComparisonTable from "@/components/features/ComparisonTable";
import Footer from "@/components/layout/Footer";
import { ComparisonPageTemplate } from "@/components/templates/ComparisonPageTemplate";
import { useState } from "react";

export const fxRankingList = [
  {
    id: "gmo",
    rank: 1,
    name: "GMOクリック証券（FXネオ）",
    rating: 4.8,
    points: [
      "FX取引高世界第1位！圧倒的な実績",
      "高機能取引ツール「はっちゅう君FX」",
      "スプレッド・スワップ共に業界最高水準"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "高機能チャート" },
      { label: "通貨ペア", value: "約30ペア" },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "【期間限定】最大550,000円キャッシュバックキャンペーン実施中！",
    affiliateUrl: "https://www.click-sec.com/corp/guide/fxneo/",
    detailUrl: "/fx/gmo-click",
    badgeText: "総合力No.1！迷ったらコレ"
  },
  {
    id: "dmm",
    rank: 2,
    name: "DMM FX",
    rating: 4.7,
    points: [
      "口座開設数 国内No.1",
      "LINEでのお問い合わせ24時間対応",
      "取引でDMMポイントが貯まる"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "高機能チャート" },
      { label: "通貨ペア", value: "約29ペア" },
      { label: "最小取引単位", value: "10,000通貨" },
    ],
    campaignText: "最大300,000円キャッシュバック！",
    affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=01004jqz00ol0m",
    detailUrl: "https://h.accesstrade.net/sp/cc?rk=01004jqz00ol0m",
    badgeText: "安心の国内口座数No.1"
  },
  {
    id: "sbi",
    rank: 3,
    name: "SBI FXトレード",
    rating: 4.5,
    points: [
      "1通貨から取引可能！少額から始められる",
      "業界最狭水準のスプレッド",
      "積立FXも可能"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.18銭", isHighlight: true },
      { label: "ツール・アプリ", value: "積立FX対応" },
      { label: "通貨ペア", value: "約34ペア" },
      { label: "最小取引単位", value: "1通貨", isHighlight: true },
    ],
    campaignText: "最大100万円キャッシュバック！",
    affiliateUrl: "https://www.sbifxt.co.jp/",
    detailUrl: "/fx/sbi-fx",
    badgeText: "少額取引・積立なら最強"
  },
  {
    id: "gaitame",
    rank: 4,
    name: "外為どっとコム",
    rating: 4.4,
    points: [
      "ニュース・情報コンテンツが圧倒的に豊富",
      "初心者向けセミナーを多数開催",
      "スマホアプリが使いやすく高機能"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "情報分析" },
      { label: "通貨ペア", value: "約30ペア" },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "最大100万円キャッシュバックキャンペーン",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "情報力・学びやすさNo.1"
  },
  {
    id: "matsui",
    rank: 5,
    name: "松井証券（MATSUI FX）",
    rating: 4.3,
    points: [
      "100円から取引可能！超少額スタート",
      "リピート系自動売買機能が使える",
      "老舗証券会社の安心感"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "自動売買" },
      { label: "通貨ペア", value: "約32ペア" },
      { label: "最小取引単位", value: "1通貨", isHighlight: true },
    ],
    campaignText: "最大100万円キャッシュバック実施中",
    affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=0100ohhx00ol0m",
    detailUrl: "https://h.accesstrade.net/sp/cc?rk=0100ohhx00ol0m",
    badgeText: "100円から始める自動売買"
  },
  {
    id: "hirose",
    rank: 6,
    name: "ヒロセ通商（LION FX）",
    rating: 4.3,
    points: [
      "スキャルピング公認！短期売買に最適",
      "毎月の豪華食品キャンペーンが大人気",
      "取扱通貨ペア54種類と豊富"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "高速注文" },
      { label: "通貨ペア", value: "約54ペア", isHighlight: true },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "最大100万円+豪華食品プレゼント！",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "食品CP＆スキャル公認"
  },
  {
    id: "line",
    rank: 7,
    name: "LINE FX",
    rating: 4.2,
    points: [
      "LINEアプリで重要な相場変動を通知",
      "直感的な操作で初心者も迷わない",
      "最短即日で口座開設完了"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "スマホ特化" },
      { label: "通貨ペア", value: "約35ペア" },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "口座開設+取引で最大305,000円！",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "スマホ通知・手軽さNo.1"
  },
  {
    id: "ig",
    rank: 8,
    name: "IG証券",
    rating: 4.2,
    points: [
      "取扱通貨ペア約100種類！圧倒的ラインナップ",
      "ノックアウトオプションなど多様な取引が可能",
      "世界的な信頼性を誇るグローバル企業"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "プロ仕様" },
      { label: "通貨ペア", value: "約100ペア", isHighlight: true },
      { label: "最小取引単位", value: "1万通貨" },
    ],
    campaignText: "最大50,000円キャッシュバック",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "通貨ペア数No.1"
  },
  {
    id: "minna",
    rank: 9,
    name: "みんなのFX",
    rating: 4.1,
    points: [
      "高水準のスワップポイント",
      "TradingViewチャートが無料で使える",
      "約定率99.9%の安定した取引"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "TradingView" },
      { label: "通貨ペア", value: "約46ペア" },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "最大100万円キャッシュバック！",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "TradingView x 高スワップ"
  },
  {
    id: "light",
    rank: 10,
    name: "LIGHT FX",
    rating: 4.0,
    points: [
      "スワップ運用に特化したLIGHTペア",
      "業界最狭水準のスプレッド",
      "シンプルで使いやすい取引ツール"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "TradingView" },
      { label: "通貨ペア", value: "約51ペア" },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "最大100万円キャッシュバック",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "スワップ運用ならココ"
  },
  {
    id: "triauto",
    rank: 11,
    name: "トライオートFX",
    rating: 4.0,
    points: [
      "リストから選ぶだけの簡単自動売買",
      "優秀なストラテジーが豊富",
      "自分だけの自動売買も作成可能"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.3銭", isHighlight: false },
      { label: "ツール・アプリ", value: "自動売買" },
      { label: "通貨ペア", value: "約23ペア" },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "新規口座開設で最大70,000円",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "選ぶだけの自動売買"
  },
  {
    id: "au",
    rank: 12,
    name: "auカブコム証券",
    rating: 3.9,
    points: [
      "MUFGグループの安心感と信頼性",
      "自動売買機能も搭載",
      "株式・投信との連携がスムーズ"
    ],
    specs: [
      { label: "スプレッド(ドル円)", value: "0.2銭", isHighlight: true },
      { label: "ツール・アプリ", value: "高機能ツール" },
      { label: "通貨ペア", value: "約30ペア" },
      { label: "最小取引単位", value: "1,000通貨" },
    ],
    campaignText: "最大100万円キャッシュバック",
    affiliateUrl: "#",
    detailUrl: "#",
    badgeText: "メガバンクグループの安心感"
  }
];


const FXComparison = () => {
  const comparisonData = [
    {
      id: "gmo",
      name: "GMOクリック証券",
      logoText: "GMO",
      detailUrl: "/fx/gmo-click",
      affiliateUrl: "https://www.click-sec.com/corp/guide/fxneo/",
      overallRating: 5,
      overallRatingText: "経験者向け",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 5,
      appUsabilityText: "使いやすい",
      demoPeriod: "1ヶ月",
      cashback: 550000,
      cashbackText: "最大55万",
      features: "スマホアプリが使いやすく情報配信量が充実！最短当日取引開始できる",
      goodPoints: [
        "スプレッドが業界最狭水準でコストを抑えられる",
        "高機能ツール「はっちゅう君FX」など取引環境が充実",
        "24時間サポートがあり初心者でも安心"
      ],
      startGuideSteps: [
        {
          title: "口座開設申し込み",
          description: <>スマホで本人確認なら<span className="text-orange-500 font-bold">最短即日</span>で取引開始可能！<br />フォーム入力は最短5分で完了します。</>
        },
        {
          title: "証拠金の入金",
          description: <>「即時入金サービス」なら24時間手数料無料。<br /><span className="text-emerald-600 font-bold">5,000円程度</span>から始められます。</>
        },
        {
          title: "取引スタート",
          description: <>アプリ「GMOクリック FXneo」をDL。<br />チャートを見ながらワンタップで注文完了！</>
        }
      ],
      guideTitle: "GMOクリック証券の始め方 3STEP",
      guideDescription: "高性能なツールと低コストな環境で、プロへの第一歩を。",
      campaign: "特典あり",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.5, spreadAudJpyText: "0.5銭",
      spreadGbpJpy: 0.9, spreadGbpJpyText: "0.9銭",
      spreadEurUsd: 0.3, spreadEurUsdText: "0.3pips"
    },
    {
      id: "dmm",
      name: "DMM FX",
      logoText: "DMM",
      detailUrl: "https://h.accesstrade.net/sp/cc?rk=01004jqz00ol0m",
      affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=01004jqz00ol0m",
      overallRating: 5,
      overallRatingText: "初心者向け",
      transactionUnit: 10000,
      transactionUnitText: "10,000通貨",
      appUsability: 5,
      appUsabilityText: "使いやすい",
      demoPeriod: "3ヶ月",
      cashback: 300000,
      cashbackText: "最大30万",
      features: "最短即日で取引できる！クイック入金も対応でFXを始めやすい",
      goodPoints: [
        "口座開設数が国内No.1で多くの利用者に選ばれている",
        "LINEで24時間365日お問い合わせが可能",
        "DMMポイントが貯まる・使える"
      ],
      startGuideSteps: [
        {
          title: "スマホでスピード本人確認",
          description: <>「スマホでスピード本人確認」を利用すれば<br /><span className="text-orange-500 font-bold">最短1時間</span>で取引スタート！</>
        },
        {
          title: "入金して準備完了",
          description: <>全国約340の金融機関から<span className="text-emerald-600 font-bold">手数料無料</span>でクイック入金が可能。<br />資金反映も即時です。</>
        },
        {
          title: "取引スタート",
          description: <>初心者でも直感的に操作できるアプリ。<br />まずはデモ取引で練習するのもおすすめ！</>
        }
      ],
      guideTitle: "DMM FXの始め方 3STEP",
      guideDescription: "LINEで気軽に質問できるから、初めてでも迷わず安心！",
      campaign: "CP実施中",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.5, spreadAudJpyText: "0.5銭",
      spreadGbpJpy: 0.9, spreadGbpJpyText: "0.9銭",
      spreadEurUsd: 0.3, spreadEurUsdText: "0.3pips"
    },
    {
      id: "sbi",
      name: "SBI FXトレード",
      logoText: "SBI",
      detailUrl: "/fx/sbi-fx",
      affiliateUrl: "https://www.sbifxt.co.jp/",
      overallRating: 4,
      overallRatingText: "積立向け",
      transactionUnit: 1,
      transactionUnitText: "1通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "なし",
      cashback: 1000000,
      cashbackText: "最大100万",
      features: "1円から取引可能！少額から始めたい人や自動売買との同時運用にも◎",
      goodPoints: [
        "1通貨単位（約4円）から取引可能でリスクが低い",
        "業界最狭水準のスプレッドを提供",
        "積立FXなど長期運用向けのサービスも充実"
      ],
      startGuideSteps: [
        {
          title: "口座開設申し込み",
          description: <>Web申し込みフォームから約5分で完了。<br />マイナンバーカードがあればスムーズです。</>
        },
        {
          title: "数百円を入金",
          description: <>SBI FXトレードは<span className="text-emerald-600 font-bold">1通貨</span>から。<br />お試しなら500円程度の入金でもOK！</>
        },
        {
          title: "少額取引スタート",
          description: <>まずは小さい金額で買い注文。<br />慣れてきたら積立設定も試してみましょう。</>
        }
      ],
      guideTitle: "SBI FXトレードの始め方 3STEP",
      guideDescription: "約5円から取引可能。お試し感覚でFXを体験してみましょう。",
      spreadUsdJpy: 0.18, spreadUsdJpyText: "0.18銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.5, spreadAudJpyText: "0.5銭",
      spreadGbpJpy: 0.9, spreadGbpJpyText: "0.9銭",
      spreadEurUsd: 0.3, spreadEurUsdText: "0.3pips"
    },
    {
      id: "gaitame",
      name: "外為どっとコム",
      logoText: "外為",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 4,
      overallRatingText: "情報豊富",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 5,
      appUsabilityText: "使いやすい",
      demoPeriod: "90日間",
      cashback: 1000000,
      cashbackText: "最大100万",
      features: "アプリ内機能が充実！本格的な分析ができる経験者向きFX口座",
      goodPoints: [
        "独自の情報コンテンツ「マネ育」が充実",
        "初心者向けのオンラインセミナーを多数開催",
        "スワップポイントが高水準で長期保有にも向く"
      ],
      startGuideSteps: [
        {
          title: "スマホ確認で開設",
          description: <>「スマホで本人確認」なら郵送不要。<br />最短即日でIDがメールで届きます。</>
        },
        {
          title: "入金",
          description: <>インターネットバンキングなどから<br />24時間手数料無料で入金できます。</>
        },
        {
          title: "取引＆学習",
          description: <>取引しながら、豊富なニュースやレポートで<br />相場の勉強も並行して進められます。</>
        }
      ],
      guideTitle: "外為どっとコムの始め方 3STEP",
      guideDescription: "豊富なニュースと「マネ育」コンテンツで、学びながら成長できます。",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 0.9, spreadGbpJpyText: "0.9銭",
      spreadEurUsd: 0.4, spreadEurUsdText: "0.4pips"
    },
    {
      id: "matsui",
      name: "松井証券",
      logoText: "松井",
      detailUrl: "https://h.accesstrade.net/sp/cc?rk=0100ohhx00ol0m",
      affiliateUrl: "https://h.accesstrade.net/sp/cc?rk=0100ohhx00ol0m",
      overallRating: 4,
      overallRatingText: "自動売買",
      transactionUnit: 1,
      transactionUnitText: "1通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "未対応",
      cashback: 100000,
      cashbackText: "最大10万",
      features: "100円から取引できる！少額から始めたい人におすすめ",
      goodPoints: [
        "100年の歴史を持つ老舗証券会社の安心感",
        "1通貨から取引可能で初心者も安心",
        "「FX自動売買」機能が使いやすい"
      ],
      startGuideSteps: [
        {
          title: "WEB申し込み",
          description: <>松井証券の総合口座をお持ちでない方は<br />同時に申し込みを行います。</>
        },
        {
          title: "入金",
          description: <>ネットリンク入金なら手数料無料。<br /><span className="text-emerald-600 font-bold">100円</span>から取引できるので少額でOK。</>
        },
        {
          title: "自動売買も設定可能",
          description: <>通常の裁量取引はもちろん、<br />簡単な設定で自動売買も始められます。</>
        }
      ],
      guideTitle: "松井証券の始め方 3STEP",
      guideDescription: "100円から自動売買も可能。リスクを抑えてコツコツ資産形成。",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.5, spreadEurJpyText: "0.5銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 1.0, spreadGbpJpyText: "1.0銭",
      spreadEurUsd: 0.4, spreadEurUsdText: "0.4pips"
    },
    {
      id: "hirose",
      name: "ヒロセ通商",
      logoText: "lion",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 4,
      overallRatingText: "スキャル",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "高機能",
      demoPeriod: "土日可",
      cashback: 1000000,
      cashbackText: "100万+食品",
      features: "スキャルピング公認！食品キャンペーンも豊富な人気業者",
      goodPoints: [
        "スキャルピング取引OKを公言している数少ない業者",
        "毎月の取引量に応じて豪華な食品がもらえる",
        "約定スピードが速くストレスがない"
      ],
      startGuideSteps: [
        {
          title: "口座開設",
          description: <>「スマホで本人確認」対応。<br />最短即日でIDとパスワードが発行されます。</>
        },
        {
          title: "入金してCP確認",
          description: <>入金後、今月の食品キャンペーン条件を<br />チェックして目標にするのも楽しみの一つ。</>
        },
        {
          title: "スキャルピングもOK",
          description: <>短期売買（スキャルピング）も公認。<br />アクティブに取引したい人に最適です。</>
        }
      ],
      guideTitle: "ヒロセ通商の始め方 3STEP",
      guideDescription: "スキャルピング公認！取引するほど食品が貰えて楽しみ倍増。",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 0.9, spreadGbpJpyText: "0.9銭",
      spreadEurUsd: 0.3, spreadEurUsdText: "0.3pips"
    },
    {
      id: "line",
      name: "LINE FX",
      logoText: "LINE",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 3,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 5,
      appUsabilityText: "使いやすい",
      demoPeriod: "未対応",
      cashback: 1005000,
      cashbackText: "最大100万",
      features: "2万円以上の入金と1万通貨以上の取引で5,000円プレゼント中",
      goodPoints: [
        "LINEアプリで経済指標や相場変動の通知が届く",
        "普段使い慣れたLINEアプリのような操作感",
        "口座開設が非常に簡単でスピーディー"
      ],
      startGuideSteps: [
        {
          title: "スマホ申し込み",
          description: <>LINEアプリから簡単に申し込み。<br />情報入力の手間が少なくスムーズです。</>
        },
        {
          title: "LINE Payからも入金",
          description: <>LINE Pay連携なら入金も一瞬。<br />銀行振込の手間がありません。</>
        },
        {
          title: "通知を受け取る",
          description: <>LINEで相場変動通知を設定すれば<br />チャンスを逃さず取引できます。</>
        }
      ],
      guideTitle: "LINE FXの始め方 3STEP",
      guideDescription: "いつものLINEで相場変動をお知らせ。隙間時間でチャンスを逃さない。",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 1.0, spreadGbpJpyText: "1.0銭",
      spreadEurUsd: 0.4, spreadEurUsdText: "0.4pips"
    },
    {
      id: "ig",
      name: "IG証券",
      logoText: "IG",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 4,
      overallRatingText: "プロ向け",
      transactionUnit: 10000,
      transactionUnitText: "1万通貨",
      appUsability: 4,
      appUsabilityText: "プロ仕様",
      demoPeriod: "あり",
      cashback: 50000,
      cashbackText: "最大5万",
      features: "通貨ペア約100種！ノックアウトオプションなど多様な取引が可能",
      goodPoints: [
        "FX以外にもCFDなど多様な金融商品を扱える",
        "「ノックアウトオプション」でリスク限定の取引が可能",
        "プロ仕様の高度なチャート分析ができる"
      ],
      startGuideSteps: [
        {
          title: "スマホ確認で開設",
          description: <>「スマホで本人確認」を利用すれば<br />郵送物の受け取り不要で開設可能です。</>
        },
        {
          title: "入金",
          description: <>クイック入金に対応。<br />まずは少額で試すことを推奨します。</>
        },
        {
          title: "多様な商品へ",
          description: <>FXだけでなく、ノックアウトオプションなど<br />幅広い投資手法に挑戦できます。</>
        }
      ],
      guideTitle: "IG証券の始め方 3STEP",
      guideDescription: "世界No.1のブランド。ノックアウトオプションなど多彩な戦略が可能。",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.5, spreadEurJpyText: "0.5銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 1.0, spreadGbpJpyText: "1.0銭",
      spreadEurUsd: 0.4, spreadEurUsdText: "0.4pips"
    },
    {
      id: "minna",
      name: "みんなのFX",
      logoText: "みんFX",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 4,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "30日間",
      cashback: 1000000,
      cashbackText: "最大100万",
      features: "約定力99.9%の実績で注文ミスが少ない点が◎",
      goodPoints: [
        "スワップポイントが業界最高水準",
        "TradingViewが無料で使える",
        "99.9%という高い約定力で思い通りの取引"
      ],
      startGuideSteps: [
        {
          title: "申し込み",
          description: <>スマホで本人確認を利用して申し込み。<br />最短1時間で口座開設が完了します。</>
        },
        {
          title: "ダイレクト入金",
          description: <>アプリから直接入金可能。<br />手数料無料でリアルタイム反映。</>
        },
        {
          title: "TradingView活用",
          description: <>アプリ内でTradingViewを表示。<br />高度な分析をして注文を出しましょう。</>
        }
      ],
      guideTitle: "みんなのFXの始め方 3STEP",
      guideDescription: "TradingViewで高度な分析。スワップポイントも高水準で長期保有も◎",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 0.9, spreadGbpJpyText: "0.9銭",
      spreadEurUsd: 0.3, spreadEurUsdText: "0.3pips"
    },
    {
      id: "light",
      name: "LIGHT FX",
      logoText: "LIGHT",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 3,
      overallRatingText: "スワップ",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "未対応",
      cashback: 1000000,
      cashbackText: "最大100万",
      features: "スワップ20%増額キャンペーン実施中！スプレッドは広め△",
      goodPoints: [
        "「LIGHTペア」ならスワップポイントが優遇される",
        "取引単位が1,000通貨からで手軽",
        "みんなのFXと同様にTradingViewが使える"
      ],
      startGuideSteps: [
        {
          title: "最短即日で開設",
          description: <>トレイダーズ証券が運営。<br />申し込みから最短即日で開設完了。</>
        },
        {
          title: "入金",
          description: <>約340行の金融機関に対応した<br />ダイレクト入金が便利です。</>
        },
        {
          title: "スワップ運用",
          description: <>高金利通貨の「LIGHTペア」を選んで<br />スワップポイント狙いの運用を開始！</>
        }
      ],
      guideTitle: "LIGHT FXの始め方 3STEP",
      guideDescription: "スワップ運用ならここ！高金利通貨でコツコツ利益を積み上げよう。",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.4, spreadEurJpyText: "0.4銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 0.9, spreadGbpJpyText: "0.9銭",
      spreadEurUsd: 0.3, spreadEurUsdText: "0.3pips"
    },
    {
      id: "triauto",
      name: "トライオートFX",
      logoText: "トライ",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 3,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "未対応",
      cashback: 20000,
      cashbackText: "最大2万",
      features: "自動売買だからプログラムを選ぶだけ！ツール手数料も無料",
      goodPoints: [
        "「セレクト」機能で優秀なプログラムを選ぶだけ",
        "自分だけの自動売買ロジックも作成できる",
        "ETF（上場投資信託）の自動売買も同じ口座で可能"
      ],
      startGuideSteps: [
        {
          title: "申し込み",
          description: <>インヴァスト証券で口座開設。<br />マイナンバーカードがあればスムーズです。</>
        },
        {
          title: "入金",
          description: <>即時入金サービスを利用して入金。<br />自動売買には多少余裕のある資金が推奨。</>
        },
        {
          title: "プログラム選択",
          description: <>ランキングから成績の良いプログラムを選んで<br />稼働させるだけで自動売買スタート。</>
        }
      ],
      guideTitle: "トライオートFXの始め方 3STEP",
      guideDescription: "プログラムを選ぶだけで自動売買。忙しいあなたに代わって24時間取引。",
      spreadUsdJpy: 0.3, spreadUsdJpyText: "0.3銭",
      spreadEurJpy: 0.5, spreadEurJpyText: "0.5銭",
      spreadAudJpy: 0.7, spreadAudJpyText: "0.7銭",
      spreadGbpJpy: 1.1, spreadGbpJpyText: "1.1銭",
      spreadEurUsd: 0.5, spreadEurUsdText: "0.5pips"
    },
    {
      id: "au",
      name: "auカブコム証券",
      logoText: "au",
      detailUrl: "#",
      affiliateUrl: "#",
      overallRating: 3,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "3ヶ月",
      cashback: 1000000,
      cashbackText: "最大100万",
      features: "MUFGグループの安心感。デモ取引も充実。",
      goodPoints: [
        "MUFG（三菱UFJフィナンシャル・グループ）の信頼性",
        "株や投資信託も同じIDで管理できる",
        "PCツールのチャート機能が非常に高性能"
      ],
      startGuideSteps: [
        {
          title: "au ID連携も可能",
          description: <>auユーザーなら個人情報入力が簡単。<br />もちろんau以外の方も申し込みOK。</>
        },
        {
          title: "入金",
          description: <>銀行口座からネット入金。<br />株式等と一緒に資金を一元管理できます。</>
        },
        {
          title: "取引",
          description: <>高機能なスマホアプリやPCツールを使って<br />自分のスタイルに合った取引を。</>
        }
      ],
      guideTitle: "auカブコム証券の始め方 3STEP",
      guideDescription: "MUFGグループの安心感。株や投信と資産を一元管理できて便利。",
      spreadUsdJpy: 0.2, spreadUsdJpyText: "0.2銭",
      spreadEurJpy: 0.5, spreadEurJpyText: "0.5銭",
      spreadAudJpy: 0.6, spreadAudJpyText: "0.6銭",
      spreadGbpJpy: 1.0, spreadGbpJpyText: "1.0銭",
      spreadEurUsd: 0.4, spreadEurUsdText: "0.4pips"
    }
  ];

  // State to track if a search has been performed
  return (
    <ComparisonPageTemplate
      metaTitle="FX業者徹底比較 | 投資総合ナビ"
      metaDescription="初心者におすすめのFX口座を徹底比較。スプレッド、スワップポイント、ツール、キャンペーンなど、最新の情報を元にランキング形式で紹介します。"
      categoryName="FX口座"
      heroSection={<FXHeroSection />}
      rankingList={fxRankingList}
      renderRankingCard={(item, index) => {
        const detailedSpecs = comparisonData.find((c) => c.id === item.id) || comparisonData[0];
        let customLogo;
        let promotionBanner;

        if (item.id === "dmm") {
          customLogo = (
            <a href="https://h.accesstrade.net/sp/cc?rk=01004iwt00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
              <img src="https://h.accesstrade.net/sp/rr?rk=01004iwt00ol0m" alt="【DMM FX】入金" style={{ border: 0 }} />
            </a>
          );
          promotionBanner = (
            <a href="https://h.accesstrade.net/sp/cc?rk=010072t900ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
              <img src="https://h.accesstrade.net/sp/rr?rk=010072t900ol0m" alt="【DMM FX】入金" style={{ border: 0 }} />
            </a>
          );
        } else if (item.id === "matsui") {
          customLogo = (
            <a href="https://h.accesstrade.net/sp/cc?rk=0100ohhu00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
              <img src="https://h.accesstrade.net/sp/rr?rk=0100ohhu00ol0m" alt="松井証券FX　新規口座開設獲得プロモーション" style={{ border: 0 }} />
            </a>
          );
          promotionBanner = (
            <a href="https://h.accesstrade.net/sp/cc?rk=0100ohhq00ol0m" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
              <img src="https://h.accesstrade.net/sp/rr?rk=0100ohhq00ol0m" alt="松井証券FX　新規口座開設獲得プロモーション" style={{ border: 0 }} />
            </a>
          );
        }

        return (
          <RankingCardV2
            key={item.name}
            id={item.id}
            {...item}
            detailedSpecs={detailedSpecs}
            customLogo={customLogo}
            promotionBanner={promotionBanner}
          />
        );
      }}
      renderComparisonTable={() => (
        <ComparisonTable data={comparisonData} />
      )}
      disclaimerText={
        <div className="mt-2 text-left">
          <div className="text-[10px] sm:text-xs text-slate-400 space-y-1 leading-relaxed">
            <p>※FX取引にはリスクが伴います、元本や利益を保証するものではありません</p>
            <p>※相場の変動により損失が発生する可能性があります</p>
            <p>※取引を始める前に、リスクについて十分に理解した上で、ご自身の判断で行ってください</p>
            <p>※最新の情報や詳細な数値を確認する際は、必ず各社の公式サイトや最新の取引約款・告知文書をチェックしてください</p>
          </div>
        </div>
      }
    />
  );
};

export default FXComparison;