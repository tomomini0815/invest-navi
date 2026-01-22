import { ComparisonPageTemplate } from "@/components/templates/ComparisonPageTemplate";
import { Company } from "@/components/features/SurveyDiagnostic";
import RankingCardV2 from "@/components/features/RankingCardV2";
import { CryptoComparisonTable } from "@/components/features/CryptoComparisonTable";
import { CryptoHeroSection } from "@/components/features/CryptoHeroSection";

// Rich Data for Crypto Exchanges (Top 5+ for Demo)
export const cryptoRankingList: Company[] = [
  {
    id: "gmo_coin",
    rank: 1,
    name: "GMOコイン",
    rating: 4.8,
    points: [
      "2年連続 オリコン顧客満足度No.1",
      "送金手数料・入出金手数料が無料",
      "最短10分で取引開始可能"
    ],
    specs: [
      { label: "取引手数料", value: "Maker -0.01% / Taker 0.05%", isHighlight: true },
      { label: "取扱通貨数", value: "26銘柄" },
      { label: "送金手数料", value: "無料", isHighlight: true },
      { label: "アプリ", value: "高機能" },
      { label: "サービス", value: "積立/レンディング/IEO" },
    ],
    campaignText: "口座開設キャンペーン実施中",
    badgeText: "総合力No.1",
    affiliateUrl: "https://coin.z.com/jp/",
    detailUrl: "/crypto/gmo-coin",
    accordionData: {
      features: "GMOクリック証券のノウハウを活かした使いやすいアプリと、業界最安水準の手数料が魅力。送金手数料も無料なので、海外取引所への送金用としても最適です。",
      goodPoints: [
        "即時入金・日本円出金・暗号資産送付の手数料が全部無料！",
        "「つみたて暗号資産」は月500円から自動積立可能",
        "セキュリティ対策が万全で安心感がある"
      ],
      specTitle: "手数料・スペック詳細",
      specTable: {
        row1: [
          { label: "ビットコイン", value: "〇" },
          { label: "イーサリアム", value: "〇" },
          { label: "リップル", value: "〇" },
          { label: "取扱通貨数", value: "26銘柄", className: "text-red-500" }
        ],
        row2: [
          { label: "取引所手数料", value: "Maker -0.01%", className: "text-red-500" },
          { label: "送金手数料", value: "無料", className: "text-red-500" },
          { label: "出金手数料", value: "無料", className: "text-red-500" },
          { label: "レバレッジ", value: "対応(2倍)" }
        ]
      },
      startGuide: {
        title: "GMOコインの始め方 3 STEP",
        description: "スマホだけで完結する「かんたん本人確認」なら最短10分で口座開設完了！",
        steps: [
          {
            title: "メールアドレス登録",
            description: "公式サイトからメールアドレスを入力し、届いたURLからパスワードを設定します。"
          },
          {
            title: "本人確認情報の入力",
            description: "スマホで本人確認書類と顔写真を撮影するだけで提出完了。郵送物は不要です。"
          },
          {
            title: "入金して取引開始",
            description: "審査完了メールが届いたらログイン。即時入金ならリアルタイムで反映され、すぐ買えます。"
          }
        ]
      }
    }
  },
  {
    id: "coincheck",
    rank: 2,
    name: "Coincheck (コインチェック)",
    rating: 4.7,
    points: [
      "国内最大級の通貨数29種類！",
      "アプリダウンロード数No.1で初心者人気◎",
      "500円からビットコインが買える"
    ],
    specs: [
      { label: "取引手数料", value: "無料(販売所)" },
      { label: "取扱通貨数", value: "29銘柄", isHighlight: true },
      { label: "送金手数料", value: "変動" },
      { label: "アプリ", value: "使いやすさ◎", isHighlight: true },
      { label: "サービス", value: "積立/NFT/IEO" },
    ],
    campaignText: "家族友だち紹介キャンペーン中",
    badgeText: "初心者人気No.1",
    affiliateUrl: "https://coincheck.com/ja/",
    detailUrl: "/crypto/coincheck",
    accordionData: {
      features: "アプリのUIが非常にシンプルで直感的。投資初心者でも迷わずビットコインを購入できます。取扱通貨数が国内最多級で、珍しいアルトコインも購入可能。",
      goodPoints: [
        "アプリがとにかく使いやすく、初心者の最初の口座に最適",
        "電気・ガス代の支払いでビットコインが貰えるサービスあり",
        "国内初のIEOを実施するなど新しい試みに積極的"
      ],
      specTitle: "手数料・スペック詳細",
      specTable: {
        row1: [
          { label: "ビットコイン", value: "〇" },
          { label: "イーサリアム", value: "〇" },
          { label: "リップル", value: "〇" },
          { label: "取扱通貨数", value: "29銘柄", className: "text-red-500" }
        ],
        row2: [
          { label: "取引所手数料", value: "無料(BTC等)", className: "text-red-500" },
          { label: "送金手数料", value: "0.0005 BTC" },
          { label: "出金手数料", value: "407円" },
          { label: "レバレッジ", value: "不可" }
        ]
      },
      startGuide: {
        title: "Coincheckの始め方 3 STEP",
        description: "3ステップで簡単口座開設。アプリからの申し込みがスムーズでおすすめ。",
        steps: [
          {
            title: "アカウント登録",
            description: "公式サイトまたはアプリからメールアドレスを登録します。"
          },
          {
            title: "SMS認証・本人確認",
            description: "電話番号認証を行い、スマホアプリで本人確認書類を撮影してアップロードします。"
          },
          {
            title: "二段階認証・入金",
            description: "セキュリティ設定（二段階認証）を行い、銀行振込などで日本円を入金すれば完了！"
          }
        ]
      }
    }
  },
  {
    id: "bitflyer",
    rank: 3,
    name: "bitFlyer (ビットフライヤー)",
    rating: 4.6,
    points: [
      "ビットコイン取引量 6年連続No.1",
      "メガバンクらが出資する強固な信頼性",
      "Tポイントを使ってビットコインが買える"
    ],
    specs: [
      { label: "取引手数料", value: "0.01-0.15%" },
      { label: "取扱通貨数", value: "21銘柄" },
      { label: "送金手数料", value: "有料" },
      { label: "アプリ", value: "バランス型" },
      { label: "サービス", value: "積立/カード/Tポイント" },
    ],
    badgeText: "信頼と実績No.1",
    affiliateUrl: "https://bitflyer.com/ja-jp/",
    detailUrl: "/crypto/bitflyer",
    accordionData: {
      features: "業界最長となる7年以上ハッキング0の強固なセキュリティが特徴。初心者向けの「販売所」と上級者向けの「Lightning」があり、レベルに合わせて使えます。",
      goodPoints: [
        "1円からビットコインが買えるのでお試しに最適",
        "Tポイントをビットコインに交換できる",
        "「bitFlyerクレカ」利用でビットコインが貯まる"
      ],
      specTitle: "手数料・スペック詳細",
      specTable: {
        row1: [
          { label: "ビットコイン", value: "〇" },
          { label: "イーサリアム", value: "〇" },
          { label: "リップル", value: "〇" },
          { label: "取扱通貨数", value: "21銘柄" }
        ],
        row2: [
          { label: "取引所手数料", value: "約0.15%" },
          { label: "送金手数料", value: "0.0004 BTC" },
          { label: "出金手数料", value: "220円~" },
          { label: "レバレッジ", value: "対応(2倍)" }
        ]
      },
      startGuide: {
        title: "bitFlyerの始め方 3 STEP",
        description: "クイック本人確認なら、申し込みから最短10分で取引可能に！",
        steps: [
          {
            title: "メールアドレス登録",
            description: "公式サイトからメールアドレスを登録し、キーワードを入力してアカウント作成。"
          },
          {
            title: "ご本人情報登録",
            description: "氏名・住所等の入力と、スマホでの本人確認書類提出を行います。"
          },
          {
            title: "銀行口座登録",
            description: "出金先の銀行口座を登録し、日本円を入金すればすぐに取引スタートできます。"
          }
        ]
      }
    }
  },

  {
    id: "sbi_vc_trade",
    rank: 4,
    name: "SBI VCトレード",
    rating: 4.4,
    points: [
      "金融大手SBIグループの安心感",
      "スプレッドが業界最狭水準",
      "ステーキングサービスが充実"
    ],
    specs: [
      { label: "取引手数料", value: "無料〜" },
      { label: "取扱通貨数", value: "20銘柄" },
      { label: "送金手数料", value: "無料" },
      { label: "アプリ", value: "普通" },
      { label: "サービス", value: "積立/ステーキング" },
    ],
    badgeText: "SBIグループ",
    affiliateUrl: "https://www.sbivc.co.jp/",
    detailUrl: "/crypto/sbi-vc-trade",
    accordionData: {
      features: "SBIグループの総合力を活かしたサービス。特に「ステーキング」対象銘柄が多く、保有しているだけで報酬が貰えるのが魅力。コストも全体的に安い。",
      goodPoints: [
        "保有するだけで増えるステーキングサービスが優秀",
        "住信SBIネット銀行との連携で入出金がスムーズ",
        "500円から積立投資が可能"
      ],
      specTitle: "手数料・スペック詳細",
      specTable: {
        row1: [
          { label: "ビットコイン", value: "〇" },
          { label: "イーサリアム", value: "〇" },
          { label: "リップル", value: "〇" },
          { label: "取扱通貨数", value: "20銘柄" }
        ],
        row2: [
          { label: "取引所手数料", value: "Maker -0.01%", className: "text-red-500" },
          { label: "送金手数料", value: "無料", className: "text-red-500" },
          { label: "出金手数料", value: "無料", className: "text-red-500" },
          { label: "レバレッジ", value: "対応(2倍)" }
        ]
      },
      startGuide: {
        title: "SBI VCトレードの始め方 3 STEP",
        description: "SBI証券口座を持っていると連携でさらにスムーズに開設できます。",
        steps: [
          {
            title: "アカウント作成",
            description: "メールアドレス登録。SBI証券ユーザーは連携申し込みも可能。"
          },
          {
            title: "本人確認",
            description: "スマホで本人確認書類をアップロード。最短即日で審査完了。"
          },
          {
            title: "取引開始",
            description: "審査完了通知を受け取ったら取引開始。住信SBIネット銀行なら入金も即時。"
          }
        ]
      }
    }
  }
];

