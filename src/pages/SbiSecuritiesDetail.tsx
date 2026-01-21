import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, XCircle, Star, ArrowLeft, CircleCheck, CircleX, Info, TrendingUp, Shield, Zap, Award } from "lucide-react";

const SbiSecuritiesDetail = () => {
  // SBI証券の基本情報（最新情報）
  const companyInfo = {
    name: "SBI証券",
    fullName: "株式会社SBI証券",
    established: "1944年12月 (インターネット取引開始 1999年)",
    parentCompany: "SBIホールディングス株式会社",
    url: "https://www.sbisec.co.jp/", // アフィリエイトリンクがあればそれに置き換え
    affiliateUrl: "https://www.sbisec.co.jp/",
    rating: 5,
    catchphrase: "ネット証券口座開設数 No.1"
  };

  // 基本情報データ
  const basicInfo = [
    { label: "商号", value: "株式会社SBI証券" },
    { label: "金融商品取引業者", value: "関東財務局長（金商）第44号" },
    { label: "加入協会", value: "日本証券業協会、金融先物取引業協会 他" },
    { label: "口座開設数", value: "1,200万口座超 (グループ合計)" },
    { label: "NISA口座数", value: "業界 No.1" },
    { label: "主幹事数", value: "2023年 IPO主幹事数 No.1" }
  ];

  // 手数料比較データ
  const feeStrategies = [
    {
      title: "国内株式 (現物・信用)",
      cost: "0円",
      note: "ゼロ革命 (条件達成で完全無料)",
      highlight: true
    },
    {
      title: "米国株式",
      cost: "0.495%",
      note: "最低0ドル〜上限22ドル (NISAは無料)",
      highlight: false
    },
    {
      title: "投資信託",
      cost: "0円",
      note: "全銘柄ノーロード (購入手数料無料)",
      highlight: true
    }
  ];

  // ポイントプログラム
  const pointServices = [
    { name: "Vポイント", color: "text-blue-600", desc: "三井住友カード積立で最大5.0%" },
    { name: "Pontaポイント", color: "text-orange-500", desc: "取引実績に応じて貯まる・使える" },
    { name: "Tポイント", color: "text-blue-500", desc: "長年の実績。1pt=1円で投資可能" },
    { name: "dポイント", color: "text-red-500", desc: "ドコモユーザーに最適" },
    { name: "JALマイル", color: "text-red-700", desc: "フライト利用が多い方に" },
  ];

  const features = [
    {
      title: "国内株式手数料「完全無料」",
      desc: "「ゼロ革命」により、インターネットコースの国内株式売買手数料が恒久的に0円になります（電子交付設定など簡単な条件あり）。",
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />
    },
    {
      title: "新NISA対応が最強クラス",
      desc: "NISA口座での米国株式・海外ETF売買手数料も無料。クレカ積立（三井住友カード）との相性が抜群で、ポイント還元率も業界トップクラス。",
      icon: <Award className="w-8 h-8 text-yellow-500" />
    },
    {
      title: "IPO取扱実績 No.1",
      desc: "新規公開株（IPO）の取扱数が圧倒的。IPOチャレンジポイント制度があり、落選してもポイントが貯まり、いつか当選しやすくなる独自システム。",
      icon: <Zap className="w-8 h-8 text-purple-500" />
    }
  ];

  // Rating Stars Component
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 pb-20"> {/* pb-20 for sticky footer space */}
        {/* Breadcrumb */}
        <div className="bg-white border-b py-3">
          <div className="container mx-auto px-4">
            <Link
              to="/securities-comparison"
              className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              ネット証券比較に戻る
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-12 md:py-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge className="bg-yellow-400 text-blue-900 font-bold mb-4 hover:bg-yellow-500 px-3 py-1 text-sm md:text-base">
              {companyInfo.catchphrase}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              {companyInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium mb-8">
              迷ったらココ！ 総合力 No.1 の「証券業界の王者」
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
              <div className="flex flex-col items-center">
                <span className="text-sm text-blue-200 mb-1">総合評価</span>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-yellow-400">5.0</span>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-blue-200 mb-1">国内株手数料</span>
                <span className="text-3xl font-bold text-white">0<span className="text-lg font-normal ml-1">円</span></span>
                <span className="text-xs text-blue-200">ゼロ革命</span>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-blue-200 mb-1">NISA</span>
                <span className="text-3xl font-bold text-white">最強</span>
                <span className="text-xs text-blue-200">クレカ積立対応</span>
              </div>
            </div>

            <div className="mt-8">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse"
                onClick={() => window.open(companyInfo.affiliateUrl, '_blank')}>
                SBI証券 公式サイトを見る <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Section (Features) */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            なぜ、多くの投資家が<span className="text-blue-700">SBI証券</span>を選ぶのか？
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-none shadow-lg hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <CardHeader>
                  <div className="mb-4 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-center text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison / Fees Specs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Info className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">手数料・スペック詳細</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {feeStrategies.map((item, idx) => (
                <div key={idx} className={`border rounded-xl p-6 text-center ${item.highlight ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{item.title}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{item.cost}</div>
                  <p className="text-sm text-gray-600">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 text-center">対応ポイントサービス</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {pointServices.map((pt, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white border rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-current ${pt.color}`}></span>
                    {pt.name}
                  </span>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                貯めたポイントは「1pt = 1円」で投資信託の買付にも利用可能です（一部を除く）。
              </p>
            </div>
          </div>
        </section>

        {/* Merit & Demerit */}
        <section className="py-16 container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Merits */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CheckCircle className="text-green-500" /> SBI証券のメリット
              </h3>
              <ul className="space-y-4">
                {[
                  "業界最安水準の手数料（ゼロ革命で国内株0円）",
                  "商品ラインナップが圧倒的（9ヶ国の外国株、先物、金など）",
                  "IPO取扱数が証券業界No.1で当選チャンスが多い",
                  "投信積立のクレカ決済（三井住友カード）で高還元",
                  "住信SBIネット銀行との連携（自動入出金）が便利すぎる"
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <CircleCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Demerits */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <XCircle className="text-red-500" /> デメリット・注意点
              </h3>
              <ul className="space-y-4">
                {[
                  "サイトやツールが多機能すぎて、初心者は迷いやすい",
                  "対面での相談はできない（ネット証券のため）",
                  "IPOは資金力がある人や、長年ポイントを貯めた人が有利になりがち"
                ].map((d, i) => (
                  <li key={i} className="flex items-start gap-3 bg-red-50 p-4 rounded-lg border border-red-100">
                    <CircleX className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Info Accordion / Blocks */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>会社基本情報</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {basicInfo.map((info, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row p-4 hover:bg-gray-50">
                      <span className="w-full sm:w-1/3 font-semibold text-gray-600 mb-1 sm:mb-0">{info.label}</span>
                      <span className="w-full sm:w-2/3 text-gray-800">{info.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">今すぐSBI証券で投資を始めよう</h2>
            <p className="text-lg text-blue-200 mb-8">
              業界No.1のスペックと安心感。迷ったらSBI証券を選べば間違いありません。<br />
              最短5分、スマホだけで口座開設完了。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold h-14 px-8 text-lg rounded-full shadow-lg"
                onClick={() => window.open(companyInfo.affiliateUrl, '_blank')}>
                無料で口座開設する <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Sticky Footer CTA (Mobile Only, or visible on scroll) */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-2xl z-50 md:hidden">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 text-lg shadow-md rounded-full"
            onClick={() => window.open(companyInfo.affiliateUrl, '_blank')}>
            SBI証券 公式サイトへ
          </Button>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default SbiSecuritiesDetail;