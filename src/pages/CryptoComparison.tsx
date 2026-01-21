import { ComparisonPageTemplate } from "@/components/templates/ComparisonPageTemplate";
import { Company } from "@/components/features/SurveyDiagnostic";

// Mock Data for Crypto
const cryptoRankingList: Company[] = [
  {
    name: "Coincheck",
    points: ["国内最大級の通貨数", "アプリダウンロード数No.1", "500円から購入可能"],
    specs: [
      { label: "取扱通貨", value: "29種類", isHighlight: true },
      { label: "取引手数料", value: "無料(販売所)" },
      { label: "アプリ", value: "使いやすさ◎" },
    ],
    campaignText: "家族友だち紹介キャンペーン実施中",
  },
  {
    name: "bitFlyer",
    points: ["ビットコイン取引量 6年連続No.1", "強固なセキュリティ", "Tポイントが貯まる"],
    specs: [
      { label: "取扱通貨", value: "21種類" },
      { label: "取引手数料", value: "無料(販売所)" },
      { label: "レバレッジ", value: "対応" },
    ],
  },
  {
    name: "DMM Bitcoin",
    points: ["レバレッジ取引の種類が豊富", "365日サポート", "取引手数料無料"],
    specs: [
      { label: "取扱通貨", value: "38種類", isHighlight: true },
      { label: "レバレッジ", value: "34種類" },
      { label: "入出金", value: "無料" },
    ],
    campaignText: "新規口座開設で即時2,000円プレゼント",
  }
];

const CryptoComparison = () => {
  return (
    <ComparisonPageTemplate
      metaTitle="暗号資産(仮想通貨)おすすめ取引所比較 | 投資総合ナビ"
      metaDescription="初心者におすすめの暗号資産取引所を徹底比較。取扱通貨数、手数料、アプリの使いやすさなどでランキング。"
      categoryName="暗号資産取引所"
      // Placeholder Hero - In real app, create CryptoHeroSection
      heroSection={
        <div className="bg-slate-900 text-white py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">暗号資産取引所 徹底比較</h1>
          <p>あなたにぴったりの取引所が見つかる</p>
        </div>
      }
      rankingList={cryptoRankingList}
      renderRankingCard={(item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{index + 1}位: {item.name}</h3>
            {item.campaignText && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">{item.campaignText}</span>}
          </div>
          <ul className="mt-4 space-y-2">
            {item.points.map((p, i) => <li key={i} className="text-sm">✅ {p}</li>)}
          </ul>
          <div className="flex gap-4 mt-4">
            {item.specs.map((s, i) => (
              <div key={i} className="bg-slate-50 p-2 rounded text-center w-full">
                <div className="text-xs text-slate-500">{s.label}</div>
                <div className="font-bold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      renderComparisonTable={() => (
        <div className="bg-white p-6 rounded shadow mt-8 text-center text-slate-500 h-40 flex items-center justify-center">
          {/* Placeholder for CryptoComparisonTable */}
          暗号資産比較テーブル (ここに実装)
        </div>
      )}
      disclaimerText={
        <div className="mt-8 text-center text-xs text-slate-400">
          ※暗号資産は価格変動により損失が生じる場合があります。
        </div>
      }
    />
  );
};

export default CryptoComparison;