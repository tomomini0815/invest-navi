import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, '../docs');
const indexHtmlPath = path.join(docsDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: docs/index.html not found. Run "npm run build" first.');
    process.exit(1);
}

const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

// List of all routes to generate static pages for
const routes = [
    // Main Pages
    '/basics',
    '/stocks',
    '/nisa',
    '/investment-trust',
    '/crypto',
    '/tools-detail',
    '/comparison',
    '/crypto-comparison',
    '/fx-comparison',
    '/securities-comparison',
    '/tools',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/legal',
    '/contact',
    '/company',
    '/sitemap',
    '/screener',
    '/chart',
    '/risk-diagnostic',

    // Securities Pro Details
    '/securities/sbi-pro',
    '/securities/rakuten-pro',
    '/securities/monex-pro',

    // Crypto Exchanges
    '/crypto/gmo-coin',
    '/crypto/bitflyer',
    '/crypto/coincheck',
    '/crypto/liquid-by-quoine',
    '/crypto/binance',
    '/crypto/bybit',
    '/crypto/coinbase',
    '/crypto/kraken',
    '/crypto/kucoin',
    '/crypto/gemini',
    '/crypto/bitstamp',
    '/crypto/bitfinex',
    '/crypto/huobi',
    '/crypto/okx',
    '/crypto/ftx',
    '/crypto/bitbank',
    '/crypto/sbi-vc-trade',
    '/crypto/bitpoint',
    '/crypto/binance-japan',
    '/crypto/bittrade',
    '/crypto/rakuten-wallet',
    '/crypto/line-bitmax',
    '/crypto/bitget',

    // Tools
    '/tools/compound-interest',
    '/tools/saving-calculator',
    '/tools/risk-assessment',
    '/tools/stock-return',
    '/tools/fund-return',
    '/tools/crypto-return',
    '/tools/fx-calculator',
    '/tools/portfolio-analysis',

    // Articles (Static)
    '/articles',
    '/articles/ml-stock-prediction',
    '/articles/dl-forex-prediction',
    '/articles/ai-portfolio-optimization',
    '/analysis/ml-stock',

    // Guides (Dynamic IDs from GuideDetail.tsx)
    '/guide/financial-analysis', // Defined as static route in App.tsx
    '/guide/nisa-beginner',
    '/guide/stocks-beginner',
    '/guide/investment-trust',
    '/guide/investment-basics',

    // Articles (Dynamic IDs from ArticleDetail.tsx)
    '/articles/stocks-roadmap-50k',
    '/articles/crypto-trends-2024',
    '/articles/interest-rate-impact',
    '/articles/ai-investment-strategy',
    '/articles/ai-investment-fundamentals',
    '/articles/trading-indicators-overview',
    '/articles/tradingview-beginner',
    '/articles/crypto-exchange-comparison',
    '/articles/fx-broker-comparison',
    '/articles/daytrade-vs-longterm-2026',
    '/articles/tenbagger-candidate-2026',
    '/articles/nisa-beginner-2026',
    '/articles/investment-trust-2026',
];

let createdCount = 0;

routes.forEach(route => {
    // Remove leading slash for path construction
    const relativePath = route.startsWith('/') ? route.slice(1) : route;
    const dirPath = path.join(docsDir, relativePath);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, 'index.html');
    fs.writeFileSync(filePath, indexHtmlContent);
    createdCount++;
});

console.log(`Successfully generated ${createdCount} static pages.`);
