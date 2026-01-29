import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { TrendingUp, Bitcoin, DollarSign, Building2, LucideIcon, CheckCircle, ArrowLeft, ArrowRight, X, Lightbulb, RotateCcw, Home } from "lucide-react";

type Industry = "stocks" | "funds" | "crypto" | "fx";

interface IndustryOption {
  id: Industry;
  label: string;
  icon: LucideIcon;
  path: string;
}

// 業界ごとのアドバイスを追加
const industryAdvice = {
  stocks: {
    low: {
      title: "株式投資（低リスク）",
      advice: "低リスクの株式投資では、大型株や配当性向の高い株に投資することをおすすめします。ブルーチップ株を中心に組み立てたポートフォリオで、安定的なリターンを目指しましょう。",
      examples: [
        "日経225銘柄（トヨタ7203、ソフトバンク9984など）",
        "高配当株（日本通信9431、イオン8277など）",
        "インデックスファンド（eMAXIS Slim 全世界株式（オールカントリー）1591など）",
        "ETF（VYM 米国高配当株式ETF、SCHD 米国高配当株式ETFなど）"
      ],
      strategy: "ドルコスト平均法で毎月定期的に購入し、5年以上の長期保有を基本とします。年1回のポートフォリオ見直しを行い、必要に応じてリバランスします。損切りラインを10%に設定し、利益確定のタイミングも検討します。"
    },
    medium: {
      title: "株式投資（中リスク）",
      advice: "中リスクの株式投資では、成長株と配当株のバランスを取ることが重要です。インデックスファンドやETFを活用して分散投資を行い、定期的なポートフォリオの見直しをしましょう。",
      examples: [
        "成長株（任天堂7974、ファーストリテイリング9983など）",
        "バランス型ETF（楽天・野村 バランスファンド1354など）",
        "米国株ETF（VYM、SCHDなど）",
        "新興市場ETF（VWO 新興国株式ETFなど）"
      ],
      strategy: "ポートフォリオの株式・債券比率を6:4または7:3に保ち、四半期ごとにリバランスを行います。個別株は5〜10銘柄程度に分散投資します。テクニカル分析とファンダメンタル分析を併用し、売買タイミングを判断します。"
    },
    high: {
      title: "株式投資（高リスク）",
      advice: "高リスクの株式投資では、新興株や成長性の高い株に投資できます。ただし、リスク管理を徹底し、損失を最小限に抑えるためのストップロス注文を活用しましょう。",
      examples: [
        "新興株（メドピア4441、GMOペパボ3754など）",
        "米国テクノロジー株（Tesla、NVIDIAなど）",
        "小型株ETF（VTI、IJRなど）",
        "バイオテクノロジー株（進行中の臨床試験がある企業など）"
      ],
      strategy: "ポートフォリオの70%以上を株式に割り当て、月次のテクニカル分析で売買タイミングを判断します。個別銘柄の割合は3%以内に制限し、損切りラインを15%に設定します。ニュースや業績発表に敏感に対応し、短期的な売買も検討します。"
    }
  },
  funds: {
    low: {
      title: "投資信託（低リスク）",
      advice: "低リスクの投資信託では、債券系やバランス型の商品を選びましょう。信託報酬が低く、実績のある運用会社の商品を選ぶことで、安定的な運用が期待できます。",
      examples: [
        "債券系投資信託（ニッセイ・コクサイ ワールドボンドファンドなど）",
        "バランス型投資信託（三井住友・アセットマネジメント バランスファンドなど）",
        "インデックス型投資信託（楽天VTI、楽天全世界株式インデックスなど）",
        "個人向け国債（変動金利型）"
      ],
      strategy: "信託報酬が0.3%以下の商品を選び、3年以上の長期保有を基本とします。毎年の積立額は年収の10%を目安とし、年1回のポートフォリオ見直しを行います。NISA口座を活用して税制優遇を最大限に享受します。"
    },
    medium: {
      title: "投資信託（中リスク）",
      advice: "中リスクの投資信託では、株式と債券のバランスが取れた商品が適しています。インデックス型やアクティブ型の商品を組み合わせて、リスク分散を図りましょう。",
      examples: [
        "バランス型投資信託（野村バランスファンドなど）",
        "株式系投資信託（ニッセイ外国株式インデックスファンドなど）",
        "債券系投資信託（ニッセイ・コクサイ ワールドボンドファンドなど）",
        "つみたてNISA対象ファンド（楽天・全米株式インデックスなど）"
      ],
      strategy: "株式系投資信託と債券系投資信託を6:4の比率で組み合わせ、年2回のリバランスを行います。信託報酬は0.5%以下を目安とし、複数の運用会社に分散投資します。定期的な積立投資により、ドルコスト平均法の効果を享受します。"
    },
    high: {
      title: "投資信託（高リスク）",
      advice: "高リスクの投資信託では、株式系の商品や新興国株式ファンドなどが選択肢になります。運用会社の実績やポートフォリオ構成をよく確認し、分散投資を心がけましょう。",
      examples: [
        "株式系投資信託（eMAXIS Slim 米国株式（S&P500）など）",
        "新興国株式ファンド（ニッセイ新興国株式インデックスファンドなど）",
        "アクティブ型投資信託（野村アジア成長株ファンドなど）",
        "ESG投資信託（ニッセイ・ファンド・マネージャーズ ESG・アジア株式など）"
      ],
      strategy: "株式系投資信託の割合を70%以上とし、月次のリバランスを行います。信託報酬は1.0%以下を目安とし、新興市場への投資割合は20%以内に制限します。運用会社のレポートを定期的に確認し、ポートフォリオの適時見直しを行います。"
    }
  },
  crypto: {
    low: {
      title: "暗号資産（低リスク）",
      advice: "低リスクの暗号資産投資では、主要な通貨（ビットコイン、イーサリアム）に限定し、ドルコスト平均法で少額ずつ購入することをおすすめします。",
      examples: [
        "ビットコイン（BTC）",
        "イーサリアム（ETH）",
        "リップル（XRP）",
        "ライトコイン（LTC）"
      ],
      strategy: "主要通貨に限定し、ドルコスト平均法で毎月定期的に購入します。ポートフォリオの80%をBTCとETHに分配し、残り20%を他の主要通貨に分配します。ハードウェアウォレットでの保管を推奨し、セキュリティを徹底します。"
    },
    medium: {
      title: "暗号資産（中リスク）",
      advice: "中リスクの暗号資産投資では、主要通貨と一部の有望なアルトコインを組み合わせて投資できます。各プロジェクトの基本情報をよく確認し、適切なポートフォリオ構成を心がけましょう。",
      examples: [
        "ビットコイン（BTC）",
        "イーサリアム（ETH）",
        "ビットコインキャッシュ（BCH）",
        "ライトコイン（LTC）",
        "チェーンリンク（LINK）",
        "ポルカドット（DOT）"
      ],
      strategy: "ポートフォリオの60%をBTCとETHに分配し、40%を有望なアルトコインに分配します。月次のテクニカル分析で売買タイミングを判断し、損切りラインを20%に設定します。DeFiやNFTなどの新規トレンドにも注目します。"
    },
    high: {
      title: "暗号資産（高リスク）",
      advice: "高リスクの暗号資産投資では、新規プロジェクトやデリバティブ商品に投資できます。価格変動が大きいため、リスク管理を徹底し、損失を最小限に抑える必要がありますが、適切な分散投資によりリスクを緩和できます。",
      examples: [
        "新規プロジェクトトークン（SUI、APT、STRKなど）",
        "レイヤー2ソリューション（IMX、DYDX、ZKSなど）",
        "AI関連トークン（RNDR、FET、AGIXなど）",
        "Web3インフラ（LINK、API3、RADなど）",
        "高リスク・高リターン新興コイン（HYPER、MAXI、SPY、SUBBDなど）"
      ],
      strategy: "ポートフォリオの30%を主要通貨に分配し、40%を有望なアルトコインに分配し、残り30%を新規プロジェクトトークンに分配します。週次のテクニカル分析で売買タイミングを判断し、損切りラインを20%に設定します。ホワイトペーパーの詳細な分析を行い、プロジェクトの実現可能性を評価します。"
    }
  },
  fx: {
    low: {
      title: "FX（低リスク）",
      advice: "低リスクのFX投資では、主要通貨ペア（ドル/円、ユーロ/ドルなど）に限定し、レバレッジを低く抑えて取引することをおすすめします。スワップポイントを考慮した運用も有効です。",
      examples: [
        "ドル/円（USD/JPY）",
        "ユーロ/ドル（EUR/USD）",
        "豪ドル/円（AUD/JPY）",
        "NZドル/円（NZD/JPY）"
      ],
      strategy: "レバレッジを5倍以下に抑え、主要通貨ペアに限定して取引します。スワップポイントを重視したポジションを月1回の頻度で見直し、必要に応じてロールオーバーします。テクニカル分析とファンダメンタル分析を併用し、エントリーとイグジットのタイミングを慎重に判断します。"
    },
    medium: {
      title: "FX（中リスク）",
      advice: "中リスクのFX投資では、複数の通貨ペアに分散投資し、テクニカル分析とファンダメンタル分析を組み合わせて取引を行いましょう。リスク管理を徹底し、損切りラインを設定することが重要です。",
      examples: [
        "ドル/円（USD/JPY）",
        "ユーロ/ドル（EUR/USD）",
        "豪ドル/ドル（AUD/USD）",
        "ポンド/ドル（GBP/USD）"
      ],
      strategy: "レバレッジを10倍以下に抑え、3〜5つの通貨ペアに分散投資します。週次のテクニカル分析と日次のファンダメンタル分析を組み合わせ、損切りラインを10%に設定します。エントリーとイグジットのルールを明確にし、感情的な取引を避けるよう心がけます。"
    },
    high: {
      title: "FX（高リスク）",
      advice: "高リスクのFX投資では、マイナー通貨ペアやCFD商品に投資できます。スキャルピングやデイトレードなどの短期取引も選択肢になりますが、リスク管理を徹底する必要があります。",
      examples: [
        "南アフリカランド/円（ZAR/JPY）",
        "トルコリラ/ドル（TRY/USD）",
        "株価指数CFD（日経225、NYダウなど）",
        "原油CFD（WTI、ブレントなど）"
      ],
      strategy: "レバレッジを20倍以下に抑え、テクニカル分析を主軸とした短期取引を行います。日次の損益管理を行い、1日の損失上限をアカウント残高の2%以内に設定します。エントリーとイグジットのルールを厳格に守り、感情的な取引を徹底的に避けるよう心がけます。"
    }
  }
};

