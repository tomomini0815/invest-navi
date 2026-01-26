import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp, Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";

const MLStockPrediction = () => {
  const navigate = useNavigate();

  const article = {
    id: "ml-stock-prediction",
    title: "機械学習を活用した株式予測モデルの構築方法",
    excerpt: "Pythonと機械学習アルゴリズムを使用して、株式の価格予測モデルを構築する実践的な方法を解説します。",
    category: "投資AI",
    readTime: "20分",
    date: "2024年6月25日",
    content: `
      <div class="prose max-w-none">
        <p class="text-lg leading-relaxed mb-6">機械学習は、株式市場の複雑なパターンを分析し、将来の価格変動を予測する強力なツールです。本記事では、Pythonとscikit-learnライブラリを使用して、実際の株式データから予測モデルを構築する方法を段階的に解説します。</p>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">機械学習による株式予測の基本</h2>
        <p class="mb-4">機械学習を用いた株式予測は、過去の価格データやテクニカル指標、ファンダメンタルデータなどを特徴量として使用し、将来の価格や価格変動方向を予測する回帰または分類問題として扱います。</p>
        
        <div class="bg-blue-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-blue-800 mb-3">予測モデルの種類</h3>
          <ul class="list-disc pl-5 space-y-2">
            <li>回帰モデル：将来の株価を数値として予測</li>
            <li>分類モデル：価格が上昇するか下降するかを予測</li>
            <li>時系列モデル：ARIMA、LSTMなど専用の時系列予測モデル</li>
          </ul>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">データ収集と前処理</h2>
        <p class="mb-4">予測モデルの精度は、使用するデータの質に大きく依存します。良質なデータを収集し、適切に前処理することが成功の鍵です。</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-green-50 p-6 rounded-xl">
            <h3 class="font-bold text-green-800 mb-3">データソース</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>Yahoo Finance API</li>
              <li>Alpha Vantage API</li>
              <li>Quandl</li>
              <li>企業のIRデータ</li>
            </ul>
          </div>
          <div class="bg-purple-50 p-6 rounded-xl">
            <h3 class="font-bold text-purple-800 mb-3">前処理ステップ</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>欠損値の処理</li>
              <li>外れ値の検出と処理</li>
              <li>データの正規化・標準化</li>
              <li>特徴量エンジニアリング</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">特徴量エンジニアリング</h2>
        <p class="mb-4">特徴量エンジニアリングは、機械学習モデルの性能を大きく左右する重要なプロセスです。株式予測に有効な特徴量を作成しましょう。</p>
        
        <div class="space-y-6 my-8">
          <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-blue-700 mb-2">テクニカル指標の作成</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>移動平均線（SMA、EMA）</li>
              <li>RSI（相対力指数）</li>
              <li>MACD（移動平均収束拡散指標）</li>
              <li>ボリンジャーバンド</li>
            </ul>
          </div>
          <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-green-700 mb-2">ラグ特徴量</h3>
            <p>過去の価格データを特徴量として使用することで、時間的なパターンを捉えます。</p>
          </div>
          <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-purple-700 mb-2">変化率とボラティリティ</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>価格の変化率（リターン）</li>
              <li>過去N日間のボラティリティ</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">モデルの選定と実装</h2>
        <p class="mb-4">株式予測に適した機械学習アルゴリズムを選び、実装していきます。ここでは、ランダムフォレストとLSTM（長短期記憶）を例に説明します。</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-yellow-50 p-6 rounded-xl">
            <h3 class="font-bold text-yellow-800 mb-3">ランダムフォレスト</h3>
            <p class="mb-3">アンサンブル学習の一種で、複数の決定木を組み合わせて予測する手法です。特徴量の重要度を評価できるという利点があります。</p>
            <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# データの分割
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# モデルの学習
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 予測と評価
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
            </pre>
          </div>
          <div class="bg-indigo-50 p-6 rounded-xl">
            <h3 class="font-bold text-indigo-800 mb-3">LSTM（長短期記憶）</h3>
            <p class="mb-3">時系列データに強い深層学習モデルです。株価のような時間に依存するデータの予測に適しています。</p>
            <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
model.add(LSTM(50, return_sequences=False))
model.add(Dense(25))
model.add(Dense(1))

model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X_train, y_train, batch_size=1, epochs=1)
            </pre>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">モデルの評価と検証</h2>
        <p class="mb-4">構築したモデルが適切に機能しているかを評価するため、様々な指標と検証手法を使用します。</p>
        
        <div class="bg-gray-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-gray-800 mb-3">評価指標</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 class="font-bold text-gray-700 mb-2">回帰モデルの評価指標</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>RMSE（二乗平均平方根誤差）</li>
                <li>MAE（平均絶対誤差）</li>
                <li>R²（決定係数）</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-700 mb-2">分類モデルの評価指標</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>Accuracy（正解率）</li>
                <li>Precision（適合率）</li>
                <li>Recall（再現率）</li>
                <li>F1スコア</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">実際の運用における注意点</h2>
        <div class="space-y-6 my-8">
          <div class="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-red-700 mb-2">過学習の防止</h3>
            <p>学習データに過剰に適合し、実際の市場ではうまく機能しないモデルを作らないように注意が必要です。クロスバリデーションや正則化などの手法を活用しましょう。</p>
          </div>
          <div class="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-orange-700 mb-2">市場の変化への適応</h3>
            <p>株式市場は常に変化しているため、一度構築したモデルでも定期的に再学習が必要です。新しいデータでモデルを更新し、性能を維持しましょう。</p>
          </div>
          <div class="border-l-4 border-teal-500 pl-4 bg-teal-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-teal-700 mb-2">リスク管理</h3>
            <p>予測モデルは補助的なツールであり、予測が外れた場合のリスク管理も重要です。ストップロスやポジションサイズの管理など、基本的なリスク管理を徹底しましょう。</p>
          </div>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-gray-800 mb-3">重要なポイント</h3>
          <p class="mb-3">機械学習を用いた株式予測は強力なツールですが、万能ではありません。市場の変化、経済情勢、突発的なニュースなど、モデルでは読み取れない要素も常に考慮する必要があります。機械学習モデルを活用する際は、以下のポイントを意識しましょう：</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>複数のモデルや指標を組み合わせて使う</li>
            <li>常にリスク管理を徹底する</li>
            <li>モデルの限界を理解し、過信しない</li>
            <li>継続的な学習とモデルの改善を行う</li>
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
        <meta name="keywords" content="投資AI, 機械学習, 株式予測, Python, 投資戦略" />
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
                        <Badge variant="secondary">投資AI</Badge>

                      </div>
                      <CardTitle className="text-lg line-clamp-2">AIによるポートフォリオ最適化の実践</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">機械学習と最適化アルゴリズムを使用して、リスクとリターンのバランスを取った最適な資産配分を実現する方法を解説します。</p>
                      <button
                        className="w-full px-3 py-1.5 text-sm bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors"
                        onClick={() => navigate("/articles/ai-portfolio-optimization")}
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

export default MLStockPrediction;