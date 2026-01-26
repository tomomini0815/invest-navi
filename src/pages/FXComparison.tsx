import Header from "@/components/layout/Header";
import TickerTape from "@/components/features/TickerTape";
import FXHeroSection from "@/components/features/FXHeroSection";
import SurveyDiagnostic, { Company } from "@/components/features/SurveyDiagnostic";
import RankingCardV2 from "@/components/features/RankingCardV2";
import ComparisonTable from "@/components/features/ComparisonTable";
import Footer from "@/components/layout/Footer";
import { ComparisonPageTemplate } from "@/components/templates/ComparisonPageTemplate";
import { useState } from "react";

export const fxRankingList = [
  {
    id: "gmo",
    rank: 1,
    name: "GMOクリック証券 FXネオ",
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
    detailUrl: "https://www.click-sec.com/corp/guide/fxneo/",
    badgeText: "総合力No.1！迷ったらコレ"
  },
  {
    id: "dmm",
    rank: 2,
    name: "DMM.com証券 DMM FX",
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
    detailUrl: "https://www.sbifxt.co.jp/",
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
    name: "松井証券 MATSUI FX",
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
    name: "ヒロセ通商 LION FX",
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
    name: "LINE証券 LINE FX",
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
    name: "トレイダーズ証券 みんなのFX",
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
    name: "トレイダーズ証券 LIGHT FX",
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
    name: "インヴァスト証券 トライオートFX",
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
      logoText: "GMOクリック証券",
      detailUrl: "https://www.click-sec.com/corp/guide/fxneo/",
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
      tableFeatures: "スマホアプリが使いやすく情報配信量が充実！最短当日取引開始できる",
      features: "GMOクリック証券は、FX取引高で世界第1位を誇る業界最大手のFX会社です。スプレッドは業界最狭水準の0.2銭（米ドル/円）を提供し、取引コストを徹底的に抑えられます。高機能取引ツール「はっちゅう君FX」や「プラチナチャート」は、初心者からプロトレーダーまで幅広く支持されています。スマホアプリ「GMOクリック FXneo」は直感的な操作性と豊富な情報配信で、外出先でも快適な取引環境を実現。24時間サポート体制も整っており、FX初心者でも安心して取引を始められます。",
      goodPoints: [
        "FX取引高世界第1位の圧倒的な実績と信頼性。多くのトレーダーに選ばれ続けている安心感",
        "スプレッドが業界最狭水準（米ドル/円0.2銭）でコストを最小限に抑えられる",
        "高機能ツール「はっちゅう君FX」「プラチナチャート」で本格的なテクニカル分析が可能",
        "24時間電話・メールサポート対応で、初心者でも安心して取引できる環境",
        "スマホアプリ「FXneo」は使いやすさと機能性を両立し、外出先でも快適に取引可能"
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
      logoText: "DMM FX",
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
      tableFeatures: "最短即日で取引できる！クイック入金も対応でFXを始めやすい",
      features: "DMM FXは、口座開設数が国内No.1を誇る人気のFX会社です。スプレッドは業界最狭水準で、米ドル/円0.2銭という低コストで取引できます。最大の特徴は、LINEで24時間365日いつでも問い合わせができるサポート体制。FX初心者でも気軽に質問でき、疑問をすぐに解決できます。取引でDMMポイントが貯まり、貯まったポイントは1ポイント=1円で現金化可能。スマホアプリは初心者向けの「かんたんモード」と上級者向けの「ノーマルモード」を切り替えられ、レベルに応じた最適な取引環境を提供します。最短即日で取引開始できるスピード感も魅力です。",
      goodPoints: [
        "口座開設数が国内No.1で、多くの投資家に選ばれている圧倒的な人気と実績",
        "LINEで24時間365日お問い合わせが可能。初心者でも気軽に質問できる安心サポート",
        "取引でDMMポイントが貯まり、1ポイント=1円で現金化できるお得な還元システム",
        "スマホアプリは2つのモード搭載で、初心者から上級者まで使いやすい設計",
        "スプレッドは業界最狭水準（米ドル/円0.2銭）で取引コストを徹底的に削減"
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
      logoText: "SBI FXトレード",
      detailUrl: "https://www.sbifxt.co.jp/",
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
      tableFeatures: "1円から取引可能！少額から始めたい人や自動売買との同時運用にも◎",
      features: "SBI FXトレードは、1通貨（約4円）から取引できる業界唯一の超少額取引対応FX会社です。スプレッドは業界最狭水準の0.18銭（米ドル/円）を提供し、少額でもコストを抑えた取引が可能。積立FXサービスでは、毎日・毎週・毎月など自分のペースで自動的に外貨を購入でき、ドルコスト平均法による長期的な資産形成に最適です。取引量に応じてポイントが貯まり、現金やマイルに交換可能。初心者が少額でFXを体験したい場合や、自動売買と併用してリスク分散したい上級者まで、幅広いニーズに対応できる柔軟性が魅力です。",
      goodPoints: [
        "1通貨単位（約4円）から取引可能で、FX初心者でも気軽に始められる超少額対応",
        "業界最狭水準のスプレッド（米ドル/円0.18銭）で、少額取引でもコストを最小化",
        "積立FXサービスで、ドルコスト平均法による計画的な資産形成が可能",
        "取引量に応じてポイントが貯まり、現金やマイルに交換できるお得な特典",
        "少額から始められるため、リスクを抑えながらFXの経験を積める"
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
      logoText: "外為どっとコム",
      detailUrl: "#",
      affiliateUrl: "https://www.gaitame.com/",
      overallRating: 4,
      overallRatingText: "情報豊富",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 5,
      appUsabilityText: "使いやすい",
      demoPeriod: "90日間",
      cashback: 1000000,
      cashbackText: "最大100万",
      tableFeatures: "アプリ内機能が充実！本格的な分析ができる経験者向きFX口座",
      features: "外為どっとコムは、情報コンテンツの豊富さで業界トップクラスを誇るFX会社です。独自の情報コンテンツ『マネ育』では、FXの基礎から実践的な取引手法まで学べ、初心者のスキルアップを強力にサポート。オンラインセミナーも多数開催され、著名アナリストによる相場分析や投資戦略を無料で学べます。スマホアプリ「外貨ネNextネオ」は高機能チャートや経済指標カレンダーを搭載し、本格的な分析が可能。スワップポイントも高水準で、長期保有にも適しています。情報収集と取引を一体化したい経験者向けのFX口座です。",
      goodPoints: [
        "独自の情報コンテンツ『マネ育』でFXの基礎から実践まで体系的に学べる充実の学習環境",
        "初心者向けオンラインセミナーを多数開催。著名アナリストの相場分析を無料で視聴可能",
        "スワップポイントが高水準で、長期保有による金利収入を狙いやすい",
        "スマホアプリ「外貨ネNextネオ」は高機能チャートと経済指標を搭載し本格的な分析が可能",
        "ニュース配信が豊富で、相場の動きをリアルタイムで把握できる情報力"
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
      logoText: "松井証券",
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
      tableFeatures: "100円から取引できる！少額から始めたい人におすすめ",
      features: "松井証券は、100年以上の歴史を持つ老舗証券会社の安心感と、革新的なサービスを併せ持つFX会社です。25歳以下は株式手数料が無料、NISA取引も無料という若い世代を応援する体制が特徴。FXでも100円から取引できる超少額対応で、初心者が気軽に始められます。「FX自動売買」機能では、簡単な設定でリピート系自動売買が可能で、忍しい方でも効率的に取引できます。サポート体制はHDI-Japan問合せ窓口格付けで「三つ星」を連続獲得しており、初心者でも安心して相談できる環境が整っています。",
      goodPoints: [
        "100年以上の歴史を持つ老舗証券会社の圧倒的な安心感と信頼性",
        "100円からFX取引が可能で、超少額から気軽に始められる",
        "「FX自動売買」機能が使いやすく、忍しい方でも効率的に取引できる",
        "HDI-Japan問合せ窓口格付けで「三つ星」を連続獲得する業界最高水準のサポート体制",
        "25歳以下は株式手数料無料で、若い世代の投資を応援する体制"
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
      logoText: "ヒロセ通商",
      detailUrl: "#",
      customLogo: (
        <div className="w-full h-full flex items-center justify-center relative">
          <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank" className="w-full h-full flex items-center justify-center">
            <img style={{ border: 'none', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} width="125" height="125" alt="" src="https://www23.a8.net/svt/bgt?aid=251110136381&wid=001&eno=01&mid=s00000006699001027000&mc=1" />
          </a>
          <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
        </div>
      ),
      promotionBanner: (
        <div className="relative">
          <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank">
            <img style={{ border: 'none' }} width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=251110136381&wid=001&eno=01&mid=s00000006699001063000&mc=1" />
          </a>
          <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
        </div>
      ),
      customAffiliateButton: (
        <div className="relative">
          <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-sm shadow-sm transition-colors flex items-center justify-center rounded-md">
            公式サイト
          </a>
          <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
        </div>
      ),
      affiliateUrl: "https://hirose-fx.co.jp/",
      overallRating: 4,
      overallRatingText: "スキャル",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "高機能",
      demoPeriod: "土日可",
      cashback: 1000000,
      cashbackText: "100万+食品",
      tableFeatures: "スキャルピング公認！食品キャンペーンも豊富な人気業者",
      features: "ヒロセ通商は、スキャルピング（短期売買）を公認している数少ないFX会社の一つです。多くのFX会社がスキャルピングを制限する中、ヒロセ通商は短期売買を歓迎し、高速約定システムでストレスなく取引できます。取扱通貨ペア54種類と業界トップクラスの豊富さで、マイナー通貨への投資も可能。毎月の取引量に応じて豪華な食品がもらえるユニークなキャンペーンも大人気。取引をしながら食品を獲得できる楽しみがあり、モチベーション維持にもつながります。アクティブに取引したいトレーダーに最適なFX会社です。",
      goodPoints: [
        "スキャルピング取引OKを公言している数少ない業者で、短期売買に最適",
        "毎月の取引量に応じて豪華な食品がもらえるユニークなキャンペーンで楽しみ増加",
        "約定スピードが速く、ストレスなくスムーズに取引できる高速約定システム",
        "取扱通貨ペア54種類と業界トップクラスの豊富さで、マイナー通貨への投資も可能",
        "取引ツール「LION FX」は操作性が高く、カスタマイズ性に優れた設計"
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
      logoText: "LINE FX",
      detailUrl: "#",
      affiliateUrl: "https://line-fx.com/",
      overallRating: 3,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 5,
      appUsabilityText: "使いやすい",
      demoPeriod: "未対応",
      cashback: 1005000,
      cashbackText: "最大100万",
      tableFeatures: "2万円以上の入金と1万通貨以上の取引て5,000円プレゼント中",
      features: "LINE FXは、普段使い慣れたLINEアプリと連携した手軽さが最大の魅力です。LINEアプリで経済指標や相場変動の通知が届くため、取引チャンスを逃さずに捕えられます。口座開設は非常に簡単で、LINEアプリから数タップで申し込みが完了。スマホ特化のインターフェースで、直感的な操作が可能です。スプレッドも業界最狭水準で、コストを抑えた取引ができます。FX初心者やスマホで手軽に取引したい方に最適なFX会社です。",
      goodPoints: [
        "LINEアプリで経済指標や相場変動の通知が届き、取引チャンスを逃さない",
        "普段使い慣れたLINEアプリのような操作感で、初心者でも迷わず使える",
        "口座開設が非常に簡単でスピーディー。LINEアプリから数タップで申し込み完了",
        "スマホ特化のインターフェースで、外出先でも快適に取引できる",
        "スプレッドは業界最狭水準で、取引コストを抑えられる"
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
      logoText: "IG証券",
      detailUrl: "#",
      affiliateUrl: "https://www.ig.com/jp",
      overallRating: 4,
      overallRatingText: "プロ向け",
      transactionUnit: 10000,
      transactionUnitText: "1万通貨",
      appUsability: 4,
      appUsabilityText: "プロ仕様",
      demoPeriod: "あり",
      cashback: 50000,
      cashbackText: "最大5万",
      tableFeatures: "通貨ペア約100種！ノックアウトオプションなど多様な取引が可能",
      features: "IG証券は、世界中の金融商品を取引できるCFDのリーディングカンパニーです。通貨ペア約100種類を含む、17,000銘柄以上の商品をラインナップ。個別株CFD、株価指数、商品、債券など、多彩な投資先へアクセスできます。「ノックアウトオプション」は、リスクを限定しながら高い資金効率で投資できる独自商品で、上級者に人気。プロ仕様のチャート分析ツールやニュース配信が充実し、グローバルな投資戦略を実現できます。世界的な金融グループの信頼性と、45年以上の実績を誇るプロ向けFX会社です。",
      goodPoints: [
        "取扱銘柁数17,000以上で、世界中の株、指数、商品、債券などへアクセス可能",
        "「ノックアウトオプション」でリスクを限定しながら高い資金効率で投資できる独自商品",
        "プロ仕様の高機能プラットフォームで、高度なチャート分析やニュース配信が充実",
        "世界的な金融グループの信頼性と45年以上の実績で安心して取引できる",
        "「IGアカデミー」で投資の基礎から上級テクニックまで学べる充実の学習コンテンツ"
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
      logoText: "みんなのFX",
      detailUrl: "#",
      affiliateUrl: "https://min-fx.jp/",
      overallRating: 4,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "30日間",
      cashback: 1000000,
      cashbackText: "最大100万",
      tableFeatures: "約定力99.9%の実績で注文ミスが少ない点が◎",
      features: "みんなのFXは、高水準のスワップポイントと優れた約定力が特徴のFX会社です。99.9%という高い約定力で、注文が思い通りの価格で約定され、ストレスなく取引できます。スワップポイントは業界最高水準で、長期保有による金利収入を狙いやすいのが大きな魅力。TradingViewが無料で使えるため、世界中のトレーダーが使う高機能チャートで本格的なテクニカル分析が可能。スプレッドも業界最狭水準で、コストを抑えた取引ができます。トレイダーズ証券が運営する信頼性の高いFXサービスです。",
      goodPoints: [
        "スワップポイントが業界最高水準で、長期保有による金利収入を狙いやすい",
        "TradingViewが無料で使え、世界中のトレーダーが使う高機能チャートで分析可能",
        "99.9%という高い約定力で、注文が思い通りの価格で約定されストレスフリー",
        "スプレッドは業界最狭水準で、取引コストを最小限に抑えられる",
        "トレイダーズ証券が運営する信頼性の高いFXサービスで安心して取引できる"
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
      logoText: "LIGHT FX",
      detailUrl: "#",
      affiliateUrl: "https://lightfx.jp/",
      overallRating: 3,
      overallRatingText: "スワップ",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "未対応",
      cashback: 1000000,
      cashbackText: "最大100万",
      tableFeatures: "スワップ20%増額キャンペーン実施中！スプレッドは広め△",
      features: "LIGHT FXは、スワップポイント運用に特化したFX会社です。「LIGHTペア」というスワップポイント優遇通貨ペアを提供し、高金利通貨での長期運用に最適。トレイダーズ証券が運営する「みんなのFX」の姉妹サービスで、同様にTradingViewが無料で使えるため、高機能チャートで分析しながらスワップ運用ができます。スプレッドも業界最狭水準で、コストを抑えた取引が可能。長期保有でコツコツと金利収入を積み上げたい方に最適なFX会社です。",
      goodPoints: [
        "「LIGHTペア」でスワップポイントが優遇され、高金利通貨での長期運用に最適",
        "取引単位が1,000通貨からで手軽に始められ、少額からスワップ運用が可能",
        "みんなのFXと同様にTradingViewが無料で使え、高機能チャートで分析可能",
        "トレイダーズ証券が運営する信頼性の高いサービスで安心して長期運用できる",
        "スプレッドは業界最狭水準で、取引コストを抑えられる"
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
      logoText: "トライオートFX",
      detailUrl: "#",
      affiliateUrl: "https://www.invast.jp/triauto/",
      overallRating: 3,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "未対応",
      cashback: 20000,
      cashbackText: "最大2万",
      tableFeatures: "自動売買だからプログラムを選ぶだけ！ツール手数料も無料",
      features: "トライオートFXは、リストから選ぶだけで自動売買が始められるFX会社です。「セレクト」機能では、優秀な自動売買プログラムがランキング形式で表示され、初心者でも簡単に選べます。上級者は自分だけのオリジナル自動売買ロジックも作成可能。ETF（上場投資信託）の自動売買も同じ口座ででき、多様な投資戦略を実現できます。インヴァスト証券が運営する信頼性の高いサービスで、24時間自動で取引してくれるため、忍しい方や感情に左右されずに取引したい方に最適です。",
      goodPoints: [
        "「セレクト」機能で優秀なプログラムを選ぶだけで、初心者でも簡単に自動売買を始められる",
        "自分だけのオリジナル自動売買ロジックも作成でき、上級者のカスタマイズにも対応",
        "ETF（上場投資信託）の自動売買も同じ口座で可能で、多様な投資戦略を実現",
        "インヴァスト証券が運営する信頼性の高いサービスで安心して利用できる",
        "24時間自動で取引してくれるため、忍しい方や感情に左右されずに取引したい方に最適"
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
      logoText: "auカブコム証券",
      detailUrl: "#",
      affiliateUrl: "https://kabu.com/",
      overallRating: 3,
      overallRatingText: "普通",
      transactionUnit: 1000,
      transactionUnitText: "1,000通貨",
      appUsability: 4,
      appUsabilityText: "普通",
      demoPeriod: "3ヶ月",
      cashback: 1000000,
      cashbackText: "最大100万",
      tableFeatures: "MUFGグループの安心感。デモ取引も充実。",
      features: "auカブコム証券は、MUFG（三菱UFJフィナンシャル・グループ）とKDDIグループの強みを融合したFX会社です。メガバンクグループの圧倒的な信頼性と安心感が最大の魅力。株式や投資信託も同じIDで管理でき、資産を一元管理したい方に便利。PCツールのチャート機能は非常に高性能で、本格的なテクニカル分析が可能。デモ取引も充実しており、初心者がリスクなく練習できる環境が整っています。auユーザーなら口座開設がさらにスムーズで、総合的な資産運用をしたい方に最適です。",
      goodPoints: [
        "MUFG（三菱UFJフィナンシャル・グループ）の圧倒的な信頼性と安心感",
        "株や投資信託も同じIDで管理でき、資産を一元管理しやすい",
        "PCツールのチャート機能が非常に高性能で、本格的なテクニカル分析が可能",
        "デモ取引が充実しており、初心者がリスクなく練習できる環境",
        "auユーザーなら口座開設がスムーズで、総合的な資産運用がしやすい"
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
        let customLogo = (item as any).customLogo;
        let promotionBanner = (item as any).promotionBanner;
        let customAffiliateButton = (item as any).customAffiliateButton;

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
        } else if (item.id === "hirose") {
          customLogo = (
            <div className="w-full h-full flex items-center justify-center relative">
              <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank" className="w-full h-full flex items-center justify-center">
                <img style={{ border: 'none', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} width="125" height="125" alt="" src="https://www23.a8.net/svt/bgt?aid=251110136381&wid=001&eno=01&mid=s00000006699001027000&mc=1" />
              </a>
              <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
            </div>
          );
          promotionBanner = (
            <div className="relative">
              <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank">
                <img style={{ border: 'none' }} width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=251110136381&wid=001&eno=01&mid=s00000006699001063000&mc=1" />
              </a>
              <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
            </div>
          );
          customAffiliateButton = (
            <div className="relative">
              <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-sm shadow-sm transition-colors flex items-center justify-center rounded-md">
                公式サイト
              </a>
              <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
            </div>
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
            customAffiliateButton={customAffiliateButton}
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