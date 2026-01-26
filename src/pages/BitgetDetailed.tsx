import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, CheckCircle, TrendingUp, Shield, Smartphone, Zap, Users, Wallet } from "lucide-react";
import { Helmet } from "react-helmet-async";

const BitgetDetailed = () => {
  const features = [
    {
      title: "Copy Trading機能が充実",
      description: "上級トレーダーの取引を自動でコピーできる機能が充実しています。初心者でも簡単に上級者の取引戦略を活用できます。",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "多様なアルトコインを取扱",
      description: "ビットコインやイーサリアムだけでなく、多数のアルトコインを取扱っています。最新の暗号資産にも迅速に対応しています。",
      icon: <Wallet className="h-6 w-6" />
    },
    {
      title: "日本語対応",
      description: "日本語のインターフェースとカスタマーサポートを提供しており、日本ユーザーにも使いやすい設計になっています。",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "高機能な取引ツール",
      description: "PC版とスマホアプリの両方で高機能な取引ツールを提供しています。直感的な操作性と多彩なチャート分析機能を備えています。",
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      title: "業界標準のセキュリティ",
      description: "業界標準のセキュリティ対策を実施しており、ユーザーの資産を安全に保護します。",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "手数料が競争力あり",
      description: "取引手数料が業界平均よりも競争力があり、コストを抑えて取引が可能です。",
      icon: <Zap className="h-6 w-6" />
    }
  ];

  const steps = [
    {
      step: "STEP1",
      title: "アカウント登録（所要時間：5-10分）",
      description: "Bitget公式サイトから必要事項を入力してください。メールアドレス、パスワード、氏名、住所、電話番号などの基本情報を入力します。本人確認書類（運転免許証、パスポート、マイナンバーカードのいずれか）の準備も進めてください。"
    },
    {
      step: "STEP2",
      title: "本人確認（所要時間：数分〜24時間）",
      description: "準備した本人確認書類（運転免許証、パスポート、マイナンバーカードのいずれか）と顔写真をスマートフォンで撮影し、アップロードします。住所確認のため、公共料金の請求書などのスキャンも必要になる場合があります。審査は通常数分で完了しますが、最大で24時間かかる場合もあります。"
    },
    {
      step: "STEP3",
      title: "取引開始（本人確認審査完了後）",
      description: "本人確認審査が完了すると、Bitgetの取引口座が開設されます。初回入金（クレジットカードまたは銀行振込）が完了すれば、各種暗号資産の取引を開始できます。取引時間は24時間365日可能です。"
    }
  ];

  const preparationItems = [
    {
      title: "必須アイテム",
      items: [
        "本人確認書類（運転免許証、パスポート、マイナンバーカードのいずれか）",
        "スマートフォン（本人確認用）",
        "メールアドレス",
        "電話番号"
      ]
    },
    {
      title: "推奨事項",
      items: [
        "公共料金の請求書（住所確認用）",
        "クレジットカードまたは銀行口座（入金用）",
        "2要素認証（セキュリティ強化のため）"
      ]
    }
  ];

  const importantNotes = [
    "暗号資産取引は元本や利益を保証するものではありません",
    "相場の変動により損失が発生する可能性があります",
    "取引を始める前に、リスクについて十分に理解した上で、ご自身の判断で行ってください",
    "海外取引所を利用する際は、日本での法的規制や税制についてもご確認ください"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bitget詳細 | 暗号資産取引所比較 | 投資総合ナビ</title>
        <meta name="description" content="Bitgetの詳細情報。Copy Trading機能、多様なアルトコイン、日本語対応、高機能な取引ツールを提供。" />
        <meta name="keywords" content="Bitget, 暗号資産取引所, 暗号資産比較, 手数料, 取引ツール" />
        <link rel="canonical" href="https://www.invest-navi.com/crypto/bitget" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Bitget詳細 | 暗号資産取引所比較 | 投資総合ナビ" />
        <meta property="og:description" content="Bitgetの詳細情報。Copy Trading機能、多様なアルトコイン、日本語対応、高機能な取引ツールを提供。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.invest-navi.com/crypto/bitget" />
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
              Bitget
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Copy Trading機能と多様なアルトコイン
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                <a 
                  href="https://www.bitget.com/" 
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

        {/* Bitgetの特徴 */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Bitgetの特徴</h2>
              
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

        {/* Bitgetの始め方｜簡単3ステップ */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Bitgetの始め方｜簡単3ステップ</h2>
              
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

        {/* 口座開設時の共通準備物 */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-primary">口座開設時の共通準備物</h2>
              
              <div className="md:grid md:grid-cols-2 gap-8">
                {preparationItems.map((category, index) => (
                  <Card key={index} className="border-2 mb-6 md:mb-0">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* こんな人にBitgetがおすすめ */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">こんな人にBitgetがおすすめ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">Copy Trading機能を使いたい方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">多様なアルトコインを取引したい方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">日本語対応の取引所を探している方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">初心者でも使いやすい取引所を探している方</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 暗号資産取引にはリスクが伴います */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">暗号資産取引にはリスクが伴います</h2>
              
              <Card className="border-2 border-yellow-500/50 bg-yellow-50/50 shadow-lg">
                <CardHeader className="bg-yellow-100/50">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <CheckCircle className="h-5 w-5" />
                    重要な注意事項
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                    {importantNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <div className="mt-12 text-center">
                <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                  <a 
                    href="https://www.bitget.com/" 
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

export default BitgetDetailed;