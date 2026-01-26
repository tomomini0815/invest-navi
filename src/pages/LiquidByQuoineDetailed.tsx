import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, CheckCircle, TrendingUp, Shield, Smartphone, Zap, Users, Wallet, Coins } from "lucide-react";
import { Helmet } from "react-helmet-async";

const LiquidByQuoineDetailed = () => {
  const features = [
    {
      title: "国内トップクラスのセキュリティ",
      description: "liquid by QUOINEは、国内トップクラスのセキュリティ体制を整えています。万が一の際も、資産は保護されるため、安心して取引が可能です。",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "マイナーな暗号資産も取扱",
      description: "liquid by QUOINEでは、マイナーな暗号資産も取り扱っています。多様な暗号資産への投資が可能です。",
      icon: <Coins className="h-6 w-6" />
    },
    {
      title: "国内最大級の取引高",
      description: "liquid by QUOINEは、国内最大級の取引高を誇ります。流動性が高く、スムーズな取引が可能です。",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "高機能な取引ツール",
      description: "liquid by QUOINEの取引ツールは高機能で、多彩なチャート分析機能や、直感的な操作性を備えています。",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "多様な暗号資産の取扱",
      description: "liquid by QUOINEでは、ビットコイン、イーサリアムなど、主要な暗号資産をはじめ、多様な暗号資産を取り扱っています。",
      icon: <Coins className="h-6 w-6" />
    },
    {
      title: "充実したサポート体制",
      description: "liquid by QUOINEは、充実したサポート体制を整えています。初心者でも安心して取引が可能です。",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "信頼性の高いセキュリティ体制",
      description: "liquid by QUOINEは、信頼性の高いセキュリティ体制を整えています。万が一の際も、資産は保護されるため、安心して取引が可能です。",
      icon: <Shield className="h-6 w-6" />
    }
  ];

  const steps = [
    {
      step: "STEP1",
      title: "口座開設申込（所要時間：5-10分）",
      description: "liquid by QUOINE公式サイトから必要事項を入力してください。氏名、住所、電話番号、メールアドレスなどの基本情報と、職業、年収などの属性情報を入力します。本人確認書類（運転免許証、パスポート、マイナンバーカードのいずれか）の準備も同時に進めてください。"
    },
    {
      step: "STEP2",
      title: "本人確認（所要時間：1-3営業日）",
      description: "準備した本人確認書類をスマートフォンのカメラで撮影し、アップロードします。住所確認のため、公共料金の請求書などのスキャンも必要になる場合があります。審査は通常1-3営業日かかり、SMSまたはメールで結果が通知されます。"
    },
    {
      step: "STEP3",
      title: "取引開始（本人確認審査完了後）",
      description: "本人確認審査が完了すると、liquid by QUOINEの取引口座が開設されます。初回入金（クレジットカードまたは銀行振込）が完了すれば、取引を開始できます。取引時間は24時間365日可能です。"
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
        <title>liquid by QUOINE詳細 | 暗号資産取引所比較 | 投資総合ナビ</title>
        <meta name="description" content="liquid by QUOINEの詳細情報。国内トップクラスのセキュリティ、マイナーな暗号資産も取扱、国内最大級の取引高を提供。" />
        <meta name="keywords" content="liquid by QUOINE, 暗号資産取引所, 暗号資産比較, 手数料, 取引ツール" />
        <link rel="canonical" href="https://www.invest-navi.com/crypto/liquid-by-quoine" />
        
        {/* Open Graph */}
        <meta property="og:title" content="liquid by QUOINE詳細 | 暗号資産取引所比較 | 投資総合ナビ" />
        <meta property="og:description" content="liquid by QUOINEの詳細情報。国内トップクラスのセキュリティ、マイナーな暗号資産も取扱、国内最大級の取引高を提供。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.invest-navi.com/crypto/liquid-by-quoine" />
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
              liquid by QUOINE
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              国内トップクラスのセキュリティとマイナーな暗号資産も取扱
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                <a 
                  href="https://liquid.com/ja/" 
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

        {/* liquid by QUOINEの特徴 */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">liquid by QUOINEの特徴</h2>
              
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

        {/* liquid by QUOINEの始め方｜簡単3ステップ */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">liquid by QUOINEの始め方｜簡単3ステップ</h2>
              
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

        {/* こんな人にliquid by QUOINEがおすすめ */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-primary">こんな人にliquid by QUOINEがおすすめ</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">セキュリティを重視する方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">マイナーな暗号資産に投資したい方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">流動性の高い取引所を探している方</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">高機能な取引ツールを使いたい方</span>
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
                    href="https://liquid.com/ja/" 
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

export default LiquidByQuoineDetailed;