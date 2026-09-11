import { useRef, useState } from 'react'
import { createDefaultDataModel } from './datamodel/createDefaultDataModel'
import { PlayWorld } from './engine/components/PlayWorld'

export default function App() {
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const dataModel = useRef(createDefaultDataModel())

  if (playing) return <PlayWorld worldName="RIVALS" onExit={() => setPlaying(false)} />

  return (
    <div className="roblox-shell">
      <header className="roblox-topbar">
        <button className="menu-button" type="button" aria-label="Open navigation">☰</button>
        <button className="roblox-logo" type="button" onClick={() => setPlaying(false)} aria-label="OpenBlox home"><span className="logo-hole" /><strong>openblox</strong></button>
        <label className="search-box"><span>⌕</span><input aria-label="Search" placeholder="Search" /></label>
        <nav className="account-nav"><button type="button">Create</button><button type="button">Robux <b>0</b></button><button className="mini-avatar" type="button" aria-label="Account">B</button></nav>
      </header>
      <div className="roblox-layout">
        <aside className="roblox-sidebar">
          <button className="side-link active" type="button"><span>⌂</span>Home</button>
          <button className="side-link" type="button"><span>♧</span>Discover</button>
          <button className="side-link" type="button"><span>♙</span>Avatar</button>
          <button className="side-link" type="button"><span>☷</span>Friends <i>2</i></button>
          <div className="sidebar-rule" /><p className="sidebar-label">Favorites</p>
          <button className="favorite-game" type="button" onClick={() => setPlaying(true)}><span className="rivals-mini">R</span><span>RIVALS</span></button>
          <div className="sidebar-bottom"><button className="side-link" type="button"><span>⚙</span>Settings</button><small>OpenBlox alpha</small></div>
        </aside>
        <main className="roblox-content">
          <div className="breadcrumb">Home <span>/</span> Experiences</div>
          <section className="rivals-hero">
            <div className="rivals-art" aria-label="Rivals action preview"><div className="art-grid" /><div className="art-glow art-glow-red" /><div className="art-glow art-glow-blue" /><div className="art-player art-player-left"><span /></div><div className="art-player art-player-right"><span /></div><div className="art-title">RIVALS</div><div className="art-subtitle">NO SECOND CHANCES</div></div>
            <div className="rivals-info"><div className="game-heading-row"><div className="rivals-icon">R</div><div><p className="game-overline">[ OPENBLOX ]</p><h1>RIVALS</h1><p className="byline">Noshiny Games <span>✓</span></p></div></div><p className="game-description">Challenge other players in intense first-person shooter duels. First to 5 wins. Earn keys, unlock weapons, and prove you are the better rival.</p><button className="roblox-play-button" type="button" onClick={() => setPlaying(true)}><span>▶</span> Play</button><div className="game-stats"><span><strong>8.4K</strong><small>Playing</small></span><span><strong>92%</strong><small>Thumbs up</small></span><span><strong>9.2M</strong><small>Visits</small></span></div></div>
          </section>
          <section className="experience-section"><div className="section-title-row"><h2>About this experience</h2><span>Updated today</span></div><p className="about-copy">Welcome to RIVALS, the most intense first person shooter on OpenBlox. Duel in 1v1 to 5v5 matches, master your aim, and climb the win streak leaderboard.</p><div className="tag-row"><span>FPS</span><span>Competitive</span><span>Multiplayer</span><span>Action</span></div></section>
          <section className="experience-section servers-section"><div className="section-title-row"><h2>Servers</h2><span>Live</span></div><div className="server-row"><span className="server-green" /><strong>RIVALS - Public Arena</strong><span className="server-players">2 / 10 players</span><button className="server-join" type="button" onClick={() => setPlaying(true)}>Join</button></div></section>
          <div className="like-row"><button className={liked ? 'like-button liked' : 'like-button'} type="button" onClick={() => setLiked(!liked)}>{liked ? '♥' : '♡'} Like this experience</button><span>Made for players who never miss twice.</span></div>
        </main>
      </div>
    </div>
  )
}
