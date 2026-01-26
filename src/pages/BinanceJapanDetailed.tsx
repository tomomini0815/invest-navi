import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, CheckCircle, TrendingUp, Shield, Smartphone, Zap, Users, Wallet, Coins, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";

const BinanceJapanDetailed = () => {
  const features = [
    {
      title: "業界標準のセキュリティ",
      description: "業界標準のセキュリティ体制を整えています。万が一の際も、資産は保護されるため、安心して取引が可能です。",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "世界最大手グループ国内取引所",
      description: "世界最大手の暗号資産取引所グループの一員として、信頼性と実績があります。",
      icon: <Globe className="h-6 w-6" />
    },
    {
      title: "国内取引所の中でも最多クラスの銘柄数",
      description: "国内取引所の中でも最多クラスの63銘柄の暗号資産を取り扱っています(2025年10月時点)。",
      icon: <Coins className="h-6 w-6" />
    },
    {
      title: "早期に100銘柄の取扱いを目指すことを表明",
      description: "早期に100銘柄の取扱いを目指すことを表明しています。今後の拡充が期待できます。",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "出金手数料:1回150円",
      description: "出金手数料は1回150円です。コストを抑えて出金が可能です。",
      icon: <Wallet className="h-6 w-6" />
    },
    {
      title: "コンバート手数料無料",
      description: "コンバート手数料が無料です。コストを抑えて取引が可能です。",
      icon: <Wallet className="h-6 w-6" />
    },
    {
      title: "BNB支払いで25%割引",
      description: "BNB支払いで取引手数料が25%割引になります。コストを抑えて取引が可能です。",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  const steps = [
    {
      step: "STEP1",
      title: "アカウント作成",
      description: "公式サイトにアクセス(必ずURLを確認、フィッシングサイトに注意)し、メールアドレスまたは電話番号でアカウントを作成してください。"
    },
    {
      step: "STEP2",
      title: "本人確認",
      description: "個人情報を入力し、本人確認書類と顔写真をスマホで撮影します。"
    },
    {
      step: "STEP3",
      title: "二段階認証設定後、取引開始",
      description: "Passkeyまたは認証アプリ(Google Authenticator)で二段階認証を設定し、日本円または仮想通貨で入金してください。"
    }
  ];

  const commonPreparationItems = [
    "メールアドレス(フリーメールOK)",
    "本人確認書類(運転免許証・マイナンバーカード・パスポート・在留カードのいずれか1点)",
    "スマートフォン(本人確認撮影用)"
  ];

  const recommendations = [
    "二段階認証アプリ(Google Authenticatorなど)",
    "銀行口座(日本円入金用)"
  ];

  const importantNotes = [
    "フィッシング詐欺に注意: 必ず公式サイトのURLを確認してからアクセスしてください",
    "審査について: 年収が低くても審査に落ちることはありません。正直に情報を入力しましょう",
    "年齢制限: ほとんどの取引所で18歳以上が対象です",
    "セキュリティ: 口座開設後は必ず二段階認証を設定してください",
    "住所の一致: 本人確認書類の住所と現住所が一致していないと口座開設できません"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Binance Japan詳細 | 暗号資産取引所比較 | 投資総合ナビ</title>
        <meta name="description" content="Binance Japanの詳細情報。業界標準のセキュリティ、世界最大手グループ国内取引所、国内取引所の中でも最多クラスの銘柄数を提供。" />
        <meta name="keywords" content="Binance Japan, 暗号資産取引所, 暗号資産比較, 手数料, 取引ツール" />
        <link rel="canonical" href="https://www.invest-navi.com/crypto/binance-japan" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Binance Japan詳細 | 暗号資産取引所比較 | 投資総合ナビ" />
        <meta property="og:description" content="Binance Japanの詳細情報。業界標準のセキュリティ、世界最大手グループ国内取引所、国内取引所の中でも最多クラスの銘柄数を提供。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.invest-navi.com/crypto/binance-japan" />
        <meta property="og:site_name" content="投資総合ナビ" />
        <meta property="og:locale" content="ja_JP" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@toushi_navi" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
          <div className="container mx-auto px-8">
            <Link 
              to="/crypto-comparison" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              暗号資産取引所比較に戻る
            </Link>
          </div>
        </div>

        {/* ヒーローセクション */}
        <section className="relative py-16 container mx-auto px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 animate-fade-in" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              Binance Japan
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              業界標準のセキュリティと国内取引所の中でも最多クラスの銘柄数
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                <a 
                  href="https://www.binance.co.jp/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  公式サイトへ
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Binance Japanの特徴 */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Binance Japanの特徴</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                      <CardTitle className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <span className="text-xl pt-1">{feature.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Binance Japanの始め方｜簡単3ステップ */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Binance Japanの始め方｜簡単3ステップ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 text-center h-full bg-gradient-to-b from-background to-muted/20">
                    <CardHeader>
                      <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-2xl font-bold">{step.step}</span>
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 口座開設時の共通準備物と注意事項 */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">口座開設時の共通準備物と注意事項</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 必須アイテムと推奨事項 */}
                <Card className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="bg-primary/10">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <CheckCircle className="h-5 w-5" />
                      口座開設時の共通準備物
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-muted-foreground mb-2">必須アイテム</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {commonPreparationItems.map((item, index) => (
                            <li key={index} className="text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-muted-foreground mb-2">推奨事項</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {recommendations.map((item, index) => (
                            <li key={index} className="text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 重要な注意事項 */}
                <Card className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="bg-yellow-100/50">
                    <CardTitle className="flex items-center gap-2 text-yellow-800">
                      <Shield className="h-5 w-5" />
                      重要な注意事項
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                      {[
                        "フィッシング詐欺に注意: 必ず公式サイトのURLを確認してからアクセスしてください",
                        "審査について: 年収が低くても審査に落ちることはありません。正直に情報を入力しましょう",
                        "年齢制限: ほとんどの取引所で18歳以上が対象です",
                        "セキュリティ: 口座開設後は必ず二段階認証を設定してください",
                        "住所の一致: 本人確認書類の住所と現住所が一致していないと口座開設できません"
                      ].map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* こんな人にBinance Japanがおすすめ */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-primary">こんな人にBinance Japanがおすすめ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">多様な暗号資産に投資したい方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">世界最大手グループの信頼性を重視する方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">手数料を抑えたい方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">信頼性の高い取引所を探している方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 md:col-span-2">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">24時間365日取引可能な取引所を探している方</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 暗号資産取引を始める前に知っておきたいこと */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">暗号資産取引を始める前に知っておきたいこと</h2>
              
              <Card className="border-2 border-yellow-500/50 bg-yellow-50/50 shadow-lg">
                <CardHeader className="bg-yellow-100/50">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <CheckCircle className="h-5 w-5" />
                    暗号資産取引にはリスクが伴います
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                    <li>暗号資産取引は元本や利益を保証するものではありません</li>
                    <li>相場の変動により損失が発生する可能性があります</li>
                    <li>取引を始める前に、リスクについて十分に理解した上で、ご自身の判断で行ってください</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="mt-12 text-center">
                <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                  <a 
                    href="https://www.binance.co.jp/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    口座開設はこちら
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BinanceJapanDetailed;