const CryptoComparison = () => {
  return (
    <ComparisonPageTemplate
      metaTitle="暗号資産(仮想通貨)おすすめ取引所比較 | 投資総合ナビ"
      metaDescription="初心者におすすめの暗号資産取引所を徹底比較。取扱通貨数、手数料、アプリの使いやすさなどでランキング。GMOコイン、Coincheck、bitFlyerなど人気取引所の特徴を解説。"
      categoryName="暗号資産取引所"
      heroSection={<CryptoHeroSection />}
      rankingList={cryptoRankingList}
      surveyType="crypto"
      renderRankingCard={(item, index) => (
        <RankingCardV2
          key={item.id}
          id={item.id}
          rank={index + 1}
          name={item.name}
          rating={item.rating || 0}
          points={item.points}
          specs={item.specs}
          campaignText={item.campaignText}
          badgeText={item.badgeText}
          affiliateUrl={item.affiliateUrl || "#"}
          detailUrl={item.detailUrl || "#"}
          accordionData={item.accordionData}
        />
      )}
      renderComparisonTable={() => (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <CryptoComparisonTable data={cryptoRankingList} />
          </div>
        </section>
      )}
      disclaimerText={
        <div className="mt-8 text-center text-xs text-slate-400 leading-relaxed max-w-3xl mx-auto">
          ※暗号資産（仮想通貨）は、日本円やドルなどの法定通貨とは異なり、国等によりその価値が保証されているものではありません。<br />
          ※暗号資産は、価格の変動により損失が生じる可能性があります。取引を行う際は、リスクを十分に理解した上で行ってください。<br />
          ※本ページのランキングや比較情報は、各社の公式サイト等の公表情報に基づき作成していますが、最新の情報は各社公式サイトをご確認ください。
        </div>
      }
    />
  );
};

export default CryptoComparison;