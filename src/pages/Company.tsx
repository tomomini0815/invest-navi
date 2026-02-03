import { Link } from "react-router-dom";
import { ChevronLeft, Users, Target, Eye, Award } from "lucide-react";

const Company = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              運営会社情報
            </h1>

            <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 space-y-8">
              <div className="bg-gradient-to-br from-card to-card/50 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">会社概要</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h3 className="font-bold mb-2">会社名</h3>
                    <p>株式会社ユーザーバリュー</p>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h3 className="font-bold mb-2">設立</h3>
                    <p>2021年2月</p>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h3 className="font-bold mb-2">所在地</h3>
                    <p>神奈川県秦野市渋沢768-9</p>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h3 className="font-bold mb-2">資本金</h3>
                    <p>500万円</p>
                  </div>


                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-card to-card/50 border-2 hover:shadow-2xl transition-all duration-300 p-6 rounded-lg text-center">
                  <div className="bg-accent/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">ミッション</h3>
                  <p className="text-muted-foreground text-sm">
                    投資で皆様の生活をより豊かに。信頼性の高い情報提供を通じて、資産形成をサポートします。
                  </p>
                </div>

                <div className="bg-gradient-to-br from-card to-card/50 border-2 hover:shadow-2xl transition-all duration-300 p-6 rounded-lg text-center">
                  <div className="bg-accent/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">ビジョン</h3>
                  <p className="text-muted-foreground text-sm">
                    皆様の資産運用を一歩先へ導くナビゲーションとして、信頼される投資情報プラットフォームを目指します。
                  </p>
                </div>

                <div className="bg-gradient-to-br from-card to-card/50 border-2 hover:shadow-2xl transition-all duration-300 p-6 rounded-lg text-center">
                  <div className="bg-accent/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">バリュー</h3>
                  <p className="text-muted-foreground text-sm">
                    客観性・透明性・信頼性を重視し、ユーザーの利益を最優先に考えた情報提供を心がけます。
                  </p>
                </div>
              </div>

              {/* 監修者紹介セクションを追加 */}
              <div className="bg-gradient-to-br from-card to-card/50 border-2 hover:shadow-2xl transition-all duration-300 p-6 rounded-lg">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="bg-accent/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-center">監修者紹介</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <div className="flex flex-col items-center text-center">
                    <div>
                      <h3 className="font-bold mb-2">投資歴10年以上のベテラン投資家</h3>
                      <p className="text-muted-foreground text-sm">
                        株式投資、FX、暗号資産など多様な投資分野に精通した専門家。
                        長年の実務経験と確かな分析力で、当サイトのコンテンツの正確性と信頼性を担保しています。
                        投資初心者から中級者まで、皆様の資産形成をより良い方向に導くための情報を提供します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 更新日 */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-right">
                  最終更新日：2025年11月3日
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Company;