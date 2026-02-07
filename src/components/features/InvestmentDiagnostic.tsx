import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, X, TrendingUp, BarChart3, Shield, Calculator } from "lucide-react";

const InvestmentDiagnostic = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorType, setCalculatorType] = useState<'sip' | 'stock' | 'risk'>('sip');
  // 計算結果の状態を追加
  const [calculationResult, setCalculationResult] = useState<any>(null);
  // 入力値の状態を追加
  const [sipInputs, setSipInputs] = useState({
    monthlyInvestment: '',
    expectedReturn: '',
    investmentPeriod: '',
    initialAmount: ''
  });
  const [stockInputs, setStockInputs] = useState({
    stockPrice: '',
    shares: '',
    purchasePrice: '',
    dividendYield: ''
  });
  // リスク評価ツールの選択状態を追加
  const [riskInputs, setRiskInputs] = useState({
    riskTolerance: '',
    investmentPeriod: '',
    investmentPurpose: ''
  });

  // FX計算ツール専用の入力状態を追加
  const [fxInputs, setFxInputs] = useState({
    currencyPair: 'USD/JPY',
    lotSize: '',
    entryPrice: '',
    exitPrice: '',
    leverage: '1',
    currency: 'JPY',
    pipUnit: 1000, // 1pipの単位（1000通貨または10000通貨）
    position: 'buy' // 売り('sell')または買い('buy')
  });

  // 積立投資シミュレーションの実行
  const runSipSimulation = () => {
    const monthlyInvestment = parseFloat(sipInputs.monthlyInvestment) || 0;
    const expectedReturn = parseFloat(sipInputs.expectedReturn) || 0;
    const investmentPeriod = parseFloat(sipInputs.investmentPeriod) || 0;
    const initialAmount = parseFloat(sipInputs.initialAmount) || 0;

    // 月利を計算
    const monthlyRate = expectedReturn / 100 / 12;
    // 総月数を計算
    const totalMonths = investmentPeriod * 12;

    // 複利計算で将来価値を算出
    let futureValue = initialAmount * Math.pow(1 + monthlyRate, totalMonths);
    if (monthlyRate > 0) {
      futureValue += monthlyInvestment * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    } else {
      futureValue += monthlyInvestment * totalMonths;
    }

    const totalInvestment = initialAmount + (monthlyInvestment * totalMonths);
    const profit = futureValue - totalInvestment;

    setCalculationResult({
      type: 'sip',
      totalInvestment: totalInvestment.toLocaleString(),
      futureValue: Math.round(futureValue).toLocaleString(),
      profit: Math.round(profit).toLocaleString()
    });

    // モバイル時の自動スクロール
    setTimeout(() => {
      const resultElement = document.getElementById('sip-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  // 個別株投資シミュレーションの実行
  const runStockSimulation = () => {
    const stockPrice = parseFloat(stockInputs.stockPrice) || 0;
    const shares = parseFloat(stockInputs.shares) || 0;
    const purchasePrice = parseFloat(stockInputs.purchasePrice) || 0;
    const dividendYield = parseFloat(stockInputs.dividendYield) || 0;

    const investmentAmount = purchasePrice * shares;
    const currentValue = stockPrice * shares;
    const profitLoss = currentValue - investmentAmount;
    const dividendIncome = currentValue * (dividendYield / 100);

    setCalculationResult({
      type: 'stock',
      investmentAmount: investmentAmount.toLocaleString(),
      currentValue: currentValue.toLocaleString(),
      profitLoss: Math.round(profitLoss).toLocaleString(),
      dividendIncome: Math.round(dividendIncome).toLocaleString()
    });

    // モバイル時の自動スクロール
    setTimeout(() => {
      const resultElement = document.getElementById('stock-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  // FX計算の実行
  const runRiskAssessment = () => {
    // FX計算ロジック
    const currencyPair = fxInputs.currencyPair;
    const lotSize = parseFloat(fxInputs.lotSize) || 0;
    const entryPrice = parseFloat(fxInputs.entryPrice) || 0;
    const exitPrice = parseFloat(fxInputs.exitPrice) || 0;
    const leverage = parseInt(fxInputs.leverage) || 1;
    const currency = fxInputs.currency || 'USD';
    const pipUnit = fxInputs.pipUnit; // 1pipの単位（1000通貨または10000通貨）
    const position = fxInputs.position; // 売り('sell')または買い('buy')

    // JPYペアの場合は価格差に100をかける（小数点第2位まで）
    // それ以外のペアは価格差に10000をかける（小数点第4位まで）
    let priceDifference = exitPrice - entryPrice;

    // 売りポジションの場合、価格差を反転
    if (position === 'sell') {
      priceDifference = -priceDifference;
    }

    // GMOクリック証券FXネオのシミュレーターのロジックを参考に修正

    // 必要証拠金の計算
    // 必要証拠金 = 取引数量 × 通貨単位 × 売買レート × 0.04
    const requiredMargin = lotSize * pipUnit * entryPrice * 0.04;

    // 1pipあたりの価値の計算
    // 1pipあたりの価値 = 取引数量 × 通貨単位 × 0.01
    const pipValue = lotSize * pipUnit * 0.01;

    // 利益/損失の計算
    // GMOクリック証券FXネオでは、価格差が1pip=0.01円(JPYペア)または0.0001(非JPYペア)単位で計算される
    const pipDifference = currencyPair.includes('JPY') ? priceDifference * 100 : priceDifference * 10000;
    const profit = pipDifference * pipValue;

    // 取引手数料（10,000通貨あたり500円を基準）
    const fee = (lotSize * 500).toFixed(0);

    // リスクリワード比の計算（利益/損失の絶対値 ÷ 取引手数料）
    const riskRewardRatio = (Math.abs(profit) / parseFloat(fee)).toFixed(2);

    // 総利益/損失（利益/損失 - 手数料）
    const totalProfit = (profit - parseFloat(fee)).toFixed(0);

    // 初心者向けアドバイス
    let advice = 'FX取引はリスクがあります。まずはデモ口座で練習してみましょう。';

    if (profit > 0) {
      advice = '利益が出ていますが、利益確定のタイミングも重要です。';
      if (parseFloat(totalProfit) < 0) {
        advice += '手数料を考慮すると損失が出ています。取引コストも考慮した運用を心がけましょう。';
      }
    } else if (profit < 0) {
      advice = '損失が出ています。損切りラインを設定し、損失を最小限に抑えましょう。';
    }

    // レバレッジに関するアドバイス
    if (leverage > 100) {
      advice += '高レバレッジはリスクが高くなります。初心者には10倍以下のレバレッジをおすすめします。';
    } else if (leverage > 25) {
      advice += '中程度のレバレッジを使用しています。リスク管理に注意してください。';
    } else {
      advice += '適切なレバレッジを使用しています。';
    }

    // 必要証拠金に関するアドバイス
    if (requiredMargin > 100000) {
      advice += '必要証拠金が高額です。少額から始めるのが初心者にはおすすめです。';
    }

    setCalculationResult({
      type: 'risk',
      profit: Math.round(profit).toLocaleString(),
      fee: fee,
      margin: Math.round(requiredMargin).toLocaleString(),
      riskRewardRatio: riskRewardRatio,
      totalProfit: totalProfit,
      advice: advice,
      position: position,
      pipUnit: pipUnit
    });

    // モバイル時の自動スクロール
    setTimeout(() => {
      const resultElement = document.getElementById('risk-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const questions = [
    {
      question: "投資経験はどのくらいありますか?",
      options: [
        { value: "beginner", label: "未経験・初心者" },
        { value: "intermediate", label: "1〜3年程度" },
        { value: "advanced", label: "3年以上" },
      ],
    },
    {
      question: "投資の主な目的は何ですか?",
      options: [
        { value: "retirement", label: "老後資金の準備" },
        { value: "wealth", label: "資産を増やしたい" },
        { value: "education", label: "教育資金の準備" },
      ],
    },
    {
      question: "リスクに対する考え方は?",
      options: [
        { value: "conservative", label: "安定重視・リスク回避" },
        { value: "moderate", label: "バランス型" },
        { value: "aggressive", label: "リターン重視・リスク許容" },
      ],
    },
    {
      question: "現在の年齢層は?",
      options: [
        { value: "20s", label: "20代" },
        { value: "30s", label: "30代" },
        { value: "40s", label: "40代" },
        { value: "50s", label: "50代" },
        { value: "60s", label: "60代以上" },
      ],
    },
    {
      question: "現在の収入状況は?",
      options: [
        { value: "low", label: "300万円未満" },
        { value: "medium", label: "300万円〜500万円" },
        { value: "high", label: "500万円以上" },
      ],
    },
    {
      question: "投資知識のレベルは?",
      options: [
        { value: "basic", label: "基本的な知識のみ" },
        { value: "intermediate", label: "中級者レベル" },
        { value: "advanced", label: "上級者レベル" },
      ],
    },
    {
      question: "投資期間の希望は?",
      options: [
        { value: "short", label: "1〜3年" },
        { value: "medium", label: "3〜10年" },
        { value: "long", label: "10年以上" },
      ],
    },
    {
      question: "期待する年間リターンは?",
      options: [
        { value: "low", label: "3%未満" },
        { value: "medium", label: "3%〜7%" },
        { value: "high", label: "7%以上" },
      ],
    },
    {
      question: "投資にかける時間は?",
      options: [
        { value: "little", label: "月1〜2時間程度" },
        { value: "some", label: "週1〜2時間程度" },
        { value: "lot", label: "日々チェックできる" },
      ],
    },
    {
      question: "投資資金の元本保証の重要度は?",
      options: [
        { value: "high", label: "非常に重要" },
        { value: "medium", label: "ある程度重要" },
        { value: "low", label: "あまり重要ではない" },
      ],
    },
  ];

  const getRecommendation = () => {
    const answer0 = answers[0] || [];
    const answer1 = answers[1] || [];
    const answer2 = answers[2] || [];
    const answer3 = answers[3] || [];
    const answer4 = answers[4] || [];
    const answer5 = answers[5] || [];
    const answer6 = answers[6] || [];
    const answer7 = answers[7] || [];
    const answer8 = answers[8] || [];
    const answer9 = answers[9] || [];

    // 各質問から最初の回答のみを使用
    const firstAnswer0 = answer0.length > 0 ? answer0[0] : "";
    const firstAnswer1 = answer1.length > 0 ? answer1[0] : "";
    const firstAnswer2 = answer2.length > 0 ? answer2[0] : "";
    const firstAnswer3 = answer3.length > 0 ? answer3[0] : "";
    const firstAnswer4 = answer4.length > 0 ? answer4[0] : "";
    const firstAnswer5 = answer5.length > 0 ? answer5[0] : "";
    const firstAnswer6 = answer6.length > 0 ? answer6[0] : "";
    const firstAnswer7 = answer7.length > 0 ? answer7[0] : "";
    const firstAnswer8 = answer8.length > 0 ? answer8[0] : "";
    const firstAnswer9 = answer9.length > 0 ? answer9[0] : "";

    if (firstAnswer0 === "beginner") {
      if (firstAnswer2 === "conservative") {
        return {
          title: "つみたてNISA + インデックス投資",
          description: "初心者で安定志向のあなたには、つみたてNISAでインデックスファンドへの積立投資がおすすめです。",
          features: [
            "月100円から始められる",
            "非課税枠を活用",
            "長期分散投資でリスク軽減",
            "具体的な商品例：eMAXIS Slim 全世界株式（オールカントリー）",
            "投資戦略：毎月10日に自動積立設定を推奨"
          ],
          industryAdvice: [
            {
              industry: "株式投資",
              advice: "楽天証券やSBI証券など、手数料が安く初心者向けの証券会社で口座を開設しましょう。eMAXIS Slim 全世界株式（オールカントリー）を毎月1万円で積立投資します。",
              buttonLabel: "証券会社を比較する",
              buttonLink: "/comparison"
            },
            {
              industry: "投資信託",
              advice: "つみたてNISA枠を活用して、eMAXIS Slim 全世界株式（オールカントリー）を毎月積立投資します。分散投資によりリスクを軽減できます。",
              buttonLabel: "証券会社を比較する",
              buttonLink: "/comparison"
            }
          ],
          selectedAnswers: {
            answer0: [firstAnswer0],
            answer1: [firstAnswer1],
            answer2: [firstAnswer2],
            answer3: [firstAnswer3],
            answer4: [firstAnswer4],
            answer5: [firstAnswer5],
            answer6: [firstAnswer6],
            answer7: [firstAnswer7],
            answer8: [firstAnswer8],
            answer9: [firstAnswer9]
          }
        };
      }
      return {
        title: "NISA + バランス型投資信託",
        description: "初心者のあなたには、NISAを活用したバランス型投資信託がおすすめです。",
        features: [
          "年120万円の非課税枠",
          "株式と債のバランス投資",
          "プロによる運用",
          "具体的な商品例：ニッセイ・バランスファンド",
          "投資戦略：毎月5日に自動積立設定を推奨"
        ],
        industryAdvice: [
          {
            industry: "株式投資",
            advice: "SBI証券や楽天証券などでNISA口座を開設し、ニッセイ・バランスファンドを毎月1万円で積立投資します。株式と債券のバランスにより、リスクとリターンのバランスが取れています。",
            buttonLabel: "証券会社を比較する",
            buttonLink: "/comparison"
          },
          {
            industry: "投資信託",
            advice: "NISA枠を活用して、ニッセイ・バランスファンドを毎月積立投資します。プロのファンドマネージャーによる運用により、手間をかけずに資産を増やせます。",
            buttonLabel: "証券会社を比較する",
            buttonLink: "/comparison"
          }
        ],
        selectedAnswers: {
          answer0: [firstAnswer0],
          answer1: [firstAnswer1],
          answer2: [firstAnswer2],
          answer3: [firstAnswer3],
          answer4: [firstAnswer4],
          answer5: [firstAnswer5],
          answer6: [firstAnswer6],
          answer7: [firstAnswer7],
          answer8: [firstAnswer8],
          answer9: [firstAnswer9]
        }
      };
    }

    if (firstAnswer2 === "aggressive") {
      return {
        title: "個別株投資 + 成長株戦略",
        description: "積極的なあなたには、成長性の高い個別株への投資がおすすめです。",
        features: [
          "高いリターンを狙える",
          "企業分析スキルが身につく",
          "配当金も期待できる",
          "具体的な銘柄例：ソフトバンクグループ、メルカリ",
          "投資戦略：四半期ごとの業績レビューと調整を推奨"
        ],
        industryAdvice: [
          {
            industry: "株式投資",
            advice: "SBI証券やマネックス証券などで口座を開設し、ソフトバンクグループやメルカリなどの成長株を購入します。四半期ごとに業績をレビューし、必要に応じて売買します。",
            buttonLabel: "証券会社を比較する",
            buttonLink: "/comparison"
          },
          {
            industry: "FX",
            advice: "積極的な投資家には、為替相場の変動を活用したスキャルピングやデイトレードがおすすめです。GMOクリック証券やDMM FXなどの低スプレッドな業者を利用しましょう。",
            buttonLabel: "FX業者を比較する",
            buttonLink: "/fx-comparison"
          }
        ],
        selectedAnswers: {
          answer0: [firstAnswer0],
          answer1: [firstAnswer1],
          answer2: [firstAnswer2],
          answer3: [firstAnswer3],
          answer4: [firstAnswer4],
          answer5: [firstAnswer5],
          answer6: [firstAnswer6],
          answer7: [firstAnswer7],
          answer8: [firstAnswer8],
          answer9: [firstAnswer9]
        }
      };
    }

    return {
      title: "NISA + 投資信託",
      description: "バランスの取れた投資スタイルで、着実に資産を増やしましょう。",
      features: [
        "非課税のメリット",
        "分散投資でリスク管理",
        "手間をかけずに運用",
        "具体的な商品例：楽天・全米株式インデックスファンド",
        "投資戦略：毎月15日に自動積立設定を推奨"
      ],
      industryAdvice: [
        {
          industry: "株式投資",
          advice: "SBI証券や楽天証券などでNISA口座を開設し、楽天・全米株式インデックスファンドを毎月1万円で積立投資します。米国株式の成長性と分散投資の効果を享受できます。",
          buttonLabel: "証券会社を比較する",
          buttonLink: "/comparison"
        },
        {
          industry: "投資信託",
          advice: "NISA枠を活用して、楽天・全米株式インデックスファンドを毎月積立投資します。米国株式の成長性とインデックス投資の低コストを活かせます。",
          buttonLabel: "証券会社を比較する",
          buttonLink: "/comparison"
        }
      ],
      selectedAnswers: {
        answer0: [firstAnswer0],
        answer1: [firstAnswer1],
        answer2: [firstAnswer2],
        answer3: [firstAnswer3],
        answer4: [firstAnswer4],
        answer5: [firstAnswer5],
        answer6: [firstAnswer6],
        answer7: [firstAnswer7],
        answer8: [firstAnswer8],
        answer9: [firstAnswer9]
      }
    };
  };

  const renderSelectedOptions = (questionIndex: number, selectedValues: string[]) => {
    const question = questions[questionIndex];
    // 最初の選択肢のみ表示
    const firstSelectedValue = selectedValues.length > 0 ? selectedValues[0] : '';
    const option = question.options.find(opt => opt.value === firstSelectedValue);
    return option ? option.label : 'なし';
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [step]: [value],
    }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const recommendation = getRecommendation();
      setResult(recommendation.title);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    // 診断セクションの上部にスクロール
    const diagnosticSection = document.getElementById("診断");
    if (diagnosticSection) {
      diagnosticSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (result) {
    const recommendation = getRecommendation();
    return (
      <>
        <div className="container mx-auto px-4 pb-12">
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="text-center px-4 sm:px-6">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">あなたにおすすめの投資方法</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{recommendation.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{recommendation.description}</p>
              </div>

              <div className="space-y-3">
                {recommendation.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* 計算ツールセクションをアドバイスセクションの上に配置 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold mb-4 text-center text-blue-800">投資シミュレーションツール</h3>
                <p className="text-blue-700 text-center mb-6">
                  各シミュレーションツールで将来の資産がどのようになるかを試算できます。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card
                    className="border-2 hover:shadow-lg transition-shadow cursor-pointer hover:scale-105"
                    onClick={() => {
                      setCalculatorType('sip');
                      setShowCalculator(true);
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        積立投資シミュレータ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        つみたてNISAや投資信託など、定期的な積立投資の効果をシミュレーションします。
                      </p>
                      <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                        使ってみる
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="border-2 hover:shadow-lg transition-shadow cursor-pointer hover:scale-105"
                    onClick={() => {
                      setCalculatorType('stock');
                      setShowCalculator(true);
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-500" />
                        個別株投資シミュレータ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        個別株への投資で期待されるリターンとリスクをシミュレーションします。
                      </p>
                      <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                        使ってみる
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="border-2 hover:shadow-lg transition-shadow cursor-pointer hover:scale-105"
                    onClick={() => {
                      setCalculatorType('risk');
                      setShowCalculator(true);
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5 text-purple-500" />
                        FX計算ツール
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        FX（外国為替証拠金取引）の利益とリスクを簡単に計算できます。初心者でもわかりやすいように設計されています。
                      </p>
                      <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                        使ってみる
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.industryAdvice && recommendation.industryAdvice.map((advice, index) => (
                  <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{advice.industry}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{advice.advice}</p>
                      <Button asChild size="sm" className="w-full">
                        <Link to={advice.buttonLink}>{advice.buttonLabel}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={handleReset} className="flex-1 w-full py-6 text-xs xs:text-sm sm:text-base whitespace-nowrap">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  もう一度診断する
                </Button>
                <Button className="flex-1 w-full py-6 text-xs xs:text-sm sm:text-base bg-[#10b77f] hover:bg-[#0ea66e] text-white whitespace-nowrap" asChild>
                  <a href="/tools/risk-assessment#diagnostic-tool">
                    総合診断ツール
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 計算ツールモーダル */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
            <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[95vh] flex flex-col">
              <div className="sticky top-0 bg-white border-b p-3 sm:p-4 flex justify-between items-center rounded-t-xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  {calculatorType === 'sip' && '積立投資シミュレータ'}
                  {calculatorType === 'stock' && '個別株投資シミュレータ'}
                  {calculatorType === 'risk' && 'FX計算ツール'}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  onClick={() => setShowCalculator(false)}
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto flex-1 p-3 sm:p-4 md:p-6">
                {calculatorType === 'sip' && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm">つみたてNISAや投資信託など、定期的な積立投資の効果を簡単にシミュレーションできます。複利の力で資産がどのように増えていくかを試算しましょう。</p>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-bold text-blue-800 mb-1 text-sm">積立投資初心者向けガイド</h5>
                      <ul className="list-disc pl-4 space-y-1 text-xs">
                        <li>毎月の投資額：毎月積み立てる金額（例：1万円）</li>
                        <li>期待リターン：年間の平均リターン（例：5%）</li>
                        <li>投資期間：積立を続ける年数（例：30年）</li>
                        <li>初期投資額：最初に投資する金額（例：10万円）</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="monthlyInvestment" className="text-sm">毎月の投資額（円）</Label>
                        <p className="text-xs text-muted-foreground mb-1">毎月積み立てる金額（例：10000）</p>
                        <input
                          id="monthlyInvestment"
                          type="number"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 10000"
                          value={sipInputs.monthlyInvestment}
                          onChange={(e) => setSipInputs({ ...sipInputs, monthlyInvestment: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expectedReturn" className="text-sm">期待リターン（%）</Label>
                        <p className="text-xs text-muted-foreground mb-1">年間の平均リターン（例：5.0）</p>
                        <input
                          id="expectedReturn"
                          type="number"
                          step="0.1"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 5.0"
                          value={sipInputs.expectedReturn}
                          onChange={(e) => setSipInputs({ ...sipInputs, expectedReturn: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="investmentPeriod" className="text-sm">投資期間（年）</Label>
                        <p className="text-xs text-muted-foreground mb-1">積立を続ける年数（例：30）</p>
                        <input
                          id="investmentPeriod"
                          type="number"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 10"
                          value={sipInputs.investmentPeriod}
                          onChange={(e) => setSipInputs({ ...sipInputs, investmentPeriod: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="initialAmount" className="text-sm">初期投資額（円）</Label>
                        <p className="text-xs text-muted-foreground mb-1">最初に投資する金額（例：100000）</p>
                        <input
                          id="initialAmount"
                          type="number"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 100000"
                          value={sipInputs.initialAmount}
                          onChange={(e) => setSipInputs({ ...sipInputs, initialAmount: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button className="w-full py-2 text-sm" onClick={runSipSimulation}>シミュレーションを実行</Button>
                    {calculationResult && calculationResult.type === 'sip' && (
                      <div id="sip-result" className="bg-blue-50 p-3 rounded-lg mt-3 sm:mt-4">
                        <h5 className="font-bold text-blue-800 mb-1 text-sm">シミュレーション結果</h5>
                        <div className="space-y-1 text-sm">
                          <p className="font-semibold">投資総額: <span className="font-normal">{calculationResult.totalInvestment}円</span></p>
                          <p className="font-semibold">将来価値: <span className="font-normal">{calculationResult.futureValue}円</span></p>
                          <p className="font-semibold">利益: <span className="font-normal">{calculationResult.profit}円</span></p>
                        </div>
                        <div className="mt-2 p-2 bg-yellow-50 rounded">
                          <p className="font-semibold text-yellow-800 text-xs">投資アドバイス:</p>
                          <p className="text-yellow-700 text-xs">
                            {parseInt(calculationResult.profit.replace(/,/g, "")) > 0
                              ? "利益が出ています。複利の効果により、長期的な資産形成が期待できます。"
                              : "利益が少ないようです。投資期間を延ばすか、リターンの高い商品を検討してみましょう。"}
                          </p>
                        </div>
                        <div className="mt-3 p-3 bg-yellow-50 rounded">
                          <p className="font-semibold text-yellow-800">※このシミュレーション結果は、実際の取引では市場状況や会社方針により異なる場合があります。</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {calculatorType === 'stock' && (
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm">個別株への投資で期待されるリターンとリスクを簡単にシミュレーションできます。株価の変動と配当収入による収益を試算しましょう。</p>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-bold text-green-800 mb-1 text-sm">個別株投資初心者向けガイド</h5>
                      <ul className="list-disc pl-4 space-y-1 text-xs">
                        <li>株価：現在の株価（例：3000円）</li>
                        <li>株数：購入する株の数（例：100株）</li>
                        <li>購入価格：株を買った時の価格（例：2500円）</li>
                        <li>配当利回り：年間の配当金の割合（例：2.5%）</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="stockPrice" className="text-sm">株価（円）</Label>
                        <p className="text-xs text-muted-foreground mb-1">現在の株価（例：3000）</p>
                        <input
                          id="stockPrice"
                          type="number"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 3000"
                          value={stockInputs.stockPrice}
                          onChange={(e) => setStockInputs({ ...stockInputs, stockPrice: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="shares" className="text-sm">株数</Label>
                        <p className="text-xs text-muted-foreground mb-1">購入する株の数（例：100）</p>
                        <input
                          id="shares"
                          type="number"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 100"
                          value={stockInputs.shares}
                          onChange={(e) => setStockInputs({ ...stockInputs, shares: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="purchasePrice" className="text-sm">購入価格（円）</Label>
                        <p className="text-xs text-muted-foreground mb-1">株を買った時の価格（例：2500）</p>
                        <input
                          id="purchasePrice"
                          type="number"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 2500"
                          value={stockInputs.purchasePrice}
                          onChange={(e) => setStockInputs({ ...stockInputs, purchasePrice: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dividendYield" className="text-sm">配当利回り（%）</Label>
                        <p className="text-xs text-muted-foreground mb-1">年間の配当金の割合（例：2.5）</p>
                        <input
                          id="dividendYield"
                          type="number"
                          step="0.1"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 2.5"
                          value={stockInputs.dividendYield}
                          onChange={(e) => setStockInputs({ ...stockInputs, dividendYield: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button className="w-full py-2 text-sm" onClick={runStockSimulation}>シミュレーションを実行</Button>
                    {calculationResult && calculationResult.type === 'stock' && (
                      <div id="stock-result" className="bg-green-50 p-3 rounded-lg mt-3 sm:mt-4">
                        <h5 className="font-bold text-green-800 mb-1 text-sm">シミュレーション結果</h5>
                        <div className="space-y-1 text-sm">
                          <p className="font-semibold">投資総額: <span className="font-normal">{calculationResult.investmentAmount}円</span></p>
                          <p className="font-semibold">評価損益: <span className="font-normal">{calculationResult.profitLoss}円</span></p>
                          <p className="font-semibold">配当収入: <span className="font-normal">{calculationResult.dividendIncome}円</span></p>
                        </div>
                        <div className="mt-2 p-2 bg-yellow-50 rounded">
                          <p className="font-semibold text-yellow-800 text-xs">投資アドバイス:</p>
                          <p className="text-yellow-700 text-xs">
                            {parseInt(calculationResult.profitLoss.replace(/,/g, "")) > 0
                              ? "評価損益がプラスです。株価が上がったことで利益が出ています。"
                              : "評価損益がマイナスです。株価が下がったことで損失が出ています。"}
                            {parseInt(calculationResult.dividendIncome.replace(/,/g, "")) > 0
                              ? "また、配当収入も得られています。"
                              : "配当収入はまだ得られていません。"}
                          </p>
                        </div>
                        <div className="mt-3 p-3 bg-yellow-50 rounded">
                          <p className="font-semibold text-yellow-800">※このシミュレーション結果は、実際の取引では市場状況や会社方針により異なる場合があります。</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {calculatorType === 'risk' && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">FX（外国為替証拠金取引）の利益とリスクを簡単に計算できます。実際の取引前にシミュレーションして、自分の投資計画を立てましょう。</p>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-bold text-blue-800 mb-2 text-sm">FX初心者向けガイド</h5>
                      <ul className="list-disc pl-4 space-y-1 text-xs">
                        <li>ロット数：取引の単位（0.1ロット = 1,000通貨）</li>
                        <li>エントリー価格：買う時の価格</li>
                        <li>イグジット価格：売る時の価格</li>
                        <li>レバレッジ：少ないお金で大きな取引をする機能（GMOクリック証券FXネオでは25倍固定）</li>
                        <li>必要証拠金：取引に必要な保証金（ロット数 × 通貨単位 × エントリー価格 × 0.04）</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="currencyPair" className="text-sm">通貨ペア</Label>
                        <p className="text-xs text-muted-foreground mb-1">取引する通貨の組み合わせを選んでください</p>
                        <select
                          id="currencyPair"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          value={fxInputs.currencyPair}
                          onChange={(e) => setFxInputs({ ...fxInputs, currencyPair: e.target.value })}
                        >
                          <option value="USD/JPY">USD/JPY（ドル/円）</option>
                          <option value="EUR/JPY">EUR/JPY（ユーロ/円）</option>
                          <option value="GBP/JPY">GBP/JPY（ポンド/円）</option>
                          <option value="AUD/JPY">AUD/JPY（オーストラリアドル/円）</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm">ポジション</Label>
                        <p className="text-xs text-muted-foreground mb-1">買いまたは売りを選択してください</p>
                        <div className="flex gap-4">
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="position"
                              value="buy"
                              checked={fxInputs.position === 'buy'}
                              onChange={() => setFxInputs({ ...fxInputs, position: 'buy' })}
                              className="mr-2"
                            />
                            買い
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="position"
                              value="sell"
                              checked={fxInputs.position === 'sell'}
                              onChange={() => setFxInputs({ ...fxInputs, position: 'sell' })}
                              className="mr-2"
                            />
                            売り
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="lotSize" className="text-sm">ロット数</Label>
                        <p className="text-xs text-muted-foreground mb-1">取引の単位（例：0.1 = 1,000通貨、1.0 = 10,000通貨）</p>
                        <input
                          id="lotSize"
                          type="number"
                          step="0.01"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 0.1"
                          value={fxInputs.lotSize}
                          onChange={(e) => setFxInputs({ ...fxInputs, lotSize: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">1pipの単位</Label>
                        <p className="text-xs text-muted-foreground mb-1">1000通貨または10000通貨を選択してください</p>
                        <div className="flex gap-4">
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="pipUnit"
                              value="1000"
                              checked={fxInputs.pipUnit === 1000}
                              onChange={() => setFxInputs({ ...fxInputs, pipUnit: 1000 })}
                              className="mr-2"
                            />
                            1000通貨
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="pipUnit"
                              value="10000"
                              checked={fxInputs.pipUnit === 10000}
                              onChange={() => setFxInputs({ ...fxInputs, pipUnit: 10000 })}
                              className="mr-2"
                            />
                            10000通貨
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="entryPrice" className="text-sm">エントリー価格</Label>
                        <p className="text-xs text-muted-foreground mb-1">買う時の為替レート（例：110.000）</p>
                        <input
                          id="entryPrice"
                          type="number"
                          step="0.001"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 110.000"
                          value={fxInputs.entryPrice}
                          onChange={(e) => setFxInputs({ ...fxInputs, entryPrice: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="exitPrice" className="text-sm">イグジット価格</Label>
                        <p className="text-xs text-muted-foreground mb-1">売る時の為替レート（例：111.000）</p>
                        <input
                          id="exitPrice"
                          type="number"
                          step="0.001"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          placeholder="例: 111.000"
                          value={fxInputs.exitPrice}
                          onChange={(e) => setFxInputs({ ...fxInputs, exitPrice: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="leverage" className="text-sm">レバレッジ</Label>
                        <p className="text-xs text-muted-foreground mb-1">少ないお金で大きな取引をする倍率</p>
                        <select
                          id="leverage"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          value={fxInputs.leverage}
                          onChange={(e) => setFxInputs({ ...fxInputs, leverage: e.target.value })}
                        >
                          <option value="1">1:1（レバレッジなし）</option>
                          <option value="10">1:10（10倍）</option>
                          <option value="25">1:25（25倍）</option>
                          <option value="50">1:50（50倍）</option>
                          <option value="100">1:100（100倍）</option>
                          <option value="200">1:200（200倍）</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="currency" className="text-sm">基軸通貨</Label>
                        <p className="text-xs text-muted-foreground mb-1">利益を計算する通貨</p>
                        <select
                          id="currency"
                          className="w-full px-2 py-1.5 border border-input rounded-md text-sm"
                          value={fxInputs.currency}
                          onChange={(e) => setFxInputs({ ...fxInputs, currency: e.target.value })}
                        >
                          <option value="USD">USD（米ドル）</option>
                          <option value="JPY">JPY（日本円）</option>
                          <option value="EUR">EUR（ユーロ）</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full py-2 text-sm" onClick={runRiskAssessment}>計算を実行</Button>
                    {calculationResult && calculationResult.type === 'risk' && (
                      <div id="risk-result" className="bg-purple-50 p-3 rounded-lg mt-3">
                        <h5 className="font-bold text-purple-800 mb-2 text-sm">FX計算結果</h5>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div>
                            <p className="font-semibold">利益/損失: <span className="font-normal">{calculationResult.profit}円</span></p>
                            <p className="text-xs text-muted-foreground">計算式: 価格差(pip) × 1pipあたりの価値</p>
                          </div>
                          <div>
                            <p className="font-semibold">取引手数料: <span className="font-normal">{calculationResult.fee}円</span></p>
                            <p className="text-xs text-muted-foreground">10,000通貨あたり500円を基準</p>
                          </div>
                          <div>
                            <p className="font-semibold">必要証拠金: <span className="font-normal">{calculationResult.margin}円</span></p>
                            <p className="text-xs text-muted-foreground">計算式: ロット数 × 通貨単位 × エントリー価格 × 0.04</p>
                          </div>
                          <div>
                            <p className="font-semibold">リスクリワード比: <span className="font-normal">{calculationResult.riskRewardRatio}</span></p>
                            <p className="text-xs text-muted-foreground">利益/損失の絶対値 ÷ 取引手数料</p>
                          </div>
                          <div>
                            <p className="font-semibold">総利益/損失: <span className="font-normal">{calculationResult.totalProfit}円</span></p>
                            <p className="text-xs text-muted-foreground">計算式: 利益/損失 - 取引手数料</p>
                          </div>
                          <div>
                            <p className="font-semibold">ポジション: <span className="font-normal">{calculationResult.position === 'buy' ? '買い' : '売り'}</span></p>
                          </div>
                          <div>
                            <p className="font-semibold">1pip単位: <span className="font-normal">{calculationResult.pipUnit}通貨</span></p>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-yellow-50 rounded">
                          <p className="font-semibold text-yellow-800 text-xs">※このシミュレーション結果は、実際の取引では市場状況や会社方針により異なる場合があります。</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">質問 {step + 1} / {questions.length}</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {questions[step].question}
                <span className="block text-xs mt-1 text-primary font-medium">1つの選択肢のみ選択してください</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="space-y-2 sm:space-y-3">
                {questions[step].options.map((option) => {
                  const isChecked = (answers[step] || []).includes(option.value);
                  return (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${isChecked ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50"
                        }`}
                      onClick={() => handleAnswer(option.value)}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
                        {isChecked && <div className="h-2 w-2 rounded-full bg-primary" />}
                      </div>
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer text-sm sm:text-base font-medium">
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 pt-4">
                {/* モバイル用のボタンレイアウト */}
                <div className="flex gap-3 sm:hidden">
                  {step > 0 && (
                    <Button
                      onClick={() => setStep(step - 1)}
                      variant="outline"
                      size="icon"
                      className="h-12 w-12"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!answers[step] || answers[step].length === 0}
                    className="flex-1 h-12 text-base"
                  >
                    {step < questions.length - 1 ? "次へ" : "診断結果を見る"}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="destructive"
                    size="icon"
                    className="h-12 w-12"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* PC用のボタンレイアウト */}
                <div className="hidden sm:flex gap-3">
                  {step > 0 && (
                    <Button onClick={() => setStep(step - 1)} variant="outline" size="lg" className="px-6 py-6">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      戻る
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!answers[step] || answers[step].length === 0}
                    className="gap-2 flex-1 px-8 py-6 text-lg"
                    size="lg"
                  >
                    {step < questions.length - 1 ? (
                      <>
                        次へ
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        診断結果を見る
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="destructive"
                    size="lg"
                    disabled={step === 0 && (!answers[0] || answers[0].length === 0)}
                    className="px-6 py-6"
                  >
                    やめる
                    <X className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="flex gap-1 justify-center">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-12 sm:w-16 rounded-full transition-colors ${index <= step ? "bg-primary" : "bg-muted"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default InvestmentDiagnostic;