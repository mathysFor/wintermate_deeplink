'use client';
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const { id } = useParams();
  const cancelledRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const schemeUrl = `wintermate://profile/${id}`;
    const storeUrlIOS =
      'https://apps.apple.com/app/idXXXXXXXXX'; // ← ton vrai ID App Store
    const storeUrlAndroid =
      'https://play.google.com/store/apps/details?id=com.winteracademynew';

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

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

    // Tente d’ouvrir l’app
    try {
      window.location.href = schemeUrl;
    } catch {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = schemeUrl;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 2000);
    }

    // Fallback Store si l’app ne s’est pas ouverte
    timerRef.current = setTimeout(() => {
      if (!cancelledRef.current) {
        window.location.href = isIOS ? storeUrlIOS : storeUrlAndroid;
      }
    }, 2000);

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
        <h1>Ouverture du profil…</h1>
        <p>
          Si l’app ne s’ouvre pas,&nbsp;
          <a href={`wintermate://profile/${id}`} style={{color:'#7ab7ff'}}>
            appuie ici
          </a>.
        </p>
      </div>
    </main>
  );
}