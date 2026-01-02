function Ticker() {
  const messages = [
    'Seni seviyorum • Sen benim en güzel hikayemsin •',
    'Seni seviyorum • Her nefeste adını fısıldıyorum •',
    'Seni seviyorum • Kalbim yine sana koşuyor •',
    'Seni seviyorum • Sen benim sonsuzluğumsun •',
  ]

  return (
    <section className="ticker" aria-label="Sonsuz sevgi mesajı">
      <div className="ticker-track">
        {messages.map((msg, index) => (
          <span key={index}>{msg}</span>
        ))}
      </div>
    </section>
  )
}

export default Ticker

