import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, CheckCircle, TrendingUp, Shield, Smartphone, Zap, Users, Wallet, Coins, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CoinbaseDetailed = () => {
  const features = [
    {
      title: "初心者に最適なインターフェース",
      description: "初心者に最適なインターフェースを備えています。直感的な操作性があり、簡単に取引が可能です。",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "米国で厳格な規制を満たすセキュリティ",
      description: "米国で厳格な規制を満たすセキュリティ体制を整えています。万が一の際も、資産は保護されるため、安心して取引が可能です。",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "米国最大の取引所",
      description: "米国最大の暗号資産取引所として知られています。信頼性と実績があり、多くのユーザーに支持されています。",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Coinbase Oneで手数料削減可能",
      description: "Coinbase Oneというプレミアムサービスを提供しており、手数料を削減することが可能です。",
      icon: <Wallet className="h-6 w-6" />
    },
    {
      title: "多様な暗号資産の取扱",
      description: "ビットコイン、イーサリアムなど、主要な暗号資産をはじめ、240以上のデジタル資産を取り扱っています。",
      icon: <Coins className="h-6 w-6" />
    },
    {
      title: "充実したサポート体制",
      description: "充実したサポート体制を整えています。初心者でも安心して取引が可能です。",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "信頼性の高い取引所",
      description: "信頼性の高い取引所として知られています。多くのユーザーに支持されています。",
      icon: <Shield className="h-6 w-6" />
    }
  ];

  const steps = [
    {
      step: "STEP1",
      title: "アカウント登録",
      description: "Coinbase公式サイトで「アカウントを作成」をクリックし、名前、メールアドレス、パスワードを入力してください。登録確認メールが届くので、リンクをクリックして認証を完了します。"
    },
    {
      step: "STEP2",
      title: "本人確認（KYC）",
      description: "ログイン後、個人情報を入力し、本人確認書類（運転免許証、パスポート、マイナンバーカードなど）をアップロードします。住所確認のため、公共料金の請求書などのスキャンも必要になる場合があります。"
    },
    {
      step: "STEP3",
      title: "入金と取引開始",
      description: "銀行振込、クレジットカード、暗号資産などを使って入金します。入金確認後、各種暗号資産の取引が可能になります。24時間365日取引可能です。"
    }
  ];

  const importantNotes = [
    "暗号資産取引は元本や利益を保証するものではありません",
    "相場の変動により損失が発生する可能性があります",
    "取引を始める前に、リスクについて十分に理解した上で、ご自身の判断で行ってください"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Coinbase詳細 | 暗号資産取引所比較 | 投資総合ナビ</title>
        <meta name="description" content="Coinbaseの詳細情報。初心者に最適、米国で厳格な規制を満たすセキュリティ、シンプルなインターフェースを提供。" />
        <meta name="keywords" content="Coinbase, 暗号資産取引所, 暗号資産比較, 手数料, 取引ツール" />
        <link rel="canonical" href="https://www.invest-navi.com/crypto/coinbase" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Coinbase詳細 | 暗号資産取引所比較 | 投資総合ナビ" />
        <meta property="og:description" content="Coinbaseの詳細情報。初心者に最適、米国で厳格な規制を満たすセキュリティ、シンプルなインターフェースを提供。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.invest-navi.com/crypto/coinbase" />
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
              Coinbase
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              初心者に最適と米国で厳格な規制を満たすセキュリティ
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                <a 
                  href="https://www.coinbase.com/ja" 
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

        {/* Coinbaseの特徴 */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Coinbaseの特徴</h2>
              
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

        {/* Coinbaseの始め方｜簡単3ステップ */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Coinbaseの始め方｜簡単3ステップ</h2>
              
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

        {/* こんな人にCoinbaseがおすすめ */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-primary">こんな人にCoinbaseがおすすめ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">初心者の方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">セキュリティを重視する方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">シンプルなインターフェースを探している方</span>
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
                    {importantNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <div className="mt-12 text-center">
                <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                  <a 
                    href="https://www.coinbase.com/ja" 
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

export default CoinbaseDetailed;