const industries: IndustryOption[] = [
  { id: "stocks", label: "株式・証券", icon: TrendingUp, path: "/comparison" },
  { id: "funds", label: "投資信託", icon: Building2, path: "/comparison" },
  { id: "crypto", label: "暗号資産", icon: Bitcoin, path: "/crypto-comparison" },
  { id: "fx", label: "FX", icon: DollarSign, path: "/fx-comparison" },
];

// 質問数を増やして詳細化
const questions = [
  {
    id: 1,
    text: "投資経験はどのくらいありますか？",
    options: [
      { value: "beginner", label: "初心者（1年未満）", score: 1 },
      { value: "intermediate", label: "中級者（1-3年）", score: 2 },
      { value: "advanced", label: "上級者（3年以上）", score: 3 },
    ],
  },
  {
    id: 2,
    text: "投資資金が30%減少した場合、どう感じますか？",
    options: [
      { value: "panic", label: "すぐに売却したい", score: 1 },
      { value: "worried", label: "心配だが様子を見る", score: 2 },
      { value: "calm", label: "長期的視点で保有する", score: 3 },
    ],
  },
  {
    id: 3,
    text: "投資の目的は何ですか？",
    options: [
      { value: "short", label: "短期的な利益", score: 3 },
      { value: "medium", label: "中期的な資産形成", score: 2 },
      { value: "long", label: "長期的な老後資金", score: 1 },
    ],
  },
  {
    id: 4,
    text: "あなたの年齢層はどれですか？",
    options: [
      { value: "20s", label: "20代", score: 3 },
      { value: "30s", label: "30代", score: 2 },
      { value: "40s", label: "40代", score: 2 },
      { value: "50s", label: "50代", score: 1 },
      { value: "60s", label: "60代以上", score: 1 },
    ],
  },
  {
    id: 5,
    text: "年間の収入状況はどのくらいですか？",
    options: [
      { value: "low", label: "300万円未満", score: 1 },
      { value: "medium", label: "300万円〜500万円", score: 2 },
      { value: "high", label: "500万円以上", score: 3 },
    ],
  },
  {
    id: 6,
    text: "投資に関する知識はどのくらいありますか？",
    options: [
      { value: "basic", label: "基本的な知識のみ", score: 1 },
      { value: "intermediate", label: "中級者レベル", score: 2 },
      { value: "advanced", label: "上級者レベル", score: 3 },
    ],
  },
  {
    id: 7,
    text: "投資期間はどのくらいを見込んでいますか？",
    options: [
      { value: "short", label: "1〜3年", score: 3 },
      { value: "medium", label: "3〜10年", score: 2 },
      { value: "long", label: "10年以上", score: 1 },
    ],
  },
  {
    id: 8,
    text: "期待する年間リターンはどれくらいですか？",
    options: [
      { value: "low", label: "3%未満", score: 1 },
      { value: "medium", label: "3%〜7%", score: 2 },
      { value: "high", label: "7%以上", score: 3 },
    ],
  },
  {
    id: 9,
    text: "投資のリスクについて、どれくらい許容できますか？",
    options: [
      { value: "low", label: "元本保証が前提", score: 1 },
      { value: "medium", label: "多少の値下がりは許容", score: 2 },
      { value: "high", label: "大きな値下がりも許容", score: 3 },
    ],
  },
  {
    id: 10,
    text: "投資にかける時間はどれくらい確保できますか？",
    options: [
      { value: "little", label: "月1〜2時間程度", score: 1 },
      { value: "some", label: "週1〜2時間程度", score: 2 },
      { value: "lot", label: "日々チェックできる", score: 3 },
    ],
  },
  {
    id: 11,
    text: "投資資金の一部を失う可能性がある場合、どのように考えますか？",
    options: [
      { value: "cant", label: "受け入れがたい", score: 1 },
      { value: "acceptable", label: "ある程度は受け入れられる", score: 2 },
      { value: "ok", label: "投資には付きもの", score: 3 },
    ],
  },
  {
    id: 12,
    text: "投資で失敗した経験はありますか？",
    options: [
      { value: "no", label: "ない", score: 3 },
      { value: "little", label: "少しある", score: 2 },
      { value: "many", label: "多くある", score: 1 },
    ],
  },
];

