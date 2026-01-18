import { useRef } from "react";

// TradingView Ticker Tape Widget
const TickerTape = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleLoad = () => {
        const sendMessage = () => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage({
                    type: 'INIT_WIDGET',
                    scriptSrc: "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
                    config: {
                        symbols: [
                            { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                            { proName: "FOREXCOM:NSXUSD", title: "NASDAQ" },
                            { proName: "FOREXCOM:DJI", title: "Dow Jones" },
                            { proName: "INDEX:NKY", title: "日経225" },
                            { proName: "FX:USDJPY", title: "USD/JPY" },
                            { proName: "FX:EURUSD", title: "EUR/USD" },
                            { proName: "CMCMARKETS:GOLD", title: "Gold" },
                            { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                            { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
                        ],
                        showSymbolLogo: true,
                        colorTheme: "light",
                        isTransparent: false,
                        displayMode: "adaptive",
                        locale: "ja"
                    }
                }, '*');
            }
        };

        sendMessage();
        setTimeout(sendMessage, 500);
        setTimeout(sendMessage, 1500);
        setTimeout(sendMessage, 3000);
    };

    return (
        <div className="sticky top-16 z-40 shadow-md bg-white h-[78px] md:h-[46px] overflow-hidden">
            <iframe
                ref={iframeRef}
                src="/tradingview-widget.html"
                title="Ticker Tape"
                style={{ width: "100%", height: "78px", border: "none", display: "block" }}
                onLoad={handleLoad}
            />
        </div>
    );
};

export default TickerTape;
