import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp, Calendar, Share2, X, Instagram, Facebook, MessageCircle } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { useState } from "react";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);

  const articles = [
    {
      id: "crypto-trends-2024",
      title: "【2024年最新】暗号資産投資トレンド：AIコインからDeFiまで",
      excerpt: "2024年の暗号資産市場の最新動向を徹底解説。AI関連トークン、DeFi、NFTの今後を予測します。",
      category: "暗号資産",
      date: "2024年5月20日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">2024年は暗号資産市場にとって画期的な年となっています。AI技術の進化に伴い、AI関連トークンが注目を集めています。特に、人工知能の開発を支援するプラットフォームトークンや、AIを活用したDeFiプロトコルが市場を席巻しています。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">AIコインの台頭</h2>
          <p class="mb-4">AIコインとは、人工知能技術の開発や運用に特化したブロックチェーンプロジェクトのトークンです。代表的なものには、Fetch.ai、SingularityNET、Ocean Protocolなどがあります。これらのトークンは、AIモデルのトレーニングデータの売買、AIサービスの利用料金の支払いなどに使用されます。</p>
          
          <div class="bg-blue-50 p-6 rounded-xl my-8 border-l-4 border-blue-500">
            <h3 class="font-bold text-blue-800 mb-3">AIコイン投資のポイント</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>プロジェクトの技術的背景と実用性を確認</li>
              <li>トークンのユースケースと経済モデルを理解</li>
              <li>チームの専門性と実績を調査</li>
              <li>市場での競争環境を分析</li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">DeFiの進化</h2>
          <p class="mb-4">分散型金融（DeFi）も2024年には新たな進化を見せています。従来の貸借・取引機能に加え、AIを活用したリスク管理やポートフォリオ最適化機能が追加され、より高度な金融サービスが提供されるようになっています。</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 class="font-bold text-green-800 mb-3">DeFiの新機能</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>AI駆動のリスク評価モデル</li>
                <li>自動ポートフォリオリバランス</li>
                <li>スマートコントラクトによる自動運用</li>
              </ul>
            </div>
            <div class="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 class="font-bold text-purple-800 mb-3">注意点</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>スマートコントラクトの脆弱性</li>
                <li>規制の不確実性</li>
                <li>市場ボラティリティの影響</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">NFT市場の成熟</h2>
          <p class="mb-4">Non-Fungible Token（NFT）市場も、初期の投機的な動きから実用的な利用へと成熟してきています。特に、ゲーム内アイテム、デジタルアート、不動産登記など、実世界の資産との連携が進んでいます。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">2024年以降の展望</h2>
          <p class="mb-4">今後の暗号資産市場では、以下のようなトレンドが予想されます：</p>
          <ul class="list-disc pl-6 mt-4 space-y-3 mb-6">
            <li>中央銀行デジタル通貨（CBDC）との共存・連携</li>
            <li>環境に配慮したコンセンサスアルゴリズムの普及</li>
            <li>リアルワールドアセット（RWA）のトークナイゼーション加速</li>
            <li>ブロックチェーンゲーム（GameFi）の爆発的成長</li>
          </ul>
          
          <div class="bg-yellow-50 p-6 rounded-xl my-8 border border-yellow-200">
            <h3 class="font-bold text-yellow-800 mb-3">投資家の声</h3>
            <blockquote class="border-l-4 border-yellow-400 pl-4 italic">
              "AIコインへの投資は、技術の進化と市場の需給を両方見る必要があります。単なる投機ではなく、実用性を重視した選択が重要です。"
            </blockquote>
            <p class="text-right mt-2 text-yellow-700">- 暗号資産投資家（10年以上の経験）</p>
          </div>
        </div>
      `,
    },
    {
      id: "interest-rate-impact",
      title: "金利変動が投資に与える影響と対策：2024年版",
      excerpt: "日本銀行の金融政策が個人投資家に与える影響と、各資産クラスへの対応策を詳しく解説します。",
      category: "投資戦略",
      date: "2024年5月15日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">金利は経済全体に大きな影響を与える重要な指標であり、個人投資家にとっても資産運用戦略を考える上で欠かせない要素です。2024年現在、世界の主要国では異なる金利政策が採られていますが、それぞれが投資環境にどのような影響を及ぼしているのでしょうか。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">金利上昇の背景と影響</h2>
          <p class="mb-4">ここ数年、多くの国で金利上昇傾向が続いています。これは、インフレーション対策の一環として行われているもので、特に米国連邦準備制度理事会（FRB）の政策金利引き上げが世界的な金利上昇を牽引しています。</p>
          
          <div class="bg-blue-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-blue-800 mb-3">金利上昇の主な要因</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>インフレーション圧力の持続</li>
              <li>労働市場のタイト化</li>
              <li>地政学的リスクの高まり</li>
              <li>サプライチェーンの混乱</li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">各資産クラスへの影響</h2>
          <h3 class="text-xl font-bold mt-8 mb-4">株式市場</h3>
          <p class="mb-4">金利上昇は株式市場に複合的な影響を与えます。一方で、金融機関など金利に敏感な業種は好調となる一方で、成長株は割引率上昇の影響で下値圧力を受けます。</p>
          
          <h3 class="text-xl font-bold mt-8 mb-4">債券市場</h3>
          <p class="mb-4">金利と債券価格は逆方向に動くため、金利上昇は既存債券の価格下落を招きます。しかし、新規発行の高金利債券は投資家にとって魅力的です。</p>
          
          <h3 class="text-xl font-bold mt-8 mb-4">不動産市場</h3>
          <p class="mb-4">金利上昇は住宅ローン金利を押し上げ、不動産需要を抑制する傾向があります。ただし、インフレーションによる資産価値上昇とのバランスによって結果は異なります。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">投資対策と戦略</h2>
          <p class="mb-4">金利変動リスクに対応するためには、以下のような戦略が有効です：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-green-700 mb-2">防御的戦略</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>分散投資によるリスク軽減</li>
                <li>金利変動に強い資産（インフレーション対策債など）の保有</li>
                <li>定期的なポートフォリオ見直しとリバランス</li>
              </ul>
            </div>
            <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-blue-700 mb-2">積極的戦略</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>金利上昇に恩恵を受ける金融株の選択</li>
                <li>バリュー株へのシフト</li>
                <li>為替ヘッジを考慮した海外投資</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-yellow-50 p-6 rounded-xl my-8 border border-yellow-200">
            <h3 class="font-bold text-yellow-800 mb-3">重要なポイント</h3>
            <p class="mb-3">金利変動は短期的には不安をもたらしますが、長期的な視点で見ると、健全な経済成長のサインとなることが多いです。投資家は過度に一喜一憂するのではなく、自分のリスク許容度と投資目標に合った戦略を堅持することが重要です。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">参考文献</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><a href="https://www.fsa.go.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">金融庁の公式サイト</a></li>
              <li><a href="https://www.boj.or.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">日本銀行の統計リポート</a></li>
              <li>「金利と資産運用」大手銀行 経済研究室</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "ai-investment-strategy",
      title: "AIを活用した投資戦略の実際：機械学習からファンダメンタル分析まで",
      excerpt: "人工知能を活用した投資手法を実例とともに解説。初心者から上級者まで使えるテクニックを紹介します。",
      category: "投資戦略",
      date: "2024年5月10日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">人工知能（AI）は、投資の世界でも急速に普及しています。高度なアルゴリズムと膨大なデータ処理能力により、従来の投資手法では見逃しがちなパターンや機会を捉えることが可能になっています。ここでは、AIを活用した投資戦略の実際について詳しく解説します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">AI投資の基本概念</h2>
          <p class="mb-4">AI投資とは、機械学習、ディープラーニング、自然言語処理などのAI技術を活用して、投資判断やポートフォリオ管理を行う手法です。主な応用分野には、テクニカル分析、ファンダメンタル分析、リスク管理、ポートフォリオ最適化などがあります。</p>
          
          <div class="bg-blue-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-blue-800 mb-3">AI投資の主な利点</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li>感情に左右されない客観的な判断</li>
              <li>膨大なデータの高速処理</li>
              <li>24時間365日の継続運用</li>
              <li>複雑なパターンの検出</li>
            </ul>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">テクニカル分析への応用</h2>
          <p class="mb-4">AIは、チャートパターン認識や指標の自動生成に優れています。従来のテクニカル指標に加え、AIは独自のパターンを学習し、より精度の高い売買シグナルを生成します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">ファンダメンタル分析の強化</h2>
          <p class="mb-4">企業の財務諸表、ニュース記事、IR資料など非構造化データをAIが分析することで、企業価値の評価精度が向上します。自然言語処理技術により、感情分析やトピックモデリングも可能になります。</p>
          
          <div class="bg-purple-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-purple-800 mb-3">AIファンダメンタル分析のプロセス</h3>
            <ol class="list-decimal pl-5 space-y-2">
              <li>データ収集（財務データ、ニュース、SNSなど）</li>
              <li>データ前処理と正規化</li>
              <li>機械学習モデルによるパターン学習</li>
              <li>投資判断の生成と検証</li>
            </ol>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">リスク管理とポートフォリオ最適化</h2>
          <p class="mb-4">AIは、複数資産間の相関関係を動的に分析し、リスクを最小化しながらリターンを最大化するポートフォリオ構成を提案します。また、マーケットリスク、信用リスク、流動性リスクなど様々なリスク要因をリアルタイムで監視します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">実践的な活用方法</h2>
          <p class="mb-4">AI投資を始めるには、以下のステップを踏むと良いでしょう：</p>
          <div class="space-y-6 my-8">
            <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-green-700 mb-2">ステップ1: AI投資ツールの選定と利用</h3>
              <p>Robo-Advisor、アルゴリズム取引プラットフォームなど、自分に合ったツールを選ぶ</p>
            </div>
            <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-blue-700 mb-2">ステップ2: ハイブリッドアプローチの確立</h3>
              <p>AIの判断を自らの投資スタイルと組み合わせた運用方法を確立</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-yellow-700 mb-2">ステップ3: 学習と検証</h3>
              <p>AIの判断根拠を理解するための学習と、実績の検証を行う</p>
            </div>
            <div class="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-red-700 mb-2">ステップ4: ルール設定</h3>
              <p>リスク管理を徹底した運用ルールを設定</p>
            </div>
          </div>
          
          <div class="bg-yellow-50 p-6 rounded-xl my-8 border border-yellow-200">
            <h3 class="font-bold text-yellow-800 mb-3">AI投資の成功ポイント</h3>
            <p class="mb-3">AIコインへの投資は、技術の進化と市場の需給を両方見る必要があります。単なる投機ではなく、実用性を重視した選択が重要です。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">参考文献</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><a href="https://www.fsa.go.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">金融庁の公式サイト</a></li>
              <li><a href="https://www.jpx.co.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">日本取引所グループ</a></li>
              <li>「仮想通貨投資の基礎知識」大手証券会社 リサーチセンター</li>
            </ul>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">今後の展望</h3>
            <p>AI投資は今後、さらに進化していくと考えられます。量子コンピューティングとの融合、より高度なディープラーニングモデルの開発、リアルタイムデータ処理能力の向上などが期待されています。これらの技術革新により、より精度の高い投資判断が可能になるでしょう。</p>
          </div>
        </div>
      `,
    },
    {
      id: "nisa-beginner",
      title: "【2024年最新版】NISA完全ガイド：初心者が知るべき全て",
      excerpt: "新NISAが始まり、より使いやすくなった非課税制度。制度の概要から活用方法まで徹底解説します。",
      category: "NISA",
      date: "2024年1月15日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">2024年から新NISA制度が始まりました。年間180万円の非課税枠（うち120万円が分配金・配当金、60万円が譲渡益）が導入され、従来のNISAとつみたてNISAが統合されました。新NISAは、従来の制度のメリットを活かしつつ、より柔軟な運用が可能になっています。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">新NISAの特徴</h2>
          <p class="mb-4">新NISA制度の主な特徴は以下の通りです：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">制度的特徴</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>統一された非課税枠：年間180万円（従来のNISAとつみたてNISAの枠が統合）</li>
                <li>積立投資の推奨：自動引き落とし機能が充実</li>
                <li>商品の多様化：株式、投資信託、ETF、ETNだけでなく、REITや外国株式なども対象</li>
                <li>非課税期間の延長：最長20年間</li>
              </ul>
            </div>
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">利点</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>より大きな非課税枠で効率的な資産運用</li>
                <li>長期的な資産形成が可能</li>
                <li>多様な投資商品の選択肢</li>
                <li>複利効果の最大化</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">口座開設の流れ</h2>
          <p class="mb-4">新NISA口座を開設するには、以下の手順が必要です：</p>
          <ol class="list-decimal pl-6 mt-4 space-y-3 mb-6 bg-gray-50 p-6 rounded-xl">
            <li><strong>証券会社を選ぶ</strong> - 手数料、取扱商品、使いやすさなどを比較</li>
            <li><strong>必要な書類を準備する</strong> - 本人確認書類、印鑑、印鑑証明書（市区町村で発行、3か月以内）など</li>
            <li><strong>口座開設申込書に記入する</strong> - 証券会社の指示に従って記入</li>
            <li><strong>本人確認と印鑑証明書の提出</strong> - オンラインまたは対面で提出</li>
            <li><strong>口座開設の完了</strong> - 完了通知を受け取り、初期入金</li>
          </ol>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">活用ポイント</h2>
          <p class="mb-4">新NISAを最大限に活用するためのポイント：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="border border-blue-300 rounded-lg p-6">
              <h3 class="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                年間非課税枠の活用
              </h3>
              <p>年間180万円の非課税枠を最大限に活用することが重要です。月々の積立額や一括投資額を計画的に設定しましょう。</p>
            </div>
            <div class="border border-green-300 rounded-lg p-6">
              <h3 class="font-bold text-green-700 mb-3 flex items-center gap-2">
                <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                分散投資の実施
              </h3>
              <p>リスクを分散するために、国内株式、海外株式、債券など異なる資産クラスに投資しましょう。</p>
            </div>
            <div class="border border-purple-300 rounded-lg p-6">
              <h3 class="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                長期的な視点
              </h3>
              <p>非課税期間が最長20年間と長期化しているため、短期的な値動きに一喜一憂せず、長期的な資産形成を目指しましょう。</p>
            </div>
            <div class="border border-yellow-300 rounded-lg p-6">
              <h3 class="font-bold text-yellow-700 mb-3 flex items-center gap-2">
                <span class="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                他の制度との併用
              </h3>
              <p>iDeCoや一般の特定口座など他の制度と組み合わせることで、より効果的な節税と資産運用が可能です。</p>
            </div>
          </div>
          
          <div class="bg-yellow-50 p-6 rounded-xl my-8 border border-yellow-200">
            <h3 class="font-bold text-yellow-800 mb-3">成功するNISA活用法</h3>
            <p class="mb-3">新NISAは、従来の制度の良い点を維持しつつ、より多くの人々が資産運用に取り組みやすくなった制度です。特に、若い世代にとっては長期的な資産形成のための強力なツールとなるでしょう。ただし、非課税枠が大きくなった分、自己責任での運用がより重要になりますので、投資知識の習得にも努めてください。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">参考文献</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><a href="https://www.fsa.go.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">金融庁の公式サイト</a></li>
              <li><a href="https://www.nta.go.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">国税庁のNISAに関するページ</a></li>
              <li>「2024年版 NISA制度ガイド」大手証券会社</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "stocks-beginner",
      title: "株式投資の始め方：証券口座開設から銘柄選びまで",
      excerpt: "株式投資を始めたい方へ。口座開設の手順から最初の銘柄選びまで、わかりやすく解説します。",
      category: "株式投資",
      date: "2024年1月12日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">株式投資は、多くの人々が資産形成のために選ぶ投資方法の一つです。しかし、初めて株式投資を始める方にとっては、何から始めれば良いのかわからないという人も多いのではないでしょうか。ここでは、株式投資の始め方について、基礎からわかりやすく解説します。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">証券口座の開設</h2>
          <p class="mb-4">株式投資を始めるには、まず証券会社に口座を開設する必要があります。口座開設の手順は以下の通りです：</p>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <ol class="list-decimal pl-6 space-y-3">
              <li><strong>自分に合った証券会社を選ぶ</strong> - 手数料、取扱商品、使いやすさ、キャンペーンなどを比較検討</li>
              <li><strong>必要な書類を準備する</strong> - 本人確認書類（運転免許証、パスポートなど）、印鑑、印鑑証明書（市区町村で発行、3か月以内）、源泉徴収票または確定申告書（一部の証券会社）</li>
              <li><strong>口座開設申込書に記入する</strong> - 証券会社の指示に従って正確に記入</li>
              <li><strong>本人確認と印鑑証明書の提出</strong> - オンラインまたは対面で提出（オンラインの場合、本人確認のためのビデオ通話が必要な場合も）</li>
              <li><strong>口座開設の完了</strong> - 審査が完了すると口座開設完了の通知が届き、初期入金して利用開始</li>
            </ol>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">証券会社の選び方</h2>
          <p class="mb-4">自分に合った証券会社を選ぶ際には、以下のポイントを考慮すると良いでしょう：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">費用面</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>取引手数料の安さ</li>
                <li>口座管理費や年会費の有無</li>
                <li>振込手数料の設定</li>
              </ul>
            </div>
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">サービス面</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>取扱商品の充実度</li>
                <li>使いやすい取引ツール</li>
                <li>情報提供の質</li>
                <li>サポート体制</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">銘柄選びの基本</h2>
          <p class="mb-4">初心者が銘柄を選ぶ際には、以下の点を考慮すると良いでしょう：</p>
          <div class="space-y-6 my-8">
            <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-blue-700 mb-2">自分が理解できる業種・企業を選ぶ</h3>
              <p>日常的に利用している商品やサービスを提供する企業など、自分が理解しやすい業種の銘柄から始めるのが良いでしょう。</p>
            </div>
            <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-green-700 mb-2">財務状況が健全な企業を選ぶ</h3>
              <p>決算短信や有価証券報告書を確認し、売上高、利益、自己資本比率などの指標が良好な企業を選びましょう。</p>
            </div>
            <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-purple-700 mb-2">配当を支払う企業を選ぶ</h3>
              <p>安定した配当を支払う企業は、株価が下落しても配当収入で補えるため、リスクが比較的低いとされています。</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-yellow-700 mb-2">流動性が高い銘柄を選ぶ</h3>
              <p>売買高や売買代金が大きい銘柄は、必要な時に売却しやすいため、資金の流動性を確保できます。</p>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">リスク管理と資金管理</h2>
          <p class="mb-4">株式投資では、以下のリスク管理が重要です：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-red-50 p-6 rounded-xl">
              <h3 class="font-bold text-red-800 mb-3">リスク管理</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>損切りラインを事前に設定する</li>
                <li>分散投資を行う</li>
                <li>自己資金のみで投資する</li>
                <li>感情的な売買を避ける</li>
              </ul>
            </div>
            <div class="bg-orange-50 p-6 rounded-xl">
              <h3 class="font-bold text-orange-800 mb-3">資金管理</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>投資資金は全体の資産の一部にとどめる</li>
                <li>月々の投資額を予算内で計画する</li>
                <li>緊急資金を別途確保しておく</li>
                <li>投資による損失を生活に影響が出ないよう配慮</li>
              </ul>
            </div>
          </div>
          
          <div class="bg-yellow-50 p-6 rounded-xl my-8 border border-yellow-200">
            <h3 class="font-bold text-yellow-800 mb-3">初心者向けアドバイス</h3>
            <p class="mb-3">最初は難しく感じましたが、自分が使っている商品の会社の株から始めるのが良かったです。業績も理解しやすくて、投資を続けるモチベーションになりました。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">参考文献</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><a href="https://www.fsa.go.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">金融庁の公式サイト</a></li>
              <li><a href="https://www.jpx.co.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">日本取引所グループ</a></li>
              <li>「株式投資の基本と実践」大手証券会社 リサーチセンター</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "investment-trust",
      title: "投資信託とは？メリット・デメリットと選び方のポイント",
      excerpt: "投資信託の基本から、自分に合った商品の選び方まで詳しく説明します。",
      category: "投資信託",
      date: "2024年1月10日",
      content: `
        <div class="prose max-w-none">
          <p class="text-lg leading-relaxed mb-6">投資信託とは、多くの投資家の資金を pooling して、プロのファンドマネージャーに運用を委ねる仕組みです。個人投資家が直接株式や債券を購入するよりも、手軽に分散投資を行うことができるのが特徴です。</p>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">投資信託のメリット</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-green-50 p-6 rounded-xl">
              <h3 class="font-bold text-green-800 mb-3">経済的メリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>少額から始められる（1口数百円〜）</li>
                <li>プロの運用が受けられる</li>
                <li>分散投資が容易でリスク低減</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-6 rounded-xl">
              <h3 class="font-bold text-blue-800 mb-3">運用のメリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>手間がかからない</li>
                <li>定期的な情報提供を受ける</li>
                <li>柔軟な売買が可能</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">投資信託のデメリット</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-red-50 p-6 rounded-xl">
              <h3 class="font-bold text-red-800 mb-3">コスト面のデメリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>信託報酬が発生する（年率0.1〜2%程度）</li>
                <li>売買時に手数料がかかる場合がある</li>
                <li>中途解約には手数料がかかる場合がある</li>
              </ul>
            </div>
            <div class="bg-orange-50 p-6 rounded-xl">
              <h3 class="font-bold text-orange-800 mb-3">運用面のデメリット</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>運用結果がファンドマネージャーに依存する</li>
                <li>自分の意思で売買タイミングを決められない</li>
                <li>パフォーマンスが市場平均を下回る可能性</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">投資信託の種類</h2>
          <p class="mb-4">投資信託には様々な種類があります。目的に応じて適切な商品を選びましょう：</p>
          <div class="overflow-x-auto my-8">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-3 px-4 border-b text-left">種類</th>
                  <th class="py-3 px-4 border-b text-left">特徴</th>
                  <th class="py-3 px-4 border-b text-left">向いている人</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b font-semibold">インデックス型</td>
                  <td class="py-3 px-4 border-b">市場平均を追跡する運用</td>
                  <td class="py-3 px-4 border-b">コスト重視、長期投資</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-3 px-4 border-b font-semibold">アクティブ型</td>
                  <td class="py-3 px-4 border-b">プロの選択で上値を目指す</td>
                  <td class="py-3 px-4 border-b">リターン重視、専門知識</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b font-semibold">バランス型</td>
                  <td class="py-3 px-4 border-b">株式と債券のバランス運用</td>
                  <td class="py-3 px-4 border-b">リスクとリターンのバランス</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-3 px-4 border-b font-semibold">債券型</td>
                  <td class="py-3 px-4 border-b">主に債券に投資</td>
                  <td class="py-3 px-4 border-b">安定重視、保守的投資</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 class="text-2xl font-bold mt-10 mb-6 pb-2 border-b">選び方のポイント</h2>
          <p class="mb-4">投資信託を選ぶ際には、以下の点を考慮すると良いでしょう：</p>
          <div class="space-y-6 my-8">
            <div class="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-blue-700 mb-2">運用目的を明確にする</h3>
              <p>成長・配当・バランスなど、自分の投資目標に合った運用目的の投資信託を選びましょう。</p>
            </div>
            <div class="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-green-700 mb-2">信託報酬の安さを比較する</h3>
              <p>信託報酬は長期的にリターンに大きな影響を与えるため、できるだけ低いものを選ぶのが基本です。</p>
            </div>
            <div class="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-purple-700 mb-2">過去の運用実績を確認する</h3>
              <p>3〜5年の運用実績やベンチマークとの比較を確認し、安定した運用を行っているかを評価しましょう。</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
              <h3 class="font-bold text-yellow-700 mb-2">ファンドマネージャーの経験と実績を調べる</h3>
              <p>ファンドマネージャーの経験年数や他のファンドでの実績などを確認することで、運用の質を評価できます。</p>
            </div>
          </div>
          
          <div class="bg-yellow-50 p-6 rounded-xl my-8 border border-yellow-200">
            <h3 class="font-bold text-yellow-800 mb-3">投資信託活用のポイント</h3>
            <p class="mb-3">投資信託は、他の投資商品と組み合わせることで、より効果的な資産運用が可能です。例えば、個別株と組み合わせることで、プロの運用と自分の選んだ銘柄の両方のメリットを享受できます。また、NISAやiDeCoなどの非課税制度と組み合わせることで、節税効果も期待できます。</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl my-8">
            <h3 class="font-bold text-gray-800 mb-3">参考文献</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><a href="https://www.fsa.go.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">金融庁の公式サイト</a></li>
              <li><a href="https://www.jpx.co.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">日本取引所グループ</a></li>
              <li>「投資信託の基礎と選び方」大手証券会社 リサーチセンター</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "ai-investment-fundamentals",
      title: "AI投資の基礎知識：アルゴリズム取引からロボアドバイザーまで完全解説",
      excerpt: "AIがどのように投資に活用されているのか、基礎から実践的な活用法まで詳しく解説します。初心者から上級者まで使えるAI投資手法を徹底紹介。",
      category: "投資AI",
      readTime: "15分",
      date: "2024年6月1日",
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
      id: "trading-indicators-overview",
      title: "主要トレーディングインジケーター完全ガイド：初心者から上級者まで使えるテクニカル指標",
      excerpt: "移動平均線、RSI、MACDなど主要なテクニカル指標の使い方と活用ポイントを徹底解説。チャート分析の基本をマスターして投資スキルをアップさせましょう。",
      category: "インジケータ",
      date: "2024年6月5日",
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
      readTime: "15分",
      date: "2024年6月10日",
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
    }
  ];

  // 記事をIDで検索
  const article = articles.find(article => article.id === id);

  // 記事が見つからない場合は404ページを表示するための処理を追加
  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">記事が見つかりません</h1>
          <p className="text-muted-foreground mb-8">お探しの記事は存在しないか、URLが間違っている可能性があります。</p>
          <Button onClick={() => navigate('/articles')}>
            記事一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  // 関連記事（同じカテゴリの他の記事）
  const relatedArticles = articles.filter(articleItem =>
    articleItem.category === article.category && articleItem.id !== article.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/articles/${article.id}`}
        type="article"
      />

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
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>人気記事</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">{article.title}</h1>

              <div className="bg-card border rounded-xl p-6 mb-10">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <p className="text-muted-foreground">{article.excerpt}</p>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowShareModal(true)}
                  >
                    <Share2 className="h-4 w-4" />
                    記事を共有
                  </Button>
                </div>
              </div>

              <div
                className="prose max-w-none mb-16"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* ソーシャルメディア共有モーダル */}
              {showShareModal && (
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
                          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank');
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
                          window.open(`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`, '_blank');
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
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
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
                          window.open(`https://line.me/R/msg/text/?${encodeURIComponent(article.title + ' ' + window.location.href)}`, '_blank');
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

              {/* 関連記事 */}
              {relatedArticles.length > 0 && (
                <div className="border-t pt-12 mt-16">
                  <h2 className="text-2xl font-bold mb-8">関連記事</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((relatedArticle) => (
                      <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{relatedArticle.category}</Badge>
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{relatedArticle.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{relatedArticle.excerpt}</p>
                          <button
                            className="w-full px-3 py-1.5 text-sm bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors"
                            onClick={() => navigate(`/articles/${relatedArticle.id}`)}
                          >
                            記事を読む
                          </button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;