const RiskDiagnostic = () => {
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { value: string; score: number }>>({});
  const [result, setResult] = useState<any>(null);

  const handleIndustryToggle = (industryId: Industry) => {
    console.log("handleIndustryToggleが呼び出されました");
    // 単一選択のみ許可
    setSelectedIndustries([industryId]);
    console.log("選択された業界:", industryId);
    // setStep(0)の呼び出しを防止するために、ここでは何もしない
  };

  // selectedIndustriesの変更を監視
  useEffect(() => {
    console.log("更新された選択状態:", selectedIndustries);
    // 自動遷移を防止するために、ここでは何もしない
  }, [selectedIndustries]);

  // 複数選択対応のため、クリックイベントを分離
  const handleIndustryClick = (industryId: Industry) => {
    console.log("handleIndustryClickが呼び出されました");
    handleIndustryToggle(industryId);
    // 自動遷移を防止するために、ここでは何もしない
  };

  // 単一選択
  const handleAnswer = (questionId: number, optionValue: string, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { value: optionValue, score: score },
    }));
  };

  const calculateRisk = () => {
    const allScores = Object.values(answers).map(a => a.score);
    const totalScore = allScores.reduce((sum, score) => sum + score, 0);
    const avgScore = totalScore / allScores.length;

    let riskLevel: string;
    let riskKey: "low" | "medium" | "high";
    let title: string;
    let description: string;
    let recommendations: string[];

    if (avgScore <= 1.6) {
      riskLevel = "低リスク";
      riskKey = "low";
      title = "保守的な投資家";
      description = "安定性を重視し、リスクを最小限に抑えた投資戦略が適しています。元本の保護を最優先とし、長期的な資産形成を目指します。";
      recommendations = [
        "国債や安定した大型株への投資",
        "分散投資でリスクを軽減",
        "定期的な積立投資",
        "投資信託やETFの活用",
        "頻繁な売買を避け、長期保有を意識",
        "リスクの高い商品（仮想通貨、CFD等）は避ける"
      ];
    } else if (avgScore <= 2.4) {
      riskLevel = "中リスク";
      riskKey = "medium";
      title = "バランス型投資家";
      description = "リスクとリターンのバランスを取った投資戦略が適しています。一定のリターンを目指しつつ、リスク管理も重要視します。";
      recommendations = [
        "株式と債券のバランス投資",
        "成長株と配当株の組み合わせ",
        "投資信託での分散投資",
        "定期的なポートフォリオ見直し",
        "ドルコスト平均法による積立投資",
        "適切なリバランスの実施"
      ];
    } else {
      riskLevel = "高リスク";
      riskKey = "high";
      title = "積極的な投資家";
      description = "高いリターンを目指す積極的な投資戦略が適しています。市場の変動に敏感に対応でき、リスク管理能力も高いことが前提です。";
      recommendations = [
        "成長株への集中投資",
        "新興市場への投資",
        "レバレッジ商品の活用",
        "短期的な市場機会の活用",
        "テクニカル分析とファンダメンタル分析の併用",
        "ストップロス注文によるリスク管理"
      ];
    }

    setResult({
      riskLevel,
      riskKey,
      title,
      description,
      recommendations,
      industries: selectedIndustries,
      score: avgScore
    });
  };

  const handleNext = () => {
    if (step === questions.length - 1) {
      calculateRisk();
    } else {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setSelectedIndustries([]);
    setIsStarted(false);
    setStep(0);
    setAnswers({});
    setResult(null);
    // セクションの開始点にスクロール
    setTimeout(() => {
      const diagnosticSection = document.getElementById('diagnostic-tool');
      if (diagnosticSection) {
        const sectionTop = diagnosticSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: sectionTop - 100, // ヘッダーの高さ分を考慮して調整
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  if (selectedIndustries.length === 0 || !isStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">投資業界を選択してください</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industries.map((industry) => {
                const Icon = industry.icon;
                const isSelected = selectedIndustries.includes(industry.id);
                return (
                  <div
                    key={industry.id}
                    className={`group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${isSelected
                      ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:bg-accent/5 hover:shadow-sm"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIndustryClick(industry.id);
                    }}
                  >
                    <div className="flex h-5 w-5 items-center justify-center">
                      {isSelected ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    <Icon className={`h-6 w-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <Label
                      className="cursor-pointer flex-1 text-sm sm:text-base font-medium leading-relaxed"
                    >
                      {industry.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("診断を開始するボタンがクリックされました");
                  console.log("選択された業界:", selectedIndustries);
                  setIsStarted(true);
                  setStep(0);
                }}
                disabled={selectedIndustries.length === 0}
                size="lg"
                className="hover:scale-105 transition-transform w-full sm:w-auto"
              >
                診断を開始する
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <Card className="border-2 shadow-2xl bg-gradient-to-br from-card via-card/95 to-card/90 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <CardHeader className="relative pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold">診断結果</CardTitle>
              </div>
              <Badge variant="secondary" className="text-base sm:text-lg px-6 py-2 w-fit">
                {result.riskLevel}
              </Badge>
            </div>
            <div className="bg-gradient-to-r from-accent/20 via-primary/10 to-secondary/20 rounded-lg p-6 border border-accent/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-primary">{result.title}</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{result.description}</p>
              <p className="text-sm text-muted-foreground mt-2">診断スコア: {result.score.toFixed(2)}/3.00</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 relative">
            {result.industries.length > 0 ? (
              <>
                <div className="bg-muted/30 rounded-xl p-6 border-2 border-muted">
                  <h3 className="text-lg sm:text-xl font-bold mb-6">おすすめの投資戦略と業界ごとのアドバイス</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* おすすめの投資戦略 */}
                    <div className="bg-card rounded-xl p-6 border-2 border-primary/20 shadow-lg">
                      <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        おすすめの投資戦略
                      </h4>
                      <div className="space-y-4">
                        {result.recommendations.map((rec: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 bg-muted rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md"
                          >
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm sm:text-base leading-relaxed">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 業界ごとのアドバイス */}
                    <div className="bg-card rounded-xl p-6 border-2 border-primary/20 shadow-lg">
                      <h4 className="text-lg font-bold mb-6">業界ごとのアドバイス</h4>
                      <div className="space-y-6">
                        {result.industries.map((industryId: Industry) => {
                          const industry = industries.find((i) => i.id === industryId);
                          if (!industry) return null;
                          const Icon = industry.icon;
                          const advice = industryAdvice[industryId][result.riskKey as "low" | "medium" | "high"];

                          return (
                            <div key={industryId} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                              <div className="flex items-center gap-2 mb-3">
                                <Icon className="h-5 w-5 text-primary" />
                                <h5 className="font-semibold text-base">{advice.title}</h5>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{advice.advice}</p>
                              <div className="space-y-3">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <h6 className="font-bold text-blue-800 text-xs mb-1 flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    具体的な商品例:
                                  </h6>
                                  <ul className="text-xs text-blue-900 space-y-1">
                                    {advice.examples.map((example: string, index: number) => (
                                      <li key={index} className="flex items-start gap-1.5">
                                        <span className="h-1 w-1 rounded-full bg-blue-800 mt-1.5 flex-shrink-0" />
                                        <span>{example}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <h6 className="font-bold text-green-800 text-xs mb-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    投資戦略:
                                  </h6>
                                  <p className="text-xs text-green-900">{advice.strategy}</p>
                                </div>
                              </div>
                              {/* 業界比較ページへのボタン */}
                              <div className="mt-4">
                                <Button asChild variant="outline" className="w-full hover:scale-105 transition-transform border-2 border-primary/30 hover:border-primary/50">
                                  <Link to={industry.path}>
                                    <Icon className="h-4 w-4 mr-2 text-primary" />
                                    {industryId === "crypto" ? "暗号資産取引所比較ページ" : `${industry.label}比較ページ`} →
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-muted/30 rounded-xl p-6 border-2 border-muted">
                <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  おすすめの投資戦略
                </h3>
                <div className="grid gap-4">
                  {result.recommendations.map((rec: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="flex-1 hover:scale-105 transition-transform py-6 text-xs xs:text-sm sm:text-base whitespace-nowrap"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                もう一度診断する
              </Button>
              <Button asChild size="lg" className="flex-1 hover:scale-105 transition-transform py-6 text-xs xs:text-sm sm:text-base whitespace-nowrap">
                <Link to="/tools">
                  <Home className="mr-2 h-5 w-5" />
                  ツール一覧に戻る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[step];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="border-2 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
        <CardHeader className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <Badge variant="outline" className="text-sm px-4 py-2 w-fit">
              質問 {step + 1} / {questions.length}
            </Badge>
            {selectedIndustries.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedIndustries.map((industryId) => {
                  const industry = industries.find((i) => i.id === industryId);
                  if (!industry) return null;
                  const Icon = industry.icon;
                  return (
                    <Badge key={industryId} variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="text-xs">{industry.label}</span>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
          <CardTitle className="text-xl sm:text-2xl leading-relaxed">{currentQuestion.text}</CardTitle>
          <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            1つ選択してください
          </p>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isChecked = currentAnswer && currentAnswer.value === option.value;
              return (
                <div
                  key={option.value}
                  className={`group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${isChecked
                    ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-accent/5 hover:shadow-sm"
                    }`}
                  onClick={() => handleAnswer(currentQuestion.id, option.value, option.score)}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
                    {isChecked && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary animate-scale-in" />
                    )}
                  </div>
                  <Label
                    htmlFor={option.value}
                    className="cursor-pointer flex-1 text-sm sm:text-base font-medium leading-relaxed"
                  >
                    {option.label}
                  </Label>
                  {isChecked && (
                    <CheckCircle className="h-5 w-5 text-primary animate-fade-in" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-4 pt-4">
            {/* PC用のボタンレイアウト */}
            <div className="hidden sm:flex gap-3 justify-center">
              {step > 0 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  size="lg"
                >
                  戻る
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={currentAnswer === undefined}
                className="gap-2 flex-1 px-8 py-6 text-lg"
                size="lg"
              >
                {step === questions.length - 1 ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    診断結果を見る
                  </>
                ) : (
                  <>
                    次へ
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="destructive"
                size="lg"
              >
                やめる
              </Button>
            </div>

            {/* モバイル用のボタンレイアウト */}
            <div className="flex flex-row gap-3 justify-center sm:hidden">
              {step > 0 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  size="icon"
                  className="hover:scale-105 transition-transform h-12 w-12"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={currentAnswer === undefined}
                className="flex-1 hover:scale-105 transition-transform h-12 text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap"
              >
                {step === questions.length - 1 ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  "次へ"
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="destructive"
                size="icon"
                className="hover:scale-105 transition-transform h-12 w-12"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>進捗状況</span>
                <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDiagnostic;