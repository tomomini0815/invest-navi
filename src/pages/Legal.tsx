import { Link } from "react-router-dom";
import { ChevronLeft, Building, MapPin, Phone, Mail, FileText, CreditCard, Truck, RotateCcw, Shield, Copyright } from "lucide-react";

const Legal = () => {
  // アイコンとラベルのマッピング
  const infoItems = [
    { icon: Building, label: "事業者名", value: "株式会社ユーザーバリュー" },
    { icon: MapPin, label: "所在地", value: "神奈川県秦野市渋沢768-9" },
    { icon: Phone, label: "電話番号", value: "044-400-2258", desc: "受付時間：平日 10:00～18:00" },
    { icon: Mail, label: "メールアドレス", value: "uservalue2021@gmail.com" },
  ];

  const serviceItems = [
    { icon: FileText, label: "サービス名", value: "投資総合ナビ" },
    { icon: CreditCard, label: "販売価格", value: "無料" },
    { icon: CreditCard, label: "代金以外の必要料金", value: "インターネット接続料金等（ユーザー負担）" },
    { icon: RotateCcw, label: "申込有効期限", value: "特になし" },
    { icon: CreditCard, label: "支払方法", value: "当サイトは情報提供サービスであり、商品の販売は行っていません" },
    { icon: Truck, label: "引き渡し時期", value: "即時" },
    { icon: RotateCcw, label: "返品・交換について", value: "デジタルコンテンツの性質上、返品・交換はできません" },
  ];

  const additionalSections = [
    {
      icon: Shield,
      title: "サイト上の表現について",
      content: [
        "当サイトのコンテンツは、投資判断の参考となる情報の提供を目的としております。投資に関する最終的な判断は、必ずご自身の責任において行ってください。",
        "当サイトで掲載している情報は、正確性を期すよう努めておりますが、その完全性、正確性、有用性、安全性等について、いかなる保証も行うものではありません。",
        "過去の投資実績は将来の成果を保証するものではありません。投資には元本の損失が伴う可能性があります。"
      ]
    },
    {
      icon: Shield,
      title: "個人情報の取り扱いについて",
      content: [
        "当サイトでは、ユーザーの個人情報を適切に保護し、プライバシーを尊重することを重要な責務と考えております。",
        "個人情報の取り扱いについては、別途「プライバシーポリシー」をご確認ください。"
      ]
    },
    {
      icon: Shield,
      title: "免責事項",
      content: [
        "当サイトの情報を利用したことにより生じた、いかなる損害（直接的、間接的を問わず）についても、当サイトは一切の責任を負いません。",
        "当サイトからリンクされている外部サイトの内容について、当サイトは一切の責任を負いません。",
        "当サイトは、事前の予告なく、サービスの内容を変更、中断、または終了する場合があります。"
      ]
    },
    {
      icon: Copyright,
      title: "著作権について",
      content: [
        "当サイトに掲載されているすべてのコンテンツ（文章、画像、動画等）の著作権は、株式会社ユーザーバリューに帰属します。",
        "無断での複製、転載、改変等は固くお断りいたします。"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            ホームに戻る
          </Link>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                特定商取引法に基づく表記
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                当サイトのサービスに関する特定商取引法に基づく表記です
              </p>
            </div>

            <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 space-y-10">
              {/* 事業者情報セクション */}
              <section>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-primary/20">
                  <Building className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">事業者情報</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {infoItems.map((item, index) => (
                    <div key={index} className="flex items-start p-5 bg-accent/5 rounded-lg border border-accent/10 hover:shadow-sm transition-shadow">
                      <div className="flex-shrink-0 mt-1">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                        {item.desc && (
                          <p className="text-sm text-muted-foreground/80 mt-1">{item.desc}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* サービス内容セクション */}
              <section>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-primary/20">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-primary">サービス内容</h2>
                </div>

                <div className="space-y-5">
                  {serviceItems.map((item, index) => (
                    <div key={index} className="flex items-start p-5 bg-accent/5 rounded-lg border border-accent/10 hover:shadow-sm transition-shadow">
                      <div className="flex-shrink-0 mt-1">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 追加セクション */}
              {additionalSections.map((section, index) => (
                <section key={index}>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-primary/20">
                    <section.icon className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
                  </div>

                  <div className="p-6 bg-accent/5 rounded-lg border border-accent/10">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-muted-foreground mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              {/* 更新日 */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-right">
                  最終更新日：2025年10月30日
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Legal;