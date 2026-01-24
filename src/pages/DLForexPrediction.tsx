import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp, Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";

const DLForexPrediction = () => {
  const navigate = useNavigate();

  const article = {
    id: "dl-forex-prediction",
    title: "ディープラーニングを用いた為替予測の実際",
    excerpt: "LSTMやTransformerなどの深層学習モデルを使用して、為替相場の動向を予測する実践的なアプローチを解説します。",
    category: "投資AI",
    date: "2024年6月26日",
    content: `
      <div class="prose max-w-none">
        <p class="text-lg leading-relaxed mb-6">ディープラーニングは、従来の機械学習手法では捉えきれない複雑なパターンを学習する能力を持ち、為替予測において大きな可能性を秘めています。本記事では、LSTMやTransformerなどの深層学習モデルを用いて、実際の為替データから予測モデルを構築する方法を詳しく解説します。</p>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">ディープラーニングによる為替予測の特徴</h2>
        <p class="mb-4">為替市場は、多くの要因が複雑に絡み合う非線形な時系列データです。ディープラーニングモデルは、こうした複雑なパターンを自動的に学習し、予測する能力を持っています。</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-blue-50 p-6 rounded-xl">
            <h3 class="font-bold text-blue-800 mb-3">ディープラーニングの利点</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>複雑な非線形パターンの学習</li>
              <li>自動的な特徴量抽出</li>
              <li>多変量時系列データの処理</li>
              <li>長期的な依存関係のモデル化</li>
            </ul>
          </div>
          <div class="bg-green-50 p-6 rounded-xl">
            <h3 class="font-bold text-green-800 mb-3">為替予測における課題</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>ノイズの多いデータ</li>
              <li>非定常性（市場状況の変化）</li>
              <li>高頻度データの処理</li>
              <li>オーバーフィッティングのリスク</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">LSTMによる為替予測モデル</h2>
        <p class="mb-4">LSTM（長短期記憶）は、時系列データの長期的な依存関係を学習できる再帰型ニューラルネットワークの一種で、為替予測に特に適しています。</p>
        
        <div class="space-y-8 my-8">
          <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-6 rounded-r-lg">
            <h3 class="font-bold text-blue-700 mb-3">LSTMのアーキテクチャ</h3>
            <p class="mb-3">LSTMは、入力ゲート、忘却ゲート、出力ゲートという3つのゲートを持つことで、情報を長期的に保持したり忘却したりする能力を持っています。</p>
            <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

def create_lstm_model(input_shape):
    model = Sequential()
    model.add(LSTM(128, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(LSTM(64, return_sequences=False))
    model.add(Dropout(0.2))
    model.add(Dense(25))
    model.add(Dense(1))
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model
            </pre>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-6 rounded-r-lg">
            <h3 class="font-bold text-green-700 mb-3">データの準備と前処理</h3>
            <p class="mb-3">LSTMモデルに適したデータ形式に変換し、スケーリングなどの前処理を行います。</p>
            <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
from sklearn.preprocessing import MinMaxScaler
import numpy as np

# データのスケーリング
scaler = MinMaxScaler(feature_range=(0,1))
scaled_data = scaler.fit_transform(data.reshape(-1,1))

# 時系列データの作成
def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step-1):
        a = dataset[i:(i+time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

time_step = 60
X, y = create_dataset(scaled_data, time_step)
            </pre>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">Transformerモデルの活用</h2>
        <p class="mb-4">Transformerは、自然言語処理で大きな成功を収めたアーキテクチャで、時系列予測にも優れた性能を発揮します。自己注意機構により、長期的な依存関係を効率的に学習できます。</p>
        
        <div class="bg-purple-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-purple-800 mb-3">Transformerの特徴</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 class="font-bold text-purple-700 mb-2">利点</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>長期依存関係の効率的な学習</li>
                <li>並列処理が可能で学習が高速</li>
                <li>多変量時系列への対応</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-purple-700 mb-2">為替予測への適用</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>複数通貨ペアの同時学習</li>
                <li>マクロ経済指標との統合</li>
                <li>ニュースセンチメントの組み込み</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">多変量時系列予測</h2>
        <p class="mb-4">実際の為替予測では、単一の通貨ペアだけでなく、複数の経済指標や他の通貨ペアの情報を統合することで、より精度の高い予測が可能になります。</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div class="bg-yellow-50 p-6 rounded-xl">
            <h3 class="font-bold text-yellow-800 mb-3">入力データの種類</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>為替レート（OHLCデータ）</li>
              <li>経済指標（GDP、インフレ率、雇用統計など）</li>
              <li>株式市場指数</li>
              <li>商品価格（原油、金など）</li>
              <li>ニュースセンチメントスコア</li>
            </ul>
          </div>
          <div class="bg-indigo-50 p-6 rounded-xl">
            <h3 class="font-bold text-indigo-800 mb-3">データ統合の方法</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>マルチモーダル学習</li>
              <li>アテンションメカニズムによる重み付け</li>
              <li>特徴量の次元削減（PCAなど）</li>
              <li>時間スケールの統一</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">モデルの学習と最適化</h2>
        <p class="mb-4">ディープラーニングモデルの性能を最大限に引き出すには、適切な学習戦略と最適化手法が重要です。</p>
        
        <div class="space-y-6 my-8">
          <div class="border-l-4 border-teal-500 pl-4 bg-teal-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-teal-700 mb-2">学習戦略</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>適切なバッチサイズとエポック数の設定</li>
              <li>早期停止（Early Stopping）の実装</li>
              <li>学習率スケジューリング</li>
              <li>交差検証の実施</li>
            </ul>
          </div>
          <div class="border-l-4 border-orange-500 pl-4 bg-orange-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-orange-700 mb-2">正則化とドロップアウト</h3>
            <p>過学習を防ぐためのテクニックとして、ドロップアウトやL1/L2正則化を適用します。</p>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">予測結果の解釈と活用</h2>
        <p class="mb-4">モデルの出力する予測値をどのように解釈し、実際の取引に活用するかが重要です。</p>
        
        <div class="bg-gray-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-gray-800 mb-3">確率的予測の活用</h3>
          <p class="mb-3">単なる点予測だけでなく、予測の不確実性を示す確率的予測（予測区間）を活用することで、リスク管理をより適切に行えます。</p>
          <pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
# モンテカルロドロップアウトによる不確実性の推定
def predict_with_uncertainty(model, X, n_iter=100):
    predictions = []
    for i in range(n_iter):
        pred = model(X, training=True)
        predictions.append(pred)
    predictions = tf.stack(predictions)
    mean = tf.reduce_mean(predictions, axis=0)
    std = tf.math.reduce_std(predictions, axis=0)
    return mean, std
          </pre>
        </div>
        
        <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">実際の運用における課題と対策</h2>
        <div class="space-y-6 my-8">
          <div class="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-red-700 mb-2">データリークの防止</h3>
            <p>未来の情報を意図せず学習データに混入させないよう、厳格な時系列データの分割を実施する必要があります。</p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-blue-700 mb-2">モデルの更新頻度</h3>
            <p>市場は常に変化しているため、モデルの定期的な再学習とパラメータ更新が必要です。自動化された学習パイプラインの構築を検討しましょう。</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
            <h3 class="font-bold text-green-700 mb-2">バックテストの実施</h3>
            <p>構築したモデルを過去のデータで検証し、実際の取引でのパフォーマンスをシミュレーションします。スリップページや取引コストも考慮した現実的なバックテストを実施しましょう。</p>
          </div>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-xl my-8">
          <h3 class="font-bold text-gray-800 mb-3">重要なポイント</h3>
          <p class="mb-3">ディープラーニングを用いた為替予測は、高度な技術を駆使することで従来の手法では得られなかった洞察を提供しますが、同時に多くの課題も伴います。ディープラーニングモデルを活用する際は、以下のポイントを意識しましょう：</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>データの質と前処理の重要性を理解する</li>
            <li>過学習に警戒し、適切な検証手法を用いる</li>
            <li>予測の不確実性を適切に評価・活用する</li>
            <li>市場の変化に対応する柔軟性を保つ</li>
            <li>リスク管理を常に最優先事項とする</li>
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
        <meta name="keywords" content="投資AI, ディープラーニング, 為替予測, LSTM, Transformer, 投資戦略" />
        <link rel="canonical" href={`https://www.toushi-navi.com/articles/${article.id}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${article.title} | 投資総合ナビ`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.toushi-navi.com/articles/${article.id}`} />
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

export default DLForexPrediction;