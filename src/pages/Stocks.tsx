import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Calculator, PieChart, LineChart, Lightbulb, Users, Award, BarChart3, Shield, Zap, Target, Menu } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

const Stocks = () => {
  // 株式投資記事
  const articles = [
    {
      id: "stocks-basics",
      title: "株式投資の基本と仕組み",
      excerpt: "株式とは何か、株式投資の基本的な仕組みと投資の流れについて解説します。",
      content: `
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            株式とは何ですか？
          </h3>
          <p class="mb-4">株式とは、企業が資金調達のために発行する証券で、その企業の所有権の一部を表しています。株式を購入することで、その企業の株主となり、企業の成長とともに利益を得ることができます。</p>
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              株主の権利
            </h4>
            <ul class="list-disc pl-5 space-y-1 text-blue-700">
              <li>配当金の受取権</li>
              <li>株主総会での議決権</li>
              <li>会社情報の閲覧権</li>
              <li>株式の譲渡権</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            株式投資の仕組み
          </h3>
          <p class="mb-4">株式投資では、株式を購入して保有し、株価の上昇や配当金によって利益を得ます。株価は市場の需給関係によって変動し、売買益（キャピタルゲイン）を得ることができます。</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 class="font-bold text-gray-800 mb-2">キャピタルゲイン</h4>
              <p class="text-gray-600 text-sm">株価が上がったときに株式を売却することで得られる利益</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 class="font-bold text-gray-800 mb-2">配当金</h4>
              <p class="text-gray-600 text-sm">企業が利益を出すごとに株主に分配する収益</p>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-secondary" />
            株式投資の流れ
          </h3>
          <ol class="list-decimal pl-5 mb-4 space-y-2">
            <li class="pl-2">証券会社で口座を開設する</li>
            <li class="pl-2">投資資金を口座に振り込む</li>
            <li class="pl-2">投資対象の銘柄を調べる</li>
            <li class="pl-2">株式を購入する</li>
            <li class="pl-2">株価が上がったら売却する</li>
          </ol>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-secondary" />
            株式投資のメリットとデメリット
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 class="font-bold text-green-800 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                メリット
              </h4>
              <ul class="list-disc pl-5 space-y-1 text-green-700">
                <li>高リターンが期待できる</li>
                <li>流動性が高い</li>
                <li>少額から始められる</li>
                <li>多様な銘柄が選べる</li>
                <li>企業情報が公開されている</li>
              </ul>
            </div>
            <div class="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 class="font-bold text-red-800 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                デメリット
              </h4>
              <ul class="list-disc pl-5 space-y-1 text-red-700">
                <li>元本割れのリスク</li>
                <li>知識と経験が必要</li>
                <li>市場の変動に影響される</li>
                <li>時間と労力が必要</li>
                <li>税金がかかる</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 class="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            株式投資成功の秘訣
          </h3>
          <p class="text-yellow-700">株式投資で成功するためには、基本的な知識を身につけ、長期的な視点で投資することが重要です。また、感情に左右されず、計画的に投資を続けることが、資産形成の鍵となります。</p>
        </div>
      `,
    },
    {
      id: "how-to-buy-stocks",
      title: "株式の買い方・売買の手順",
      excerpt: "証券口座の開設から実際に株式を購入するまでの手順を詳しく説明します。",
      content: `
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-secondary" />
            証券口座の開設
          </h3>
          <p class="mb-4">株式投資を始めるには、まず証券会社で口座を開設する必要があります。本人確認書類と印鑑が必要です。オンラインで開設できる会社も多く、30分程度で完了します。</p>
          
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 my-4">
            <h4 class="font-bold text-blue-800 mb-2">必要な書類</h4>
            <ul class="list-disc pl-5 space-y-1 text-blue-700">
              <li>本人確認書類（運転免許証、パスポートなど）</li>
              <li>印鑑（認印）</li>
              <li>銀行口座情報</li>
              <li>収入証明書（場合による）</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            投資資金の準備
          </h3>
          <p class="mb-4">投資に使用する資金を銀行口座から証券口座に振り込みます。この際、振り込み手数料がかかる場合があります。</p>
          
          <div class="bg-green-50 p-4 rounded-lg border border-green-200 my-4">
            <h4 class="font-bold text-green-800 mb-2">資金管理のポイント</h4>
            <ul class="list-disc pl-5 space-y-1 text-green-700">
              <li>生活費とは別に余剰資金を用意する</li>
              <li>一括投資ではなく分割投資を行う</li>
              <li>緊急時のための資金を確保しておく</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            銘柄の選定
          </h3>
          <p class="mb-4">投資対象となる銘柄を選びます。企業の財務状況、業績、業界動向などを調査し、自分の投資目的に合った銘柄を選びましょう。</p>
          
          <div class="overflow-x-auto my-4">
            <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr class="bg-gradient-to-r from-gray-100 to-gray-200">
                  <th class="border-b border-r border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">選定基準</th>
                  <th class="border-b border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">説明</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-b border-r border-gray-200 px-4 py-2 font-medium text-gray-800">財務状況</td>
                  <td class="border-b border-gray-200 px-4 py-2 text-gray-600">売上高、利益、自己資本比率などの指標</td>
                </tr>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-b border-r border-gray-200 px-4 py-2 font-medium text-gray-800">業績</td>
                  <td class="border-b border-gray-200 px-4 py-2 text-gray-600">過去の業績推移と将来の成長性</td>
                </tr>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-b border-r border-gray-200 px-4 py-2 font-medium text-gray-800">業界動向</td>
                  <td class="border-b border-gray-200 px-4 py-2 text-gray-600">業界の成長性と競争状況</td>
                </tr>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-r border-gray-200 px-4 py-2 font-medium text-gray-800">バリュエーション</td>
                  <td class="px-4 py-2 text-gray-600">株価が適正かどうかの評価</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-secondary" />
            注文の方法
          </h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">注文種別</h4>
            <ul class="list-disc pl-5 space-y-1 mb-3">
              <li>成行注文：現在の市場価格で即座に約定</li>
              <li>指値注文：指定した価格で売買</li>
              <li>逆指値注文：指定した価格に達した時点で成行注文を出す</li>
            </ul>
            
            <h4 class="font-bold mb-2">売買数量</h4>
            <p>購入する株式の数量を指定します。1単元（100株）単位で取引される銘柄が多いです。</p>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-secondary" />
            売買の実行
          </h3>
          <p class="mb-4">注文を出すと、約定するまでに数秒〜数分かかります。約定後は、保有株式として口座に反映されます。</p>
          
          <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 class="font-bold text-purple-800 mb-2">注文後の確認ポイント</h4>
            <ul class="list-disc pl-5 space-y-1 text-purple-700">
              <li>注文が正しく入っているか確認</li>
              <li>約定価格と数量を確認</li>
              <li>口座残高の変動を確認</li>
              <li>保有株式に反映されているか確認</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      id: "stock-analysis",
      title: "銘柄選びと企業分析の方法",
      excerpt: "企業の財務諸表や業績などを分析して、良い銘柄を見極める方法を学びます。",
      content: `
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            企業分析の重要性
          </h3>
          <p class="mb-4">良い銘柄を選ぶには、企業の財務状況や事業内容、競争力などを分析する必要があります。適切な企業分析により、リスクを抑えながらリターンを高める投資が可能になります。</p>
          
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 class="font-bold text-blue-800 mb-2">企業分析の3つの視点</h4>
            <ul class="list-disc pl-5 space-y-1 text-blue-700">
              <li>財務分析：企業の財務状況を数値で評価</li>
              <li>業績分析：企業の収益性と成長性を評価</li>
              <li>競争分析：業界内での企業の競争力を評価</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-secondary" />
            財務諸表の読み方
          </h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">重要な財務指標</h4>
            <ul class="list-disc pl-5 space-y-1 mb-3">
              <li>PER（株価収益率）：株価が1株当たり利益の何倍になっているか</li>
              <li>PBR（株価純資産倍率）：株価が1株当たり純資産の何倍になっているか</li>
              <li>ROE（自己資本利益率）：自己資本に対する利益の割合</li>
              <li>配当利回り：配当金と株価の比率</li>
              <li>自己資本比率：企業の財務の安定性を示す指標</li>
            </ul>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-2">PERの見方</h4>
                <p class="text-gray-600 text-sm">業界平均より低い場合は割安、高い場合は割高と判断</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h4 class="font-bold text-gray-800 mb-2">ROEの見方</h4>
                <p class="text-gray-600 text-sm">10%以上であれば優秀、5%以下では注意が必要</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            業績分析
          </h3>
          <p class="mb-4">企業の売上高、営業利益、純利益の推移を確認し、成長性や安定性を評価します。また、業界内での競争力や将来の成長可能性も重要です。</p>
          
          <div class="bg-green-50 p-4 rounded-lg border border-green-200 my-4">
            <h4 class="font-bold text-green-800 mb-2">業績分析のポイント</h4>
            <ul class="list-disc pl-5 space-y-1 text-green-700">
              <li>売上高の推移と成長率</li>
              <li>利益率の変化</li>
              <li>業界内でのシェア</li>
              <li>将来の成長戦略</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <LineChart className="h-5 w-5 text-secondary" />
            テクニカル分析
          </h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">チャート分析</h4>
            <p class="mb-2">価格や出来高の推移をチャートで分析し、売買のタイミングを判断します。</p>
            
            <h4 class="font-bold mb-2">主要なテクニカル指標</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>移動平均線：一定期間の平均株価を線で表したもの</li>
              <li>MACD：トレンドの方向や強さを示す指標</li>
              <li>RSI：買われすぎ・売られすぎを示す指標</li>
              <li>ボリンジャーバンド：価格の変動範囲を示す指標</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 class="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            企業分析のコツ
          </h3>
          <p class="text-yellow-700">企業分析では、単に数字を見るだけでなく、その企業の事業内容や競争環境、経営陣の質などを総合的に評価することが重要です。また、複数の指標を組み合わせて分析することで、より正確な判断が可能になります。</p>
        </div>
      `,
    },
    {
      id: "dividend-investing",
      title: "配当金投資の戦略とポイント",
      excerpt: "配当金を目的とした株式投資の戦略と、安定的な配当金を得るためのポイントについて解説します。",
      content: `
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            配当金投資とは？
          </h3>
          <p class="mb-4">配当金投資とは、企業が利益を出すごとに株主に分配する配当金を目的とした株式投資です。株価の上昇ではなく、安定した配当金収入を得ることを目的としています。</p>
          
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 class="font-bold text-blue-800 mb-2">配当金投資の特徴</h4>
            <ul class="list-disc pl-5 space-y-1 text-blue-700">
              <li>安定した収入源が確保できる</li>
              <li>インフレヘッジになる</li>
              <li>複利効果で資産が増える</li>
              <li>長期保有で税制優遇が受けられる</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-secondary" />
            配当金投資のメリット
          </h3>
          <ul class="list-disc pl-5 mb-4 space-y-2">
            <li>安定した収入源が確保できる</li>
            <li>インフレヘッジになる</li>
            <li>複利効果で資産が増える</li>
            <li>長期保有で税制優遇が受けられる</li>
            <li>優良企業に投資できる傾向がある</li>
          </ul>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            配当金投資の戦略
          </h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">高配当利回り銘柄の選定</h4>
            <p class="mb-2">配当利回りが高く、かつ安定した配当政策を持つ企業を選びます。ただし、高配当利回りでも業績が悪化している場合はリスクがあります。</p>
            
            <h4 class="font-bold mb-2">分散投資</h4>
            <p class="mb-2">業種や業界を分散させ、特定企業や業界への依存を減らします。これにより、個別の企業リスクを軽減できます。</p>
            
            <h4 class="font-bold mb-2">積立投資</h4>
            <p>定期的に一定額を投資することで、市場の変動リスクを軽減し、長期的な資産形成を目指します。</p>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            注目すべきポイント
          </h3>
          <ul class="list-disc pl-5 space-y-2">
            <li>配当政策の継続性</li>
            <li>財務の健全性</li>
            <li>業績の安定性</li>
            <li>業界の成長性</li>
            <li>為替リスク（外貨建株式の場合）</li>
          </ul>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 class="font-bold text-green-800 mb-2 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            配当金投資成功の秘訣
          </h3>
          <p class="text-green-700">配当金投資では、高配当利回りを追求するだけでなく、企業の財務の健全性や業績の安定性を重視することが重要です。また、分散投資と積立投資を組み合わせることで、リスクを抑えながら安定した収益を得ることができます。</p>
        </div>
      `,
    },
    {
      id: "long-term-investing",
      title: "長期株式投資の戦略とコツ",
      excerpt: "長期的な視点で株式投資を行うための戦略と、成功するためのコツを詳しく解説します。",
      content: `
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            長期投資のメリット
          </h3>
          <p class="mb-4">長期投資には多くのメリットがあります。まず、複利効果による資産の雪だるま式増加が挙げられます。これは、投資で得た利益を再投資することで、利益がさらに利益を生むという効果です。時間の経過とともにこの効果は顕著になります。</p>
          
          <ul class="list-disc pl-5 mb-4 space-y-2">
            <li>複利効果による資産の雪だるま式増加</li>
            <li>短期的な値動きに左右されず、安定した資産形成が可能</li>
            <li>手数料などのコストを抑えられる</li>
            <li>時間の経過とともにリスクが軽減される</li>
            <li>税制優遇の恩恵を受けられる</li>
          </ul>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-secondary" />
            長期投資の戦略
          </h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">インデックス投資</h4>
            <p class="mb-2">市場全体の動きを追うインデックスファンドに投資することで、手数料を抑えながら市場の平均リターンを得ることができます。</p>
            
            <h4 class="font-bold mb-2">ブルーチップ株投資</h4>
            <p class="mb-2">業績が安定し、配当金も安定している大手企業の株式に投資することで、比較的安定したリターンを得ることができます。</p>
            
            <h4 class="font-bold mb-2">資産配分の最適化</h4>
            <p>自分のリスク許容度と目標に応じて、株式・債券・不動産などの資産配分を最適化します。</p>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-secondary" />
            長期投資のコツ
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                継続が何より重要
              </h4>
              <p class="text-gray-600 text-sm">定期的な積立投資により、市場のタイミングを気にする必要がなくなります。</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-secondary" />
                複利効果を活用
              </h4>
              <p class="text-gray-600 text-sm">利益を再投資することで、雪だるま式に資産が増加します。</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <PieChart className="h-4 w-4 text-secondary" />
                分散投資を徹底
              </h4>
              <p class="text-gray-600 text-sm">リスクを軽減し、安定したリターンを目指します。</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-secondary" />
                感情に左右されない
              </h4>
              <p class="text-gray-600 text-sm">市場の変動に一喜一憂せず、長期的な視点で投資を続けます。</p>
            </div>
          </div>
        </div>
        
        <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 class="font-bold text-purple-800 mb-2 flex items-center gap-2">
            <Award className="h-5 w-5" />
            長期投資成功の秘訣
          </h3>
          <p class="text-purple-700">長期投資の成功には、継続的な積立、分散投資、そして市場の変動に一喜一憂しない冷静な姿勢が重要です。感情に左右されず、計画的に投資を続けることが、資産形成の鍵となります。また、自分の目標や状況に応じて戦略を見直す柔軟性も必要です。</p>
        </div>
      `,
    },
    {
      id: "risk-management",
      title: "株式投資のリスク管理と損切りのポイント",
      excerpt: "株式投資におけるリスク管理の重要性と、損切りのタイミング・方法について詳しく解説します。",
      content: `
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            株式投資のリスク
          </h3>
          <p class="mb-4">株式投資にはさまざまなリスクがあります。これらのリスクを理解し、適切に管理することが成功の鍵となります。</p>
          
          <div class="overflow-x-auto my-4">
            <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr class="bg-gradient-to-r from-gray-100 to-gray-200">
                  <th class="border-b border-r border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">リスクの種類</th>
                  <th class="border-b border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">説明</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-b border-r border-gray-200 px-4 py-2 font-medium text-gray-800">市場リスク</td>
                  <td class="border-b border-gray-200 px-4 py-2 text-gray-600">経済情勢や政治的要因などにより株価が下落するリスク</td>
                </tr>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-b border-r border-gray-200 px-4 py-2 font-medium text-gray-800">企業リスク</td>
                  <td class="border-b border-gray-200 px-4 py-2 text-gray-600">特定企業の業績悪化や倒産などによるリスク</td>
                </tr>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-b border-r border-gray-200 px-4 py-2 font-medium text-gray-800">流動性リスク</td>
                  <td class="border-b border-gray-200 px-4 py-2 text-gray-600">株式を売却したいときに買ってくれる人がいないリスク</td>
                </tr>
                <tr class="bg-white even:bg-gray-50">
                  <td class="border-r border-gray-200 px-4 py-2 font-medium text-gray-800">為替リスク</td>
                  <td class="px-4 py-2 text-gray-600">外貨建株式投資における為替変動のリスク</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            リスク管理の方法
          </h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">分散投資</h4>
            <p class="mb-2">異なる資産クラス、業種、地域に投資を分散させることで、特定の投資先の不調による損失を他の投資先の利益で補うことができます。</p>
            
            <h4 class="font-bold mb-2">ドルコスト平均法</h4>
            <p class="mb-2">定期的に一定額を投資することで、市場のタイミングを気にする必要がなくなり、平均的な購入単価を抑えることができます。</p>
            
            <h4 class="font-bold mb-2">ストップロス注文</h4>
            <p>予め損切りのラインを設定しておくことで、大きな損失を被るのを防ぐことができます。</p>
          </div>
        </div>
        
        <div class="mb-6">
          <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-secondary" />
            損切りのポイント
          </h3>
          <div class="mb-4">
            <h4 class="font-bold mb-2">損切りのタイミング</h4>
            <ul class="list-disc pl-5 space-y-1 mb-3">
              <li>事前に設定した損失幅に達したとき</li>
              <li>企業の業績が大きく悪化したとき</li>
              <li>投資目的が達成できなくなったとき</li>
              <li>ポートフォリオのバランスを維持するため</li>
            </ul>
            
            <h4 class="font-bold mb-2">損切りの方法</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>成行注文で即座に売却</li>
              <li>指値注文で少しでも良い価格で売却</li>
              <li>一部だけ売却して損失を限定</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            リスク管理の重要性
          </h3>
          <p class="text-red-700">株式投資では利益を追求することも重要ですが、それ以上にリスクを適切に管理することが成功の鍵となります。感情に左右されず、事前に設定したルールに従って投資を続けることが、長期的な資産形成の基本です。</p>
        </div>
      `,
    },
  ];

  // 関連ツール
  const tools = [
    {
      title: "株式リターン計算機",
      description: "株式投資のリターンとリスクを計算するシミュレーションツール",
      href: "/tools/stock-return",
      icon: Calculator,
    },
    {
      title: "ポートフォリオ分析ツール",
      description: "現在の株式ポートフォリオの分析と最適化提案",
      href: "/tools/portfolio-analysis",
      icon: BarChart3,
    },
    {
      title: "リスク許容度診断",
      description: "自分のリスク許容度を診断し、適切な投資戦略を見つけましょう",
      href: "/tools/risk-assessment",
      icon: Shield,
    },
  ];

  // 目次の項目を生成
  const tocItems = articles.map((article, index) => ({
    id: article.id,
    title: article.title,
    number: index + 1
  }));

  // ページ内スクロール用の関数
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>株式投資ガイド | 投資総合ナビ</title>
        <meta name="description" content="株式投資の基本から実践的なテクニックまで、初心者から中級者まで幅広く対応した株式投資ガイド。企業分析、配当金投資、銘柄選びの方法を詳しく解説します。" />
        <meta name="keywords" content="株式投資,企業分析,配当金投資,銘柄選び,投資総合ナビ,株式,証券会社,投資ガイド,長期投資,リスク管理" />
        <link rel="canonical" href="https://www.invest-navi.com/stocks" />

        {/* Open Graph */}
        <meta property="og:title" content="株式投資ガイド | 投資総合ナビ" />
        <meta property="og:description" content="株式投資の基本から実践的なテクニックまで、初心者から中級者まで幅広く対応した株式投資ガイド。企業分析、配当金投資、銘柄選びの方法を詳しく解説します。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.invest-navi.com/stocks" />
        <meta property="og:site_name" content="投資総合ナビ" />
        <meta property="og:locale" content="ja_JP" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@toushi_navi" />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
          <div className="container mx-auto px-4">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              トップページに戻る
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <section className="relative py-20 container mx-auto px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 animate-fade-in" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
              株式投資
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-fade-in">
              株式投資を始めよう
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              株式投資の基本から実践的なテクニックまで、初心者から中級者まで幅広く対応したガイドです。
            </p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-secondary/20 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Menu className="h-5 w-5" />
                    目次
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        className="block w-full text-left py-2 px-3 rounded-md transition-all duration-200 text-sm hover:bg-secondary/10 hover:text-secondary font-medium hover:scale-[1.02]"
                        onClick={() => scrollToSection(item.id)}
                      >
                        <span className="font-bold text-secondary">{item.number}.</span> {item.title}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-secondary/20 via-secondary/10 to-primary/10 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <TrendingUp className="h-20 w-20 text-secondary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-center relative z-10">株式投資</h3>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">株式投資で資産を増やそう</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      株式投資は、企業の成長とともに資産を増やすことができる投資方法です。
                      企業の株式を購入し、株価の上昇や配当金によって利益を得ます。
                      このセクションでは、株式投資の基本から始めて、実践的な投資戦略までを詳しく解説します。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">株式投資</Badge>
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">企業分析</Badge>
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">配当金</Badge>
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">長期投資</Badge>
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">リスク管理</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">株式投資記事一覧</h2>
              <p className="text-muted-foreground">
                株式投資の基本から応用まで、段階的に学ぶための記事です。
              </p>
            </div>

            <div className="space-y-8">
              {articles.map((article, index) => (
                <Card key={article.id} id={article.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 bg-gradient-to-br from-card to-card/80 hover:border-secondary/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                        {index + 1}
                      </Badge>
                      <h3 className="text-2xl font-bold group-hover:text-secondary transition-colors">{article.title}</h3>
                    </div>
                    <div
                      className="article-content mb-4"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">関連ツール</h2>
                <p className="text-muted-foreground">
                  株式投資を実践するための便利なツールをご紹介します。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                  <Card key={tool.title} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 bg-gradient-to-br from-card to-card/80 hover:border-secondary/30 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <tool.icon className="h-7 w-7 text-secondary" />
                        </div>
                        <CardTitle className="group-hover:text-secondary transition-colors">{tool.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
                      <Button asChild variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-all">
                        <Link to={tool.href}>
                          ツールを使う →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/20 border-2 border-secondary/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-50" />
                <CardContent className="p-10 text-center relative z-10">
                  <div className="inline-block p-4 bg-background rounded-full mb-6 animate-pulse">
                    <Lightbulb className="h-12 w-12 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">株式投資を始める準備はできましたか？</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    株式投資の基本を学んだら、次は実際に取引するための証券会社を選びましょう。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="text-sm sm:text-base md:text-lg whitespace-nowrap px-8 hover:scale-105 transition-transform">
                      <Link to="/comparison">
                        証券会社を比較する →
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-sm sm:text-base md:text-lg whitespace-nowrap px-8 hover:scale-105 transition-transform">
                      <Link to="/#診断">
                        投資診断を始める
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Stocks;