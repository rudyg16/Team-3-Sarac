export default function HomePage() {
  return (
    <div>

      <div className="page-heading">
        <h1>Home</h1>
        <p>Your soccer intelligence feed</p>
      </div>


      <div className="home-top-row section">

        {/* top trending match (left) */}
        <div className="match-card">

          {/* live status */}
          <div className="match-card-top">
            <div>
              <span className="live-dot">LIVE</span>
            </div>
          </div>

          {/* 2 teams + current score */}
          <div className="match-teams">
            <div className="match-team">
              <span className="team-name">Arsenal</span>
            </div>

            <span className="match-score">2 — 1</span>

            <div className="match-team">
              <span className="team-name">Chelsea</span>
            </div>
          </div>

          {/* # mentions + channels */}
          <div className="match-footer">
            <span>12.4K mentions</span>
            <span>4 channels</span>
          </div>

        </div>

        {/* trending searches (right) */}
        <div className="card">
          <p className="card-title">Trending Searches</p>

          <div className="item-list">

            {trendingSearches.map((item, i) => (
              
              <div className="item-row" key={i}>
                <span className="item-rank">#{i + 1}</span> {/* ranking # */}

                <div className="item-body">
                  <p className="item-title">{item.query}</p> {/* text content */}

                  <div className="item-meta">
                    <span>{item.volume} searches</span>  {/* # of searches */}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>


      {/* fan sentiment */}
      <div className="section">
        <div className="card">
          <p className="card-title">Fan Sentiment — Arsenal vs Chelsea</p>

          {/* sentiment & and desc. */}
          <div className="sentiment-score">
            <span className="sentiment-score-value">72%</span>
            <span className="sentiment-score-label">positive sentiment</span>
          </div>

          {/* positive sentiment bar */}
          <div className="progress-wrap">
            <div className="progress-header">
              <span>Positive</span>
              <span>72%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill green" style={{ width: "72%" }} />
            </div>
          </div>

          {/* neutral sentiment bar */}
          <div className="progress-wrap">
            <div className="progress-header">
              <span>Neutral</span>
              <span>18%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill blue" style={{ width: "18%" }} />
            </div>
          </div>

          {/* negative sentiment bar */}
          <div className="progress-wrap">
            <div className="progress-header">
              <span>Negative</span>
              <span>10%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill red" style={{ width: "10%" }} />
            </div>
          </div>

          {/* footer */}
          <p className="sentiment-footnote">
            Based on 3,841 comments sampled across 4 YouTube channels
          </p>
        </div>
      </div>

    </div>
  );
}


// mock data

const trendingSearches = [
  { query: "Arsenal vs Chelsea highlights", volume: "48K", pct: "95%" },
  { query: "Haaland injury update", volume: "31K", pct: "62%" },
  { query: "Champions League results tonight", volume: "27K", pct: "54%" },
];