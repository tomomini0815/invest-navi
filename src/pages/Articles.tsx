import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp, Calendar, Share2, X, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";

const Articles = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("newest"); // newest, oldest, popular, category
  const [selectedCategory, setSelectedCategory] = useState("all"); // all, 投資AI, 暗号資産, 投資戦略, NISA, 株式投資, 投資信託, インジケータ, トレーディングビュー, FX
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const articles = [
    {
      id: "ai-investment-fundamentals",
      type: "article",
      title: "AI投資の基礎知識：アルゴリズム取引からロボアドバイザーまで完全解説",
      excerpt: "AIがどのように投資に活用されているのか、基礎から実践的な活用法まで詳しく解説します。初心者から上級者まで使えるAI投資手法を徹底紹介。",
      category: "投資AI",
      date: "2025年11月3日",
      isNew: false,
      isPopular: true,
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">人工知能（AI）は、投資の世界でも急速に普及しています。高度なアルゴリズムと膨大なデータ処理能力により、従来の投資手法では見逃しがちなパターンや機会を捉えることが可能になっています。ここでは、AI投資の基礎知識から実践的な活用法まで詳しく解説します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">AI投資とは？基本概念と仕組み</h2>
          <p class="mb-4">AI投資とは、機械学習、ディープラーニング、自然言語処理などのAI技術を活用して、投資判断やポートフォリオ管理を行う手法です。主な応用分野には、テクニカル分析、ファンダメンタル分析、リスク管理、ポートフォリオ最適化などがあります。</p>
          
          <div class="bg-blue-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-blue-800 mb-3">AI投資の基本仕組み</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>データ収集：市場データ、ニュース、SNS情報などを収集</li>
              <li>データ分析：AIが膨大なデータを分析し、パターンを学習</li>
              <li>予測モデル：学習したパターンを基に将来の価格変動を予測</li>
              <li>自動取引：予測に基づいて自動的に売買を実行</li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">主なAI投資手法と実践例</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">アルゴリズム取引</h3>
              <p>事前に設定したルールに従って、コンピュータが自動的に売買を行う手法です。</p>
              <div class="mt-4">
                <h4 class="font-bold text-blue-700 mb-2">具体的な活用例：</h4>
                <ul class="list-disc pl-5 space-y-1">
                  <li>高頻度取引（HFT）：1秒間に数千回の取引を行う</li>
                  <li>ニュースベース取引：ニュース速報を自動解析して取引</li>
                  <li>裁定取引：複数の取引所間の価格差を利用して利益を得る</li>
                </ul>
              </div>
            </div>
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">ロボアドバイザー</h3>
              <p>AIが投資家のリスク許容度や目標に基づいて、最適な資産運用を提案します。</p>
              <div class="mt-4">
                <h4 class="font-bold text-green-700 mb-2">具体的な活用例：</h4>
                <ul class="list-disc pl-5 space-y-1">
                  <li>ポートフォリオ最適化：リスクとリターンのバランスを自動調整</li>
                  <li>リバランス：定期的に資産配分を最適化</li>
                  <li>税務最適化：税負担を最小限に抑える売買タイミングの提案</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">AI投資ツールの選び方と比較</h2>
          <div class="overflow-x-auto my-8">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-3 px-4 border-b text-left">ツール名</th>
                  <th class="py-3 px-4 border-b text-left">特徴</th>
                  <th class="py-3 px-4 border-b text-left">料金</th>
                  <th class="py-3 px-4 border-b text-left">評価</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b font-semibold">QuantConnect</td>
                  <td class="py-3 px-4 border-b">オープンソースのアルゴリズム取引プラットフォーム</td>
                  <td class="py-3 px-4 border-b">無料〜有料プランあり</td>
                  <td class="py-3 px-4 border-b">★★★★☆</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-3 px-4 border-b font-semibold">Alpaca</td>
                  <td class="py-3 px-4 border-b">APIベースの自動取引プラットフォーム</td>
                  <td class="py-3 px-4 border-b">無料</td>
                  <td class="py-3 px-4 border-b">★★★★★</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b font-semibold">Wealthfront</td>
                  <td class="py-3 px-4 border-b">ロボアドバイザー</td>
                  <td class="py-3 px-4 border-b">管理資産の0.25%</td>
                  <td class="py-3 px-4 border-b">★★★★☆</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">AI投資の利点とリスク</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h3 class="font-bold text-yellow-800 mb-3">利点</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>感情に左右されない客観的な判断</li>
                <li>膨大なデータの高速処理</li>
                <li>24時間365日の継続運用</li>
                <li>複雑なパターンの検出</li>
                <li>バックテストによる戦略検証</li>
              </ul>
            </div>
            <div class="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 class="font-bold text-red-800 mb-3">リスクと課題</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>ブラックボックス化による判断理由の不明確さ</li>
                <li>システム障害時のリスク</li>
                <li>過学習による過去データへの過剰適応</li>
                <li>市場状況の急変への対応遅れ</li>
                <li>セキュリティリスク</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">AI投資を始めるためのステップ</h2>
          <div class="space-y-6 my-8">
            <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-blue-700 mb-2">ステップ1：基本知識の習得</h3>
              <p>AI投資の基本概念、主要手法、リスクについて学びましょう。関連書籍やオンラインコースの活用もおすすめです。</p>
            </div>
            <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-green-700 mb-2">ステップ2：シミュレーション取引</h3>
              <p>実際の資金を使わずに、シミュレーション取引でAI投資ツールの操作方法や性能を確認しましょう。</p>
            </div>
            <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-purple-700 mb-2">ステップ3：少額からの実践</h3>
              <p>シミュレーション取引で一定のスキルを習得したら、少額の資金から実際の取引を開始しましょう。</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-yellow-700 mb-2">ステップ4：戦略の見直しと最適化</h3>
              <p>運用結果を定期的に分析し、必要に応じて戦略やパラメータを調整しましょう。</p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">重要なポイント</h3>
            <p class="mb-3">AI投資は強力なツールですが、万能ではありません。市場の変化、テクノロジーの進化、規制の変更などに対応するため、継続的な学習と戦略の見直しが必要です。また、AI投資を行う際は、必ず自己資金の範囲内で行い、過度なレバレッジは避けるようにしましょう。</p>
          </div>
        </div>
      `,
    },
    {
      id: "nisa-beginner",
      type: "guide",
      title: "【2026年最新】NISA完全ガイド：初心者が知るべき全て",
      excerpt: "非課税枠が1,800万円に拡大！2026年現在、資産形成のスタンダードとなった「新NISA」の仕組み・メリット・失敗しない始め方を、どこよりも分かりやすく解説。",
      category: "NISA",
      date: "2026年1月22日",
      isNew: true,
      isPopular: true,
      content: ""
    },
    {
      id: "stocks-beginner",
      type: "guide",
      title: "株式投資の始め方：知識ゼロから月5万円稼ぐロードマップ",
      excerpt: "「株って難しそう...」そんな常識を覆します。株主優待、配当金、値上がり益の3つのメリットと、初心者が陥りがちなリスク回避法を完全ガイド。",
      category: "株式投資",
      date: "2026年1月22日",
      isNew: true,
      isPopular: true,
      content: ""
    },
    {
      id: "investment-trust",
      type: "guide",
      title: "投資信託の仕組みと選び方：プロに任せる失敗しない資産運用",
      excerpt: "100円からプロにお任せ！「インデックス」と「アクティブ」の違いは？手数料で損しないための選び方とは？初心者におすすめのファンドも紹介。",
      category: "投資信託",
      date: "2026年1月22日",
      isNew: true,
      isPopular: true,
      content: ""
    },
    {
      id: "crypto-trends-2024",
      title: "【2024年最新】暗号資産投資トレンド：AIコインからDeFiまで",
      excerpt: "2024年の暗号資産市場の最新動向を徹底解説。AI関連トークン、DeFi、NFTの今後を予測します。",
      category: "暗号資産",
      date: "2024年5月20日",
      isPopular: true,
      content: `
        <p>2024年は暗号資産市場にとって画期的な年となっています。AI技術の進化に伴い、AI関連トークンが注目を集めています。特に、人工知能の開発を支援するプラットフォームトークンや、AIを活用したDeFiプロトコルが市場を席巻しています。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">AIコインの台頭</h2>
        <p>AIコインとは、人工知能技術の開発や運用に特化したブロックチェーンプロジェクトのトークンです。代表的なものには、Fetch.ai、SingularityNET、Ocean Protocolなどがあります。これらのトークンは、AIモデルのトレーニングデータの売買、AIサービスの利用料金の支払いなどに使用されます。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">DeFiの進化</h2>
        <p>分散型金融（DeFi）も2024年には新たな進化を見せています。従来の貸借・取引機能に加え、AIを活用したリスク管理やポートフォリオ最適化機能が追加され、より高度な金融サービスが提供されるようになっています。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">NFT市場の成熟</h2>
        <p>Non-Fungible Token（NFT）市場も、初期の投機的な動きから実用的な利用へと成熟してきています。特に、ゲーム内アイテム、デジタルアート、不動産登記など、実世界の資産との連携が進んでいます。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">2024年以降の展望</h2>
        <p>今後の暗号資産市場では、以下のようなトレンドが予想されます：</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>中央銀行デジタル通貨（CBDC）との共存・連携</li>
          <li>環境に配慮したコンセンサスアルゴリズムの普及</li>
          <li>リアルワールドアセット（RWA）のトークナイゼーション加速</li>
          <li>ブロックチェーンゲーム（GameFi）の爆発的成長</li>
        </ul>
      `,
    },
    {
      id: "interest-rate-impact",
      title: "金利変動が投資に与える影響と対策：2024年版",
      excerpt: "日本銀行の金融政策が個人投資家に与える影響と、各資産クラスへの対応策を詳しく解説します。",
      category: "投資戦略",
      date: "2024年5月15日",
      isPopular: true,
      content: `
        <p>金利は経済全体に大きな影響を与える重要な指標であり、個人投資家にとっても資産運用戦略を考える上で欠かせない要素です。2024年現在、世界の主要国では異なる金利政策が採られていますが、それぞれが投資環境にどのような影響を及ぼしているのでしょうか。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">金利上昇の背景と影響</h2>
        <p>ここ数年、多くの国で金利上昇傾向が続いています。これは、インフレーション対策の一環として行われているもので、特に米国連邦準備制度理事会（FRB）の政策金利引き上げが世界的な金利上昇を牽引しています。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">各資産クラスへの影響</h2>
        <h3 className="text-xl font-bold mt-6 mb-3">株式市場</h3>
        <p>金利上昇は株式市場に複合的な影響を与えます。一方で、金融機関など金利に敏感な業種は好調となる一方で、成長株は割引率上昇の影響で下値圧力を受けます。</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">債券市場</h3>
        <p>金利と債券価格は逆方向に動くため、金利上昇は既存債券の価格下落を招きます。しかし、新規発行の高金利債券は投資家にとって魅力的です。</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">不動産市場</h3>
        <p>金利上昇は住宅ローン金利を押し上げ、不動産需要を抑制する傾向があります。ただし、インフレーションによる資産価値上昇とのバランスによって結果は異なります。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">投資対策と戦略</h2>
        <p>金利変動リスクに対応するためには、以下のような戦略が有効です：</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>分散投資によるリスク軽減</li>
          <li>金利変動に強い資産（インフレーション対策債など）の保有</li>
          <li>定期的なポートフォリオ見直しとリバランス</li>
          <li>長期投資視点の維持</li>
        </ul>
      `,
    },
    {
      id: "ai-investment-strategy",
      title: "AIを活用した投資戦略の実際：機械学習からファンダメンタル分析まで",
      excerpt: "人工知能を活用した投資手法を実例とともに解説。初心者から上級者まで使えるテクニックを紹介します。",
      category: "投資戦略",
      date: "2024年5月10日",
      isPopular: true,
      content: `
        <p>人工知能（AI）は、投資の世界でも急速に普及しています。高度なアルゴリズムと膨大なデータ処理能力により、従来の投資手法では見逃しがちなパターンや機会を捉えることが可能になっています。ここでは、AIを活用した投資戦略の実際について詳しく解説します。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">AI投資の基本概念</h2>
        <p>AI投資とは、機械学習、ディープラーニング、自然言語処理などのAI技術を活用して、投資判断やポートフォリオ管理を行う手法です。主な応用分野には、テクニカル分析、ファンダメンタル分析、リスク管理、ポートフォリオ最適化などがあります。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">テクニカル分析への応用</h2>
        <p>AIは、チャートパターン認識や指標の自動生成に優れています。従来のテクニカル指標に加え、AIは独自のパターンを学習し、より精度の高い売買シグナルを生成します。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">ファンダメンタル分析の強化</h2>
        <p>企業の財務諸表、ニュース記事、IR資料など非構造化データをAIが分析することで、企業価値の評価精度が向上します。自然言語処理技術により、感情分析やトピックモデリングも可能になります。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">リスク管理とポートフォリオ最適化</h2>
        <p>AIは、複数資産間の相関関係を動的に分析し、リスクを最小化しながらリターンを最大化するポートフォリオ構成を提案します。また、マーケットリスク、信用リスク、流動性リスクなど様々なリスク要因をリアルタイムで監視します。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">実践的な活用方法</h2>
        <p>AI投資を始めるには、以下のステップを踏むと良いでしょう：</p>
        <ol className="list-decimal pl-6 mt-4 space-y-2">
          <li>AI投資ツールの選定と利用（例：Robo-Advisor、アルゴリズム取引プラットフォーム）</li>
          <li>自らの投資スタイルと組み合わせたハイブリッドアプローチの確立</li>
          <li>AIの判断根拠を理解するための学習と検証</li>
          <li>リスク管理を徹底した運用ルールの設定</li>
        </ol>
      `,
    },
    {
      id: "nisa-beginner",
      title: "【2024年最新版】NISA完全ガイド：初心者が知るべき全て",
      excerpt: "新NISAが始まり、より使いやすくなった非課税制度。制度の概要から活用方法まで徹底解説します。",
      category: "NISA",
      date: "2024年1月15日",
      isPopular: true,
      content: `
        <p>2024年から新NISA制度が始まりました。年間180万円の非課税枠（うち120万円が分配金・配当金、60万円が譲渡益）が導入され、従来のNISAとつみたてNISAが統合されました。新NISAは、従来の制度のメリットを活かしつつ、より柔軟な運用が可能になっています。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">新NISAの特徴</h2>
        <p>新NISA制度の主な特徴は以下の通りです：</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>統一された非課税枠：年間180万円（従来のNISAとつみたてNISAの枠が統合）</li>
          <li>積立投資の推奨：自動引き落とし機能が充実</li>
          <li>商品の多様化：株式、投資信託、ETF、ETNだけでなく、REITや外国株式なども対象</li>
          <li>非課税期間の延長：最長20年間</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">口座開設の流れ</h2>
        <p>新NISA口座を開設するには、以下の手順が必要です：</p>
        <ol className="list-decimal pl-6 mt-4 space-y-2">
          <li>証券会社を選ぶ</li>
          <li>必要な書類を準備する（本人確認書類、印鑑、印鑑証明書など）</li>
          <li>口座開設申込書に記入する</li>
          <li>本人確認と印鑑証明書の提出</li>
          <li>口座開設の完了</li>
        </ol>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">活用ポイント</h2>
        <p>新NISAを最大限に活用するためのポイント：</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>年間非課税枠を最大限に活用する</li>
          <li>分散投資によるリスク管理</li>
          <li>長期的な資産形成を目指す</li>
          <li>他の節税制度（iDeCoなど）と組み合わせる</li>
        </ul>
      `,
    },
    {
      id: "stocks-beginner",
      title: "株式投資の始め方：証券口座開設から銘柄選びまで",
      excerpt: "株式投資を始めたい方へ。口座開設の手順から最初の銘柄選びまで、わかりやすく解説します。",
      category: "株式投資",
      date: "2024年1月12日",
      isPopular: true,
      content: `
        <p>株式投資は、多くの人々が資産形成のために選ぶ投資方法の一つです。しかし、初めて株式投資を始める方にとっては、何から始めれば良いのかわからないという人も多いのではないでしょうか。ここでは、株式投資の始め方について、基礎からわかりやすく解説します。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">証券口座の開設</h2>
        <p>株式投資を始めるには、まず証券会社に口座を開設する必要があります。口座開設の手順は以下の通りです：</p>
        <ol className="list-decimal pl-6 mt-4 space-y-2">
          <li>自分に合った証券会社を選ぶ</li>
          <li>必要な書類を準備する（本人確認書類、印鑑、源泉徴収票など）</li>
          <li>口座開設申込書に記入する</li>
          <li>本人確認と印鑑証明書の提出</li>
          <li>口座開設の完了と初期入金</li>
        </ol>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">銘柄選びの基本</h2>
        <p>初心者が銘柄を選ぶ際には、以下の点を考慮すると良いでしょう：</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>自分が理解できる業種・企業を選ぶ</li>
          <li>財務状況が健全な企業を選ぶ</li>
          <li>配当を支払う企業を選ぶ</li>
          <li>流動性が高い銘柄を選ぶ</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">リスク管理と資金管理</h2>
        <p>株式投資では、以下のリスク管理が重要です：</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>損切りラインを事前に設定する</li>
          <li>分散投資を行う</li>
          <li>自己資金のみで投資する</li>
          <li>感情的な売買を避ける</li>
        </ul>
      `,
    },
    {
      id: "investment-trust",
      title: "投資信託とは？メリット・デメリットと選び方のポイント",
      excerpt: "投資信託の基本から、自分に合った商品の選び方まで詳しく説明します。",
      category: "投資信託",
      date: "2024年1月10日",
      isPopular: true,
      content: `
        <p>投資信託とは、多くの投資家の資金を pooling して、プロのファンドマネージャーに運用を委ねる仕組みです。個人投資家が直接株式や債券を購入するよりも、手軽に分散投資を行うことができるのが特徴です。</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">投資信託のメリット</h2>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>少額から始められる</li>
          <li>プロの運用が受けられる</li>
          <li>分散投資が容易</li>
          <li>手間がかからない</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">投資信託のデメリット</h2>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>信託報酬が発生する</li>
          <li>運用結果がファンドマネージャーに依存する</li>
          <li>中途解約には手数料がかかる場合がある</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">選び方のポイント</h2>
        <p>投資信託を選ぶ際には、以下の点を考慮すると良いでしょう：</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>運用目的（成長・配当・バランスなど）を明確にする</li>
          <li>信託報酬の安さを比較する</li>
          <li>過去の運用実績を確認する</li>
          <li>ファンドマネージャーの経験と実績を調べる</li>
        </ul>
      `,
    },
    {
      id: "trading-indicators-overview",
      title: "主要トレーディングインジケーター完全ガイド：初心者から上級者まで使えるテクニカル指標",
      excerpt: "移動平均線、RSI、MACDなど主要なテクニカル指標の使い方と活用ポイントを徹底解説。チャート分析の基本をマスターして投資スキルをアップさせましょう。",
      category: "インジケータ",
      date: "2025年11月3日",
      isNew: false,
      isPopular: true,
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">テクニカルインジケーターは、価格変動や取引量の統計的分析を通じて、将来の価格変動を予測するための強力なツールです。ここでは、初心者から上級者まで使える主要なテクニカル指標を徹底解説します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">テクニカルインジケーターとは？基本概念と分類</h2>
          <p class="mb-4">テクニカルインジケーターとは、過去の価格や取引量などの市場データを統計的に処理・分析し、将来の価格変動を予測するための数値やグラフです。主に以下の3つのカテゴリに分類されます：</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">トレンド系インジケーター</h3>
              <p>価格の方向性やトレンドの強さを示す指標です。代表的なものに移動平均線、MACDなどがあります。</p>
            </div>
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">オシレーター系インジケーター</h3>
              <p>買われすぎ・売られすぎの状態を示し、価格の反転タイミングを捉えるのに有効です。代表的なものにRSI、ストキャスティクスなどがあります。</p>
            </div>
            <div class="bg-purple-50 p-6 rounded-xl">
              <h3 class="font-bold text-purple-800 mb-3">ボラティリティ系インジケーター</h3>
              <p>価格変動の大きさ（ボラティリティ）を示す指標です。代表的なものにATR（平均トゥルーレンジ）、ボリンジャーバンドなどがあります。</p>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">超重要！主要トレンド系インジケーターの使い方</h2>
          <div class="space-y-8 my-8">
            <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-6 rounded-r-lg">
              <h3 class="font-bold text-blue-700 mb-3">移動平均線（MA）</h3>
              <p class="mb-3">一定期間の平均価格を線で表したもので、トレンドの方向を把握するのに役立ちます。</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-bold text-blue-600 mb-2">計算方法：</h4>
                  <p>過去N日間の終値の平均を計算</p>
                </div>
                <div>
                  <h4 class="font-bold text-blue-600 mb-2">使い方：</h4>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>価格が移動平均線より上：上昇トレンド</li>
                    <li>価格が移動平均線より下：下降トレンド</li>
                    <li>短期移動平均線が長期移動平均線を上抜け：買いシグナル</li>
                    <li>短期移動平均線が長期移動平均線を下抜け：売りシグナル</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-6 rounded-r-lg">
              <h3 class="font-bold text-green-700 mb-3">MACD（移動平均収束拡散指標）</h3>
              <p class="mb-3">短期と長期の移動平均線の差を示し、トレンドの転換点を捉えるのに有効です。</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-bold text-green-600 mb-2">構成要素：</h4>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>MACDライン：短期EMA - 長期EMA</li>
                    <li>シグナルライン：MACDラインのEMA</li>
                    <li>ヒストグラム：MACDラインとシグナルラインの差</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold text-green-600 mb-2">使い方：</h4>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>MACDラインがシグナルラインを上抜け：買いシグナル</li>
                    <li>MACDラインがシグナルラインを下抜け：売りシグナル</li>
                    <li>ヒストグラムの増減でトレンドの強さを確認</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">必修！主要オシレーター系インジケーターの活用法</h2>
          <div class="space-y-8 my-8">
            <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 p-6 rounded-r-lg">
              <h3 class="font-bold text-purple-700 mb-3">RSI（相対力指数）</h3>
              <p class="mb-3">買われすぎ・売られすぎの状態を示し、逆張りのタイミングを判断するのに役立ちます。</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-bold text-purple-600 mb-2">計算方法：</h4>
                  <p>上昇幅の平均と下降幅の平均の比率を基に0〜100の数値を算出</p>
                </div>
                <div>
                  <h4 class="font-bold text-purple-600 mb-2">使い方：</h4>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>RSIが70以上：買われすぎ状態（売りシグナル）</li>
                    <li>RSIが30以下：売られすぎ状態（買いシグナル）</li>
                    <li>ダイバージェンス：価格とRSIの動きの不一致で反転を予測</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-6 rounded-r-lg">
              <h3 class="font-bold text-yellow-700 mb-3">ストキャスティクス</h3>
              <p class="mb-3">価格の変動範囲に基づいて、買われすぎ・売られすぎを判断する指標です。</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-bold text-yellow-600 mb-2">構成要素：</h4>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>%K：現在の価格位置を示すメインライン</li>
                    <li>%D：%Kの移動平均（シグナルライン）</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold text-yellow-600 mb-2">使い方：</h4>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>%Kが80以上かつ%Dも上昇：買われすぎ（売りシグナル）</li>
                    <li>%Kが20以下かつ%Dも下降：売られすぎ（買いシグナル）</li>
                    <li>ゴールデンクロス（%Kが%Dを上抜け）：買いシグナル</li>
                    <li>デッドクロス（%Kが%Dを下抜け）：売りシグナル</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">インジケーターの組み合わせ活用法と注意点</h2>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">複数インジケーターの組み合わせ戦略</h3>
            <p class="mb-3">単独のインジケーターでは誤ったシグナルが出る場合があるため、複数の指標を組み合わせて使うことで精度を高めることができます。</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div class="border border-blue-300 rounded-lg p-4">
                <h4 class="font-bold text-blue-700 mb-2">トレンド確認型戦略</h4>
                <ul class="list-disc pl-5 space-y-1">
                  <li>移動平均線でトレンドを確認</li>
                  <li>RSIで買われすぎ・売られすぎを判断</li>
                  <li>トレンド方向とRSIシグナルが一致した場合のみ取引</li>
                </ul>
              </div>
              <div class="border border-green-300 rounded-lg p-4">
                <h4 class="font-bold text-green-700 mb-2">エントリー・エグジット戦略</h4>
                <ul class="list-disc pl-5 space-y-1">
                  <li>MACDでエントリータイミングを判断</li>
                  <li>ストキャスティクスでエグジットタイミングを判断</li>
                  <li>両者のシグナルが重なったポイントで取引</li>
                </ul>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 class="font-bold text-red-700 mb-2">インジケーター活用の注意点</h4>
              <ul class="list-disc pl-5 space-y-1">
                <li>遅れ指標であることを認識し、将来予測として過信しない</li>
                <li>市場状況（レンジ相場、トレンド相場）に応じて指標を切り替える</li>
                <li>過度な最適化（オーバーフィッティング）を避ける</li>
                <li>常にリスク管理を徹底する</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">初心者におすすめのインジケーター設定と実践例</h2>
          <div class="space-y-6 my-8">
            <div class="border-l-4 border-indigo-500 pl-4 bg-indigo-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-indigo-700 mb-2">おすすめ設定（日足チャート向け）</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>移動平均線：短期=25日、長期=75日</li>
                <li>MACD：短期=12日、長期=26日、シグナル=9日</li>
                <li>RSI：期間=14日、買われすぎ=70、売られすぎ=30</li>
                <li>ストキャスティクス：期間=5日、スローイング=3日、シグナル=3日</li>
              </ul>
            </div>
            
            <div class="border-l-4 border-teal-500 pl-4 bg-teal-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-teal-700 mb-2">実践例：株式の売買シグナル</h3>
              <p class="mb-2">トヨタ自動車（7203）の日足チャートでのシグナル例：</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>2024年3月：移動平均線のゴールデンクロスで買いシグナル</li>
                <li>2024年4月：RSIが70を超えて買われすぎ状態に、MACDがデッドクロスで売りシグナル</li>
                <li>2024年5月：ストキャスティクスのゴールデンクロスで再買いシグナル</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">重要なポイント</h3>
            <p class="mb-3">テクニカルインジケーターは強力な分析ツールですが、万能ではありません。市場の変化、経済情勢、突発的なニュースなど、指標では読み取れない要素も常に考慮する必要があります。インジケーターを活用する際は、以下のポイントを意識しましょう：</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>複数の指標を組み合わせて使う</li>
              <li>市場状況に応じて指標の解釈を調整する</li>
              <li>常にリスク管理を徹底する</li>
              <li>継続的な学習と実践でスキルを磨く</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "tradingview-beginner",
      title: "トレーディングビュー入門：初心者が最初に覚えるべきチャート分析術",
      excerpt: "無料で使える人気チャート分析ツール「トレーディングビュー」の基本操作を解説します。",
      category: "トレーディングビュー",
      date: "2025年11月3日",
      isNew: false,
      isPopular: true,
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">トレーディングビューは、世界中の投資家に広く利用されている無料のチャート分析ツールです。豊富なテクニカル指標、直感的なインターフェース、強力なコミュニティ機能を備えており、初心者からプロトレーダーまで幅広く利用されています。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">トレーディングビューの基本操作</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">チャートの表示とカスタマイズ</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>銘柄検索とチャート表示</li>
                <li>時間足の変更（分足、日足、週足など）</li>
                <li>チャートタイプの選択（ローソク足、ラインチャート、バー足など）</li>
              </ul>
            </div>
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">インジケーターの追加と設定</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>インジケータータブからの追加</li>
                <li>パラメータの調整</li>
                <li>複数インジケーターの重ね表示</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">便利な機能とツール</h2>
          <div class="space-y-6 my-8">
            <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-purple-700 mb-2">描画ツール</h3>
              <p>サポートライン、レジスタンスライン、トレンドラインなど、価格の動きを分析するための描画ツールを活用できます。</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-yellow-700 mb-2">アラート機能</h3>
              <p>価格やインジケーターの条件に合致した場合に通知を受けることができます。これにより、24時間体制で市場を監視することが可能になります。</p>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">コミュニティ機能の活用</h2>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <p class="mb-3">トレーディングビューの最大の特徴の一つが、世界中のトレーダーと情報を共有できるコミュニティ機能です。他のユーザーのチャートやアイデアを閲覧・コメントすることで、新たな視点を得ることができます。</p>
          </div>
        </div>
      `,
    },
    {
      id: "crypto-exchange-comparison",
      title: "暗号資産取引所比較：国内と海外の違いと選び方",
      excerpt: "国内と海外の暗号資産取引所の特徴と違いを比較し、自分に合った取引所の選び方を解説します。",
      category: "暗号資産",
      date: "2024年6月15日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">暗号資産投資を始める際、どの取引所を選ぶかは非常に重要な決定です。国内と海外の取引所にはそれぞれ特徴があり、投資家のニーズに応じて最適な選択肢が異なります。ここでは、国内と海外の暗号資産取引所の違いと選び方について詳しく解説します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">国内取引所の特徴</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">メリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>日本語対応が充実</li>
                <li>金融庁の登録・監督を受けている</li>
                <li>円での入出金が可能</li>
                <li>顧客資産の分別保管</li>
              </ul>
            </div>
            <div class="bg-red-50 p-6 rounded-xl">
              <h3 class="font-bold text-red-800 mb-3">デメリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>取扱銘柄数が限られている場合がある</li>
                <li>手数料がやや高め</li>
                <li>新規トークンの上場が遅れる傾向</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">海外取引所の特徴</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">メリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>豊富な取扱銘柄</li>
                <li> competitiveな手数料</li>
                <li>新規トークンの上場が早い</li>
                <li>高度な取引機能（レバレッジ取引など）</li>
              </ul>
            </div>
            <div class="bg-orange-50 p-6 rounded-xl">
              <h3 class="font-bold text-orange-800 mb-3">デメリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>日本語対応が不十分な場合がある</li>
                <li>国内の法律規制の適用外</li>
                <li>円での取引ができない場合がある</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">自分に合った取引所の選び方</h2>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <p class="mb-3">取引所を選ぶ際には、以下のポイントを考慮すると良いでしょう：</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>自分の投資スタイル（スイングトレード、デイトレード、ロングホールドなど）</li>
              <li>取扱銘柄（主要な暗号資産だけでなく、新興トークンへの関心）</li>
              <li>手数料体系（Maker/Taker手数料、入出金手数料など）</li>
              <li>セキュリティ対策（2FA、コールドウォレットの使用など）</li>
              <li>サポート体制（カスタマーサポートの対応時間、言語対応など）</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "fx-broker-comparison",
      title: "FX業者比較：国内と海外の違いと選び方のポイント",
      excerpt: "国内と海外のFX業者の特徴と違いを比較し、自分に合ったFX業者の選び方を解説します。",
      category: "FX",
      date: "2024年6月20日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">FX（外国為替証拠金取引）を始める際、どの業者を選ぶかは非常に重要な決定です。国内と海外のFX業者にはそれぞれ特徴があり、トレーダーのニーズに応じて最適な選択肢が異なります。ここでは、国内と海外のFX業者の違いと選び方について詳しく解説します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">国内FX業者の特徴</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">メリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>金融庁の登録・監督を受けている</li>
                <li>日本語対応が充実</li>
                <li>信託保全による資金保護</li>
                <li>税務処理が明確</li>
              </ul>
            </div>
            <div class="bg-red-50 p-6 rounded-xl">
              <h3 class="font-bold text-red-800 mb-3">デメリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>レバレッジの上限が低い（最大25倍）</li>
                <li>スプレッドがやや広い場合がある</li>
                <li>取扱通貨ペアが限られている</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">海外FX業者の特徴</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">メリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>高レバレッジ（1000倍など）が利用可能</li>
                <li>狭いスプレッド</li>
                <li>豊富な通貨ペア</li>
                <li>高度な取引プラットフォーム</li>
              </ul>
            </div>
            <div class="bg-orange-50 p-6 rounded-xl">
              <h3 class="font-bold text-orange-800 mb-3">デメリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>国内法規制の適用外</li>
                <li>日本語対応が不十分な場合がある</li>
                <li>税務処理が複雑</li>
                <li>出入金方法に制限がある場合がある</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">自分に合ったFX業者の選び方</h2>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <p class="mb-3">FX業者を選ぶ際には、以下のポイントを考慮すると良いでしょう：</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>自分のトレードスタイル（スイングトレード、デイトレード、スキャルピングなど）</li>
              <li>必要とするレバレッジ</li>
              <li>取引コスト（スプレッド、スワップポイント、手数料など）</li>
              <li>取引プラットフォームの使いやすさ</li>
              <li>サポート体制（カスタマーサポートの対応時間、言語対応など）</li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">主要FX業者比較</h2>
          <div class="overflow-x-auto my-8">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-3 px-4 border-b text-left">業者名</th>
                  <th class="py-3 px-4 border-b text-left">最大レバレッジ</th>
                  <th class="py-3 px-4 border-b text-left">主要通貨ペアのスプレッド</th>
                  <th class="py-3 px-4 border-b text-left">特徴</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b font-semibold">外為どっとコム</td>
                  <td class="py-3 px-4 border-b">25倍</td>
                  <td class="py-3 px-4 border-b">USD/JPY: 0.2銭</td>
                  <td class="py-3 px-4 border-b">業界最狭水準のスプレッド</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-3 px-4 border-b font-semibold">DMM FX</td>
                  <td class="py-3 px-4 border-b">25倍</td>
                  <td class="py-3 px-4 border-b">USD/JPY: 0.3銭</td>
                  <td class="py-3 px-4 border-b">DMMグループ傘下</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b font-semibold">GMOクリック証券</td>
                  <td class="py-3 px-4 border-b">25倍</td>
                  <td class="py-3 px-4 border-b">USD/JPY: 0.3銭</td>
                  <td class="py-3 px-4 border-b">スワップポイントが業界最高水準</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-3 px-4 border-b font-semibold">FXCM</td>
                  <td class="py-3 px-4 border-b">400倍</td>
                  <td class="py-3 px-4 border-b">USD/JPY: 0.5pips</td>
                  <td class="py-3 px-4 border-b">海外業者、高レバレッジ</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">まとめ</h2>
          <div class="bg-blue-50 p-6 rounded-xl my-8">
            <p class="mb-3">FX業者を選ぶ際は、自分のトレードスタイルや目的に合った業者から始めることが重要です。初心者の場合は、国内業者で信頼性の高い業者から始めるのがおすすめです。経験を積んだ後は、自分のニーズに合った海外業者に切り替えることも検討してみてください。</p>
          </div>
        </div>
      `,
    },
    // 新規記事: 機械学習を活用した株式予測モデルの構築方法
    {
      id: "ml-stock-prediction",
      title: "機械学習を活用した株式予測モデルの構築方法",
      excerpt: "Pythonと機械学習アルゴリズムを使用して、株式の価格予測モデルを構築する実践的な方法を解説します。",
      category: "投資AI",
      readTime: "20分",
      date: "2024年6月25日",
    },
    // 新規記事: ディープラーニングを用いた為替予測の実際
    {
      id: "dl-forex-prediction",
      title: "ディープラーニングを用いた為替予測の実際",
      excerpt: "LSTMやTransformerなどの深層学習モデルを使用して、為替相場の動向を予測する実践的なアプローチを解説します。",
      category: "投資AI",
      readTime: "22分",
      date: "2024年6月26日",
    },
    // 新規記事: AIによるポートフォリオ最適化の実践
    {
      id: "ai-portfolio-optimization",
      title: "AIによるポートフォリオ最適化の実践",
      excerpt: "機械学習と最適化アルゴリズムを使用して、リスクとリターンのバランスを取った最適な資産配分を実現する方法を解説します。",
      category: "投資AI",
      readTime: "18分",
      date: "2024年6月27日",
    },
  ];

  // 利用可能なカテゴリを抽出
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    return ["all", ...uniqueCategories];
  }, [articles]);

  // 記事をフィルタリングして並べ替えるロジック
  const filteredAndSortedArticles = useMemo(() => {
    // カテゴリでフィルタリング
    let filtered = selectedCategory === "all"
      ? articles
      : articles.filter(article => article.category === selectedCategory);

    // 並べ替え
    let sorted = [...filtered];

    switch (sortOption) {
      case "newest":
        // 新着順（日付の降順）
        sorted.sort((a, b) => {
          // dateプロパティをDateオブジェクトに変換
          const dateA = new Date(a.date.replace("年", "-").replace("月", "-").replace("日", ""));
          const dateB = new Date(b.date.replace("年", "-").replace("月", "-").replace("日", ""));
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "oldest":
        // 古い順（日付の昇順）
        sorted.sort((a, b) => {
          const dateA = new Date(a.date.replace("年", "-").replace("月", "-").replace("日", ""));
          const dateB = new Date(b.date.replace("年", "-").replace("月", "-").replace("日", ""));
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case "popular":
        // 人気順（isPopularがtrueのものを先に、isNewのものを次に）
        sorted.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case "category":
        // カテゴリ順（アルファベット順）
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return sorted;
  }, [articles, sortOption, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>投資記事一覧 | 投資総合ナビ</title>
        <meta name="description" content="最新の投資ニュース、テクニカル分析、投資戦略に関する記事を掲載しています。" />
        <meta name="keywords" content="投資,資産運用,株式投資,NISA,暗号資産,FX,投資信託,投資戦略" />
        <link rel="canonical" href="https://www.toushi-navi.com/articles" />

        {/* Open Graph */}
        <meta property="og:title" content="投資記事一覧 | 投資総合ナビ" />
        <meta property="og:description" content="最新の投資ニュース、テクニカル分析、投資戦略に関する記事を掲載しています。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.toushi-navi.com/articles" />
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
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              トップページに戻る
            </Link>
          </div>
        </div>

        {/* ヒーローセクション */}
        <section className="relative py-20 container mx-auto px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 animate-fade-in" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
              投資情報
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              投資記事一覧
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              最新の投資ニュースやテクニカル分析をチェック
            </p>
          </div>
        </section>

        {/* 記事一覧セクション */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              {/* フィルターと並べ替えセレクトボックスを記事カードのすぐ上の左側に配置 */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                {/* カテゴリフィルター */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                      {category === "all" ? "すべて" : category}
                    </button>
                  ))}
                </div>

                {/* 並べ替えセレクトボックス */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 pr-8 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="newest">新着順</option>
                    <option value="oldest">古い順</option>
                    <option value="popular">人気順</option>
                    <option value="category">カテゴリ順</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{article.category}</Badge>
                        {article.isNew && (
                          <Badge className="ml-2" style={{ backgroundColor: '#FFA500' }}>
                            New
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{article.date}</span>
                        </div>
                        {article.isPopular && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>人気記事</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-6">
                        <button
                          className="flex-1 px-4 py-2 bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors"
                          onClick={() => {
                            if (article.type === 'guide') {
                              navigate(`/guide/${article.id}`);
                            } else {
                              navigate(`/articles/${article.id}`);
                            }
                          }}
                        >
                          記事を読む
                        </button>
                        <button
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setCurrentArticle(article);
                            setShowShareModal(true);
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ソーシャルメディア共有モーダル */}
        {showShareModal && currentArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">記事を共有</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-muted-foreground mb-6">共有先を選択してください</p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 gap-2"
                  onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/articles/' + currentArticle.id)}&text=${encodeURIComponent(currentArticle.title)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  <X className="h-8 w-8 text-black" />
                  <span>X (Twitter)</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 gap-2"
                  onClick={() => {
                    window.open(`https://www.instagram.com/?url=${encodeURIComponent(window.location.origin + '/articles/' + currentArticle.id)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  <Instagram className="h-8 w-8" />
                  <span>Instagram</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 gap-2"
                  onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/articles/' + currentArticle.id)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  <Facebook className="h-8 w-8 text-blue-600" />
                  <span>Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 gap-2"
                  onClick={() => {
                    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(currentArticle.title + ' ' + window.location.origin + '/articles/' + currentArticle.id)}`, '_blank');
                    setShowShareModal(false);
                  }}
                >
                  <MessageCircle className="h-8 w-8 text-green-500" />
                  <span>LINE</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Articles;