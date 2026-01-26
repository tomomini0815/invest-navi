import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp, Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AIPortfolioOptimization = () => {
  const navigate = useNavigate();

  const article = {
    id: "ai-portfolio-optimization",
    title: "AIによるポートフォリオ最適化の実践",
    excerpt: "機械学習と最適化アルゴリズムを使用して、リスクとリターンのバランスを取った最適な資産配分を実現する方法を解説します。",
    category: "投資AI",
    date: "2024年6月27日",
    content: `
      <div class="prose max-w-none">
        <p class="text-lg leading-relaxed mb-6">AIを活用したポートフォリオ最適化は、投資家のリスク許容度とリターン目標に基づいて、最適な資産配分を自動的に決定する先進的なアプローチです。本記事では、現代ポートフォリオ理論（MPT）をベースにしながら、機械学習や最適化アルゴリズムを活用して、より実践的なポートフォリオ最適化を実現する方法を詳しく解説します。</p>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">ポートフォリオ最適化の基本概念</h2>
        <p class="mb-4">ポートフォリオ最適化とは、与えられたリスクの下で期待リターンを最大化する、または与えられたリターンの下でリスクを最小化する資産配分を求めるプロセスです。</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-blue-50 p-6 rounded-xl">
            <h3 class="font-bold text-blue-800 mb-3">現代ポートフォリオ理論（MPT）</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>リスクを分散させることで、全体のリスクを低減できる</li>
              <li>期待リターンとリスク（標準偏差）の関係を分析</li>
              <li>効率的フロンティアの概念</li>
              <li>シャープレシオによるリスク調整リターンの評価</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-xl">
            <h3 class="font-bold text-green-800 mb-3">AIを活用した最適化の利点</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>非線形なリスク・リターンの関係をモデル化</li>
              <li>多変量の制約条件を考慮可能</li>
              <li>動的なリバランスの自動化</li>
              <li>マーケットレジームの変化への適応</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">リスクとリターンのモデリング</h2>
        <p class="mb-4">ポートフォリオ最適化の核となるのは、各資産のリターンとリスク、そして資産間の相関関係を正確にモデリングすることです。</p>
        
        <div class="space-y-8 my-8">
          <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-6 rounded-r-lg">
            <h3 class="font-bold text-blue-700 mb-3">リターンの予測モデル</h3>
            <p class="mb-3">各資産の将来リターンを予測するために、以下の手法を活用できます：</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>時系列分析（ARIMA、GARCHなど）</li>
              <li>機械学習（ランダムフォレスト、勾配ブースティング）</li>
              <li>ディープラーニング（LSTM、Transformer）</li>
              <li>ファンダメンタル分析との統合</li>
            </ul>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-6 rounded-r-lg">
            <h3 class="font-bold text-green-700 mb-3">リスク（共分散）の推定</h3>
            <p class="mb-3">資産間の相関関係を考慮したリスク推定は、ポートフォリオ最適化の鍵です：</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>歴史的共分散行列の計算</li>
              <li>指数加重移動平均（EWMA）による動的推定</li>
              <li>シュリッカー推定量の活用</li>
              <li>因子モデルによるリスク分解</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">最適化アルゴリズムの実装</h2>
        <p class="mb-4">ポートフォリオ最適化問題を解くための最適化アルゴリズムを実装していきます。ここでは、Pythonのcvxpyライブラリを使用します。</p>
        
        <div class="bg-purple-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-purple-800 mb-3">Mean-Variance最適化</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
import cvxpy as cp
import numpy as np

# 資産数
n_assets = len(expected_returns)

# 最適化変数（資産のウェイト）
weights = cp.Variable(n_assets)

# 目的関数（リターン最大化、リスク最小化のバランス）
objective = cp.Minimize(risk_aversion * cp.quad_form(weights, cov_matrix) 
                       - expected_returns.T @ weights)

# 制約条件
constraints = [
    cp.sum(weights) == 1,  # ウェイトの合計は1
    weights >= 0,          # ショート売空なし
    weights <= 0.3         # 各資産の最大ウェイトを30%に制限
]

# 最適化問題の定義と解決
problem = cp.Problem(objective, constraints)
problem.solve()

# 最適ウェイトの取得
optimal_weights = weights.value
          </pre>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">ブラック-リッター最適化</h2>
        <p class="mb-4">ブラック-リッター最適化は、投資家の事前信念（ビュー）を市場均衡リターンに組み込むことで、より実践的なポートフォリオ最適化を実現する手法です。</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-yellow-50 p-6 rounded-xl">
            <h3 class="font-bold text-yellow-800 mb-3">ブラック-リッターモデルの概要</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>市場均衡リターンの推定</li>
              <li>投資家のビューの定式化</li>
              <li>不確実性の定量化</li>
              <li>事後リターンの計算</li>
            </ul>
          </div>
          <div class="bg-indigo-50 p-6 rounded-xl">
            <h3 class="font-bold text-indigo-800 mb-3">実装例</h3>
            <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
from pyblacklitterman import BlackLittermanModel

# マーケットパラメータ
market_caps = np.array([1000, 800, 1200])  # 市場キャップ
risk_aversion = 2.5
cov_matrix = np.array([[0.04, 0.01, 0.02],
                       [0.01, 0.09, 0.03],
                       [0.02, 0.03, 0.16]])

# 投資家のビュー
P = np.array([[1, -1, 0]])  # ビュー行列
Q = np.array([0.05])        # ビューのリターン
omega = np.array([[0.001]]) # ビューの不確実性

# ブラック-リッターモデルの構築
bl = BlackLittermanModel(delta=risk_aversion, 
                        market_caps=market_caps,
                        cov_matrix=cov_matrix,
                        P=P, Q=Q, omega=omega)
posterior_returns = bl.posterior_expected_returns()
            </pre>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">リスクパリティ最適化</h2>
        <p class="mb-4">リスクパリティ戦略は、各資産がポートフォリオ全体のリスクに均等に寄与するように資産配分を行うアプローチです。</p>
        
        <div class="bg-teal-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-teal-800 mb-3">リスクパリティの実装</h3>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
def risk_parity_weights(cov_matrix, max_iter=100, tolerance=1e-6):
    n = len(cov_matrix)
    weights = np.ones(n) / n  # 初期ウェイト
    
    for _ in range(max_iter):
        # ポートフォリオリスクの計算
        portfolio_risk = np.sqrt(weights @ cov_matrix @ weights)
        
        # 各資産のリスク寄与度の計算
        marginal_risk = cov_matrix @ weights / portfolio_risk
        risk_contributions = weights * marginal_risk
        
        # リスク寄与度の調整
        risk_diff = risk_contributions - portfolio_risk / n
        weights = weights - risk_diff / (2 * marginal_risk)
        
        # ウェイトの正規化
        weights = weights / np.sum(weights)
        
        # 収束判定
        if np.max(np.abs(risk_diff)) < tolerance:
            break
    
    return weights
          </pre>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">動的リバランスとモメンタムの考慮</h2>
        <p class="mb-4">市場状況の変化に応じてポートフォリオを動的に調整し、モメンタム効果も考慮することで、より高いリターンを狙います。</p>
        
        <div class="space-y-6 my-8">
          <div class="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-orange-700 mb-2">動的リバランス戦略</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>定期リバランス（月次、四半期ごとなど）</li>
              <li>閾値ベースリバランス（ウェイトが±5%以上乖離した場合）</li>
              <li>ロールリバランス（ファクターベースの調整）</li>
            </ul>
          </div>
          <div class="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-red-700 mb-2">モメンタムの統合</h3>
            <p>過去N期間のリターンを基に、上昇トレンドの資産にウェイトをシフトするモメンタム戦略を組み込みます。</p>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">バックテストとパフォーマンス評価</h2>
        <p class="mb-4">構築したポートフォリオ最適化モデルの性能を評価するために、過去のデータでバックテストを実施します。</p>
        
        <div class="bg-gray-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-gray-800 mb-3">評価指標</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 class="font-bold text-gray-700 mb-2">リターン系指標</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>年率リターン</li>
                <li>累積リターン</li>
                <li>超過リターン（ベンチマーク比）</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-700 mb-2">リスク系指標</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>年率ボラティリティ</li>
                <li>最大下落率（MDD）</li>
                <li>シャープレシオ</li>
                <li>ソーティノレシオ</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">実際の運用における考慮事項</h2>
        <div class="space-y-6 my-8">
          <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-blue-700 mb-2">トランザクションコスト</h3>
            <p>頻繁なリバランスはトランザクションコストを増加させるため、コストとリターンのバランスを考慮する必要があります。</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-green-700 mb-2">税務考慮</h3>
            <p>実際の運用では、キャピタルゲインにかかる税金もポートフォリオのパフォーマンスに影響します。税務効率の良い運用方法を検討しましょう。</p>
          </div>
          <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-purple-700 mb-2">ロボアドバイザーとの統合</h3>
            <p>AIによるポートフォリオ最適化をロボアドバイザーに統合することで、個人投資家にも高度な資産運用を提供できます。</p>
          </div>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-gray-800 mb-3">重要なポイント</h3>
          <p class="mb-3">AIを活用したポートフォリオ最適化は、従来の手法では実現できなかった高度な資産運用を可能にしますが、同時に多くの課題も伴います。AIによるポートフォリオ最適化を活用する際は、以下のポイントを意識しましょう：</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>モデルの複雑さと解釈性のバランスを取る</li>
            <li>過学習に警戒し、適切な検証手法を用いる</li>
            <li>実際の運用コストを考慮した現実的なモデル構築</li>
            <li>市場の変化に対応する柔軟性を保つ</li>
            <li>投資家のリスク許容度と目標に合致した最適化を行う</li>
          </ul>
        </div>
      </div>
    `,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.title} | 投資総合ナビ</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content="投資AI, ポートフォリオ最適化, 機械学習, リスク管理, 資産運用" />
        <link rel="canonical" href={`https://www.invest-navi.com/articles/${article.id}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${article.title} | 投資総合ナビ`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.invest-navi.com/articles/${article.id}`} />
        <meta property="og:site_name" content="投資総合ナビ" />
        <meta property="og:locale" content="ja_JP" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@toushi_navi" />
      </Helmet>

      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
          <div className="container mx-auto px-8">
            <Link
              to="/articles"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              記事一覧に戻る
            </Link>
          </div>
        </div>

        {/* 記事詳細セクション */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>

                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">{article.title}</h1>

              <div className="bg-card border rounded-xl p-6 mb-10">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <p className="text-muted-foreground">{article.excerpt}</p>
                  <Button variant="outline">記事を共有</Button>
                </div>
              </div>

              <div
                className="prose max-w-none mb-16"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* 関連記事 */}
              <div className="border-t pt-12 mt-16">
                <h2 className="text-2xl font-bold mb-8">関連記事</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">投資AI</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">機械学習を活用した株式予測モデルの構築方法</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">Pythonと機械学習アルゴリズムを使用して、株式の価格予測モデルを構築する実践的な方法を解説します。</p>
                      <button
                        className="w-full px-3 py-1.5 text-sm bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors"
                        onClick={() => navigate("/articles/ml-stock-prediction")}
                      >
                        記事を読む
                      </button>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">投資AI</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">ディープラーニングを用いた為替予測の実際</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">LSTMやTransformerなどの深層学習モデルを使用して、為替相場の動向を予測する実践的なアプローチを解説します。</p>
                      <button
                        className="w-full px-3 py-1.5 text-sm bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors"
                        onClick={() => navigate("/articles/dl-forex-prediction")}
                      >
                        記事を読む
                      </button>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">投資戦略</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">AIを活用した投資戦略の実際：機械学習からファンダメンタル分析まで</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">人工知能を活用した投資手法を実例とともに解説。初心者から上級者まで使えるテクニックを紹介します。</p>
                      <button
                        className="w-full px-3 py-1.5 text-sm bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors"
                        onClick={() => navigate("/articles/ai-investment-strategy")}
                      >
                        記事を読む
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AIPortfolioOptimization;