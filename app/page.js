export default function Home() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0b0b0d',color:'#fff',fontFamily:'system-ui'}}>
      <div style={{textAlign:'center'}}>
        <h1>WinterMate Deeplink</h1>
        <p>Utilisez des URLs du type <code>https://app.wintermate.fr/trip/&lt;id&gt;</code></p>
      </div>
    </main>
  );
}
