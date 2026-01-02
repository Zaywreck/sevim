const poems = [
  {
    id: 1,
    author: 'Mert 💌',
    handle: '@sonsuzvurgun',
    time: 'Şimdi',
    tag: '#KalpGünlüğü',
    avatar: 'M',
    lines: [
      'Durgunum bir tek sana vurgunum',
      'Yollarında yürür dururum',
      'Kollarında bi\'hoş olurum',
      'Eksikliğinde ben ne\'olurum',
      'Varlığın benim huzurum',
      'Durgunum bir tek sana vurgunum',
    ],
    authorName: 'Mert Gülle',
    likes: '1.2K',
    comments: '24',
    reposts: '56',
  },
  {
    id: 2,
    author: 'H. Nihal Atsız',
    handle: '@ateştenmısralar',
    time: '5 dk',
    tag: '#AşkınYazdıkları',
    avatar: 'H',
    lines: [
      'Ey sen ki kül ettin beni onmaz yakışınla,',
      'Ey sen ki gönüller tutuşur her bakışınla!…',
      'Hançer gibi keskin ve çiçekler gibi ince',
      'Çehren bana uğrunda ölüm hazzı verince',
      'Gönlümdeki azgın devi rüzgarlara attım;',
      'Gözlerle günah işlemenin zevkinin tattım.',
      'Gözler ki birer parçasıdır sende İlah\'ın,',
      'Gözler ki senin en katı zulmün ve silahın,',
      'Vur şanlı silahınla gönül mülkü düzelsin;',
      'Sen öldürüyorken de, vururken de güzelsin!',
    ],
    authorName: 'H. Nihal Atsız',
    likes: '980',
    comments: '18',
    reposts: '33',
  },
  {
    id: 3,
    author: 'S. Toklu',
    handle: '@winstonslenderblue',
    time: 'Şimdi',
    tag: '#AşkınYazdıkları',
    avatar: 'S',
    lines: [
      'Dilerdim ki zamandan',
      'Dilerdim ki yaşamdan',
      'Dilerdim ki insandan, seni',
      'Hep seni',
      'Dilerdim ki yağmurdan',
      'Dilerdim ki rüzgardan, seni',
      'Hep seni',
      'Dilerdim ki barıştan, biraz huzur',
      'Can evimden vurdun',
    ],
    authorName: 'S. Toklu',
    likes: '980',
    comments: '18',
    reposts: '33',
  },
  {
    id: 4,
    author: 'S. Toklu',
    handle: '@winstonslenderblue',
    time: 'Şimdi',
    tag: '#AşkınYazdıkları',
    avatar: 'S',
    lines: [
      'Senin özelliklerin sende güzel',
      'Senin gönlün bana özel',
      'Bana yakışmaz afilli lafların',
      'Senin bakışların bir başka güzel',
    ],
    authorName: 'S. Toklu',
    likes: '980',
    comments: '18',
    reposts: '33',
  },
]

function Feed() {
  return (
    <main className="feed" aria-live="polite">
      {poems.map((poem) => (
        <article key={poem.id} className="poem-card" aria-label={`Paylaşım ${poem.id}`}>
          <div className="post-top">
            <div className="post-author">
              <div className="post-avatar">{poem.avatar}</div>
              <div>
                <span className="name">{poem.author}</span>
                <span className="meta">
                  {poem.handle} • {poem.time}
                </span>
              </div>
            </div>
            <span className="tag">{poem.tag}</span>
          </div>
          <div className="poem-body">
            {poem.lines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <p className="poem-author">— {poem.authorName}</p>
          </div>
          <div className="post-actions">
            <span>💗 {poem.likes}</span>
            <span>💬 {poem.comments}</span>
            <span>↻ {poem.reposts}</span>
          </div>
        </article>
      ))}
    </main>
  )
}

export default Feed

