'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function TripPage() {
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const schemeUrl = `wintermate://trip/${id}`;
    const storeUrlIOS = 'https://apps.apple.com/app/idXXXXXXXXX';
    const storeUrlAndroid = 'https://play.google.com/store/apps/details?id=com.winteracademynew';

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    const start = Date.now();
    window.location.href = schemeUrl;
    const t = setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.location.href = isIOS ? storeUrlIOS : storeUrlAndroid;
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [id]);

  return (
    <main style={{minHeight:'100vh',background:'#0b0b0d',color:'#fff',fontFamily:'system-ui'}}>
      <div style={{maxWidth:720,margin:'0 auto',padding:'48px 24px'}}>
        <h1>Ouvrir la sortie</h1>
        <p>ID du trip : <code>{id}</code></p>
        <p>Si l’app ne s’ouvre pas, <a href={`wintermate://trip/${id}`} style={{color:'#7ab7ff'}}>tente ici</a>.</p>
      </div>
    </main>
  );
}