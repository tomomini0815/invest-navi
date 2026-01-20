import { useRef, useEffect } from "react";

interface TradingViewWidgetIframeProps {
    scriptSrc: string;
    config: any;
    title: string;
    height?: string | number;
}

export const TradingViewWidgetIframe = ({ scriptSrc, config, title, height = "100%" }: TradingViewWidgetIframeProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleLoad = () => {
        const sendMessage = () => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage({
                    type: 'INIT_WIDGET',
                    scriptSrc,
                    config
                }, '*');
            }
        };

        // 即時送信
        sendMessage();

        // 遅延送信（Iframeのロード待ち対策）
        setTimeout(sendMessage, 500);
        setTimeout(sendMessage, 1500);
        setTimeout(sendMessage, 3000);
    };

    return (
        <iframe
            key={JSON.stringify(config) + scriptSrc}
            ref={iframeRef}
            src="/tradingview-widget.html"
            title={title}
            style={{ width: "100%", height: height, border: "none", display: "block" }}
            onLoad={handleLoad}
        />
    );
};
