import type { CSSProperties, Dispatch, SetStateAction } from 'react'

const avatarColors = ['#3f88c5', '#ef8354', '#6a994e', '#a855f7', '#d97706']

const friends = [
  { name: 'pixel_pioneer', status: 'Building in Skyline Tycoon', color: '#3f88c5', online: true },
  { name: 'bricksmith', status: 'Exploring Brickbound', color: '#ef8354', online: true },
  { name: 'cloudmaker', status: 'Offline', color: '#94a3b8', online: false },
]

export function AvatarView({ accent, setAccent }: { accent: string; setAccent: Dispatch<SetStateAction<string>> }) {
  return (
    <main className="hub-main avatar-view">
      <div className="view-intro">
        <p className="eyebrow">AVATAR / BUILDER_01</p>
        <h1>Make your mark.</h1>
        <p className="intro">A few blocks, a little color, and a name people remember.</p>
      </div>
      <section className="avatar-editor">
        <div className="avatar-stage">
          <div className="avatar-shadow" />
          <div className="avatar-figure" style={{ '--avatar-accent': accent } as CSSProperties}>
            <span className="avatar-head" />
            <span className="avatar-body" />
            <span className="avatar-leg avatar-leg-left" />
            <span className="avatar-leg avatar-leg-right" />
          </div>
          <span className="stage-label">BUILDER_01</span>
        </div>
        <div className="editor-controls">
          <div className="control-heading">
            <p className="eyebrow">APPEARANCE</p>
            <span>Saved locally</span>
          </div>
          <h2>Primary color</h2>
          <div className="swatch-row" role="radiogroup" aria-label="Avatar primary color">
            {avatarColors.map((color) => (
              <button
                className={`color-swatch ${accent === color ? 'selected' : ''}`}
                key={color}
                type="button"
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} avatar color`}
                aria-pressed={accent === color}
                onClick={() => setAccent(color)}
              />
            ))}
          </div>
          <div className="outfit-row">
            <button className="outfit-option selected" type="button"><span>[ ]</span> Classic</button>
            <button className="outfit-option" type="button"><span>{'<'}</span> Builder</button>
            <button className="outfit-option" type="button"><span>*</span> Explorer</button>
          </div>
          <button className="primary-button save-button" type="button">Save avatar <span>&gt;</span></button>
        </div>
      </section>
    </main>
  )
}

export function FriendsView({ onPlay }: { onPlay: () => void }) {
  return (
    <main className="hub-main friends-view">
      <div className="view-intro friends-heading">
        <div>
          <p className="eyebrow">SOCIAL / FRIENDS</p>
          <h1>Build together.</h1>
          <p className="intro">Your crew is making things right now.</p>
        </div>
        <button className="primary-button" type="button" onClick={onPlay}>Join a world <span>&gt;</span></button>
      </div>
      <section className="friends-panel">
        <div className="friends-panel-heading">
          <h2>Friends online <span>2</span></h2>
          <button className="text-button" type="button">Add friend</button>
        </div>
        {friends.map((friend) => (
          <div className="friend-row" key={friend.name}>
            <span className="friend-avatar" style={{ backgroundColor: friend.color }}>{friend.name[0].toUpperCase()}</span>
            <span className="friend-copy">
              <strong>{friend.name}</strong>
              <span className={friend.online ? 'friend-status' : ''}>{friend.status}</span>
            </span>
            {friend.online && <button className="small-action" type="button" onClick={onPlay}>Join</button>}
          </div>
        ))}
      </section>
    </main>
  )
}
