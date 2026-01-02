import { useEffect, useRef } from 'react'
import Snowfall from 'react-snowfall'
import Hero from './components/Hero'
import Feed from './components/Feed'
import Ticker from './components/Ticker'

function App() {
  const heartsFieldRef = useRef(null)

  useEffect(() => {
    const heartsField = heartsFieldRef.current
    if (!heartsField) return

    const spawnHeart = () => {
      const heart = document.createElement('div')
      heart.className = 'heart'
      const left = Math.random() * 100
      const size = 16 + Math.random() * 12
      const duration = 7 + Math.random() * 4
      const colors = ['#ff7ab6', '#ff9de2', '#ff6cab', '#ffb3d9']
      const color = colors[Math.floor(Math.random() * colors.length)]

      heart.style.setProperty('--left', `${left}%`)
      heart.style.setProperty('--size', `${size}px`)
      heart.style.setProperty('--duration', `${duration}s`)
      heart.style.setProperty('--color', color)

      heartsField.appendChild(heart)

      setTimeout(() => {
        heart.remove()
      }, duration * 1000)
    }

    const interval = setInterval(() => {
      for (let i = 0; i < 2; i++) {
        setTimeout(spawnHeart, i * 400)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Snowfall
        snowflakeCount={100}
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        radius={[0.5, 2]}
        color="#ffffff"
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div className="background-glow" aria-hidden="true"></div>
      <div className="hearts-field" ref={heartsFieldRef} aria-hidden="true"></div>

      <div className="app-shell">
        <Hero />
        <Feed />
        <Ticker />
      </div>
    </>
  )
}

export default App

