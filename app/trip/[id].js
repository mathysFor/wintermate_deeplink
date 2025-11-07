"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TripPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const schemeUrl = `wintermate://trip/${id}`;
    const storeUrlIOS = 'https://apps.apple.com/app/idXXXXXXXXX';
    const storeUrlAndroid = 'https://play.google.com/store/apps/details?id=com.winteracademynew';

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    let fallbackTimer;
    const tryOpen = () => {
      const start = Date.now();
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = schemeUrl;
      document.body.appendChild(iframe);
      fallbackTimer = setTimeout(() => {
        const elapsed = Date.now() - start;
        if (elapsed < 1500) {
          if (isIOS) window.location.href = storeUrlIOS;
          else if (isAndroid) window.location.href = storeUrlAndroid;
        }
      }, 1000);
    };
    tryOpen();
    return () => clearTimeout(fallbackTimer);
  }, [id]);

  return (
    <main style={{minHeight:'100vh',background:'#0b0b0d',color:'#fff',fontFamily:'system-ui'}}>
      <div style={{maxWidth:720,margin:'0 auto',padding:'48px 24px'}}>
        <h1>Ouvrir la sortie</h1>
        <p>ID du trip : <code>{id}</code></p>
        <p>Si l’app ne s’ouvre pas automatiquement,
          <a style={{color:'#7ab7ff',marginLeft:8}} href={`wintermate://trip/${id}`}>clique ici</a>.
        </p>
      </div>
    </main>
  );
}
