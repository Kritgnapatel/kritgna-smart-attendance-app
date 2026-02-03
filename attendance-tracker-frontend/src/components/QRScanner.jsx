import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

const QRScanner = ({ onScanSuccess }) => {
  const qrRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const containerId = "qr-reader";

    // 🔥 MOST IMPORTANT LINE — clear old DOM
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = "";
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const scanner = new Html5Qrcode(containerId);
    qrRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          try {
            await scanner.stop();
          } catch {}

          hasStartedRef.current = false;
          onScanSuccess(decodedText);
        }
      )
      .catch(() => {
        hasStartedRef.current = false;
      });

    return () => {
      if (qrRef.current) {
        try {
          qrRef.current.stop();
        } catch {}
        qrRef.current = null;
      }

      // 🔥 cleanup DOM again
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = "";
      }

      hasStartedRef.current = false;
    };
  }, [onScanSuccess]);

  return <div id="qr-reader" />;
};

export default QRScanner;
