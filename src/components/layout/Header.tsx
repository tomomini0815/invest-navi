import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, TrendingUp, X, PanelLeft, PanelRight, AlignJustify, SquareMenu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation: { name: string; href: string; children?: { name: string; href: string }[] }[] = [
    { name: "ホーム", href: "/" },
    {
      name: "投資ガイド",
      href: "/guide/investment-basics",
      children: [
        { name: "投資ガイドトップ", href: "/guide/investment-basics" },
        { name: "決算書の見方", href: "/guide/financial-analysis" }
      ]
    },
    { name: "銘柄スクリーナー", href: "/screener" },
    { name: "証券会社比較", href: "/comparison" },
    { name: "FX口座比較", href: "/fx-comparison" },
    { name: "暗号資産取引所比較", href: "/crypto-comparison" },
    { name: "投資計算ツール", href: "/tools" },
  ];

  // 現在のパスに基づいてアクティブなナビゲーション項目を判定する関数
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // 投資診断セクションにスクロールする関数
  const scrollToDiagnostic = () => {
    // risk-assessmentページでない場合はrisk-assessmentページに移動
    if (location.pathname !== "/tools/risk-assessment") {
      navigate("/tools/risk-assessment#diagnostic-tool");
    } else {
      // ページ遷移後に診断ツールセクションにスクロール
      setTimeout(() => {
        const element = document.getElementById("diagnostic-tool");
        if (element) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // モバイルメニューが開いている場合は閉じる
          setIsMobileMenuOpen(false);
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ '--header-height': '4rem' } as React.CSSProperties}>
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img src="/logo_v2.png" alt="投資総合ナビ" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.href}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-md inline-flex items-center ${isActive(item.href)
                  ? "text-primary bg-primary/20 font-semibold"
                  : "text-foreground/80 hover:text-primary hover:bg-accent"
                  }`}
              >
                {item.name}
              </Link>

              {/* Dropdown Menu */}
              {item.children && (
                <div className="absolute left-0 top-full pt-2 w-48 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-white rounded-md shadow-lg border border-border p-1 overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={`block px-4 py-2 text-sm rounded-sm transition-colors ${isActive(child.href)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted hover:text-primary"
                          }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button variant="default" size="sm" onClick={scrollToDiagnostic} className="ml-2">
            総合診断を始める
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden p-1 border border-border"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X style={{ height: '32px', width: '32px' }} /> : <Menu style={{ height: '32px', width: '32px' }} />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={`block py-2 text-sm font-medium transition-colors px-3 rounded-md ${isActive(item.href)
                    ? "text-primary bg-primary/20 font-semibold"
                    : "text-foreground/80 hover:text-primary hover:bg-accent"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {/* Mobile Submenu Items */}
                {item.children && (
                  <div className="pl-4 mt-1 space-y-1 border-l-2 border-muted ml-2">
                    {item.children.slice(1).map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={`block py-2 text-sm font-medium transition-colors px-3 rounded-md ${isActive(child.href)
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-primary"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button variant="default" size="sm" className="w-full mt-2" onClick={scrollToDiagnostic}>
              総合診断を始める
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;