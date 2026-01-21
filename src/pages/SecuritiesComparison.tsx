import { ComparisonPageTemplate } from "@/components/templates/ComparisonPageTemplate";
import { Company } from "@/components/features/SurveyDiagnostic";

const securitiesRankingList: Company[] = [
    {
        name: "SBI証券",
        points: ["国内株式売買手数料0円", "Tポイントが貯まる・使える", "IPO取扱実績No.1"],
        specs: [
            { label: "国内株式", value: "無料", isHighlight: true },
            { label: "投資信託", value: "2600本以上" },
            { label: "NISA", value: "対応" },
        ],
        campaignText: "口座開設で最大〇〇ポイントプレゼント",
    },
    {
        name: "楽天証券",
        points: ["楽天ポイントで投資できる", "iDeCo加入者数No.1", "ツール『MarketSpeed』が人気"],
        specs: [
            { label: "国内株式", value: "無料" },
            { label: "投資信託", value: "楽天カード積立" },
            { label: "NISA", value: "対応" },
        ],
    }
];

const SecuritiesComparison = () => {
    return (
        <ComparisonPageTemplate
            metaTitle="ネット証券おすすめ比較ランキング | 投資総合ナビ"
            metaDescription="手数料、取扱商品、ポイント還元率などでネット証券を徹底比較。"
            categoryName="証券口座"
            heroSection={
                <div className="bg-green-700 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">ネット証券 徹底比較</h1>
                    <p>NISA・iDeCoを始めるならここ！</p>
                </div>
            }
            rankingList={securitiesRankingList}
            renderRankingCard={(item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-xl font-bold">{index + 1}位: {item.name}</h3>
                    <ul className="mt-4 space-y-2">
                        {item.points.map((p, i) => <li key={i} className="text-sm">✅ {p}</li>)}
                    </ul>
                </div>
            )}
            renderComparisonTable={() => (
                <div className="bg-white p-6 rounded shadow mt-8 text-center text-slate-500 h-40 flex items-center justify-center">
                    証券会社比較テーブル (ここに実装)
                </div>
            )}
        />
    );
};

export default SecuritiesComparison;
