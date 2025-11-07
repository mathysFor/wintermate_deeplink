'use client';
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

export default function TripPage() {
  const { id } = useParams();
  const cancelledRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const schemeUrl = `wintermate://trip/${id}`;
    const storeUrlIOS =
      'https://apps.apple.com/app/idXXXXXXXXX'; // ← ton vrai ID App Store
    const storeUrlAndroid =
      'https://play.google.com/store/apps/details?id=com.winteracademynew';

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    // 1) Si la page perd la visibilité (app ouverte), on annule le fallback
    const cancelFallback = () => {
      cancelledRef.current = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    const onVis = () => {
      if (document.visibilityState === 'hidden') cancelFallback();
    };
    window.addEventListener('visibilitychange', onVis, { passive: true });
    window.addEventListener('pagehide', cancelFallback, { passive: true });
    window.addEventListener('blur', cancelFallback, { passive: true });

    // 2) Tente d’ouvrir l’app
    // (href marche mieux iOS15+ ; iframe pour certains Android WebView)
    try {
      window.location.href = schemeUrl;
    } catch {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = schemeUrl;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 2000);
    }

    // 3) Fallback Store seulement si la page est restée visible
    timerRef.current = setTimeout(() => {
      if (!cancelledRef.current) {
        window.location.href = isIOS ? storeUrlIOS : storeUrlAndroid;
      }
    }, 2000); // 1.5s est un bon compromis

    return () => {
      window.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pagehide', cancelFallback);
      window.removeEventListener('blur', cancelFallback);
      cancelFallback();
    };
  }, [id]);

  return (
    <main style={{minHeight:'100vh',background:'#0b0b0d',color:'#fff',fontFamily:'system-ui'}}>
      <div style={{maxWidth:720,margin:'0 auto',padding:'48px 24px'}}>
        <h1>Ouverture de la sortie…</h1>
        <p>Si l’app ne s’ouvre pas, <a href={`wintermate://trip/${id}`} style={{color:'#7ab7ff'}}>appuie ici</a>.</p>
      </div>
    </main>
  );
}