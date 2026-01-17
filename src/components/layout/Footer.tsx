import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "運営会社情報": [
      { name: "運営会社", href: "/company" },
      { name: "お問い合わせ", href: "/contact" },
    ],
    "投資の基礎": [
      { name: "投資とは", href: "/basics" },
      { name: "リスクとリターン", href: "/basics" },
      { name: "投資用語集", href: "/basics" },
    ],
    "投資商品": [
      { name: "株式投資", href: "/stocks" },
      { name: "NISA・つみたてNISA", href: "/nisa" },
      { name: "暗号資産", href: "/crypto" },
    ],
    "ツール": [
      { name: "複利計算", href: "/tools-detail" },
      { name: "投資診断", href: "/#診断" },
    ],
    "比較": [
      { name: "証券会社", href: "/comparison" },
      { name: "FX業者", href: "/fx-comparison" },
      { name: "暗号資産", href: "/crypto-comparison" },
    ],
    "その他": [
      { name: "特定商取引法", href: "/legal" },
      { name: "免責事項", href: "/disclaimer" },
      { name: "サイトマップ", href: "/sitemap" },
    ],
    // 金融庁・外部団体のリンクを追加
    "金融庁・外部団体": [
      { name: "金融庁", href: "https://www.fsa.go.jp/" },
      { name: "日本証券業協会", href: "https://www.jsda.or.jp/" },
      { name: "日本取引所グループ", href: "https://www.jpx.co.jp/" },
    ],
  };

  // フッターリンクの順序を定義
  const footerLinkOrder = [
    "運営会社情報",
    "投資の基礎",
    "投資商品",
    "ツール",
    "比較"
  ];

  // 下段に配置するリンク
  const bottomLinkOrder = [
    "金融庁・外部団体",
    "その他"
  ];

  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-6">
        {/* Brand - 横一列の1カラム */}
        <div className="w-full mb-4">
          <div className="space-y-3 min-w-[140px]">
            <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
              <img src="/logo_v2.png" alt="投資総合ナビ" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-xs text-muted-foreground">
              あなたの投資を成功に導く完全ガイド。初心者から中級者まで、信頼性の高い情報をお届けします。
            </p>
          </div>
        </div>

        {/* Links - モバイル時は基本横一列、入らない場合は改行 */}
        <div className="flex flex-wrap gap-4 mb-4">
          {footerLinkOrder.map((category) => (
            <div key={category} className="min-w-[120px] flex-1">
              <h3 className="font-semibold mb-1.5 text-xs border-0">{category}</h3>
              <ul className="space-y-0.5">
                {footerLinks[category].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors no-underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 下段のリンク - モバイル時は基本横一列、入らない場合は改行 */}
        <div className="flex flex-wrap gap-4 mb-4 pt-4">
          {bottomLinkOrder.map((category) => (
            <div key={category} className="min-w-[120px] flex-1">
              <h3 className="font-semibold mb-1.5 text-xs border-0">{category}</h3>
              <ul className="space-y-0.5">
                {footerLinks[category].map((link) => (
                  <li key={link.name}>
                    {category === "金融庁・外部団体" ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors no-underline"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors no-underline"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground order-2 md:order-1">
            © 2024-2025 投資総合ナビ. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground order-1 md:order-2">
            <Link to="/privacy" className="hover:text-primary transition-colors no-underline">
              プライバシーポリシー
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors no-underline">
              利用規約
            </Link>
            <Link to="/disclaimer" className="hover:text-primary transition-colors no-underline">
              免責事項
            </Link>
            <Link to="/legal" className="hover:text-primary transition-colors no-underline">
              特定商取引法
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors no-underline">
              お問い合わせ
            </Link>
          </div>
        </div>

        {/* 更新日 */}
        <div className="pt-3 border-t border-border mt-3">
          <p className="text-xs text-muted-foreground text-right">
            最終更新日：2025年11月10日
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;