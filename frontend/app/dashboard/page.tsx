export default function DashboardPage() {
  return (
    <div>


      <div className="page-heading">
        <h1>Dashboard</h1>
        <p>Real-time analytics across all monitored channels</p>
      </div>


      {/* analytics */}
      <div className="section">
        <div className="analytics-bar">

          <div className="analytics-segment">
            <span className="analytics-segment-value">
              13
            </span>
            <span className="analytics-segment-label">Channels Analyzed</span>
          </div>

          <div className="analytics-segment">
            <span className="analytics-segment-value">
              2,456
            </span>
            <span className="analytics-segment-label">Videos Transcribed</span>
          </div>

          <div className="analytics-segment">
            <span className="analytics-segment-value">
              7,123
            </span>
            <span className="analytics-segment-label">Comments Sampled</span>
          </div>

        </div>
      </div>


      <div className="grid-2 section">

        {/* trending narratives */}
        <div className="card">
          <p className="card-title">Trending Narratives</p>

          <div className="item-list">

            {trendingNarratives.map((item, i) => (
              <div className="item-row" key={i}>

                <span className="item-rank">#{i + 1}</span> {/* ranking # */}
                
                <div className="item-body"> {/* text content */}
                  <p className="item-title">{item.title}</p>
                  
                  <div className="item-meta"> {/* # of mentions */}
                    <span>{item.mentions} mentions</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* trending disucssions */}
        <div className="card">
          <p className="card-title">Trending Discussions</p>

          <div className="item-list">
            {trendingDiscussions.map((item, i) => (
              <div className="item-row" key={i}>

                <span className="item-rank">#{i + 1}</span>

                <div className="item-body">
                  <p className="item-title">{item.title}</p>

                  <div className="item-meta">
                    <span>{item.channel}</span>
                    <span>·</span>
                    <span>{item.comments} comments</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>


      <div className="grid-2 section">

        {/* ai topic detection */}
        <div className="card">
          <p className="card-title">AI Topic Detection</p>

          {/* each pill represents topic cluster grouped from transcript data.
              font size + padding scale w/ mention volume, so bigger pill = more mentions. */}
          <div className="topic-pill-wrap">
            {topicClusters.map((topic, i) => (
              <div
                className="topic-pill"
                key={i}
                style={{ fontSize: `${topic.fontSize}px`, ...topic.style }}
                title={`${topic.mentions} mentions`}
              >
                {topic.name}
                <span className="topic-pill-count">{topic.mentions}</span>
              </div>
            ))}
          </div>

        </div>

        {/* trending teams */}
        <div className="card">
          <p className="card-title">Most Discussed Teams</p>

          <div className="teams-list">
            {trendingTeams.map((team) => (
              <div className="teams-list-row" key={team.name}>

                {/* team name + count */}
                <div className="teams-list-header">
                  <span className="teams-list-name">{team.name}</span>
                  <span className="teams-list-count">{team.count}</span>
                </div>

                {/* progress bar */}
                <div className="progress-track">
                  <div
                    className={`progress-fill ${team.color}`}
                    style={{ width: team.pct }}
                  ></div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>


      {/* claims extracted */}
      <div className="section">

        <div className="section-heading">
          <h2 className="section-heading-title">Claims Extracted</h2>
        </div>
        
        {/* claim cards */}
        {claimsExt.map((claim, i) => (
          <div className="claim-row" key={i}>
            
            <p className="claim-text">
              {claim.text}
            </p>

            <div className="claim-footer">
              <span>{claim.source}</span>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}


// hardcoded mock data, replace with real API calls later

const trendingNarratives = [
  { title: "Inter remain in first as favorites to win Scudetto - Fans claim they're better without Inzahgi", mentions: "4.2K", volume: "85%" },
  { title: "Bellingham return sparks Real Madrid comeback", mentions: "3.8K", volume: "76%" },
  { title: "VAR controversy overshadows Liverpool win", mentions: "3.1K", volume: "62%" },
  { title: "Ten Hag future uncertain after derby defeat", mentions: "2.7K", volume: "54%" },
  { title: "Osimhen transfer saga drags into new month", mentions: "2.3K", volume: "46%" },
];

const trendingDiscussions = [
  { title: "Is Salah the best winger in Premier League history?", channel: "ESPN FC", comments: "6,210" },
  { title: "Athletico thrash Barcelona 4-0", channel: "The Athletic", comments: "5,440" },
  { title: "Should Southgate keep his job after Euros?", channel: "Sky Sports", comments: "4,900" },
  { title: "Top 5 transfers that could happen in January", channel: "Fabrizio Romano", comments: "3,310" },
  { title: "Real Madrid parts ways with Xabi Alonso", channel: "GOAL", comments: "2,780" },
];

const trendingTeams = [
  { name: "Real Madrid", count: "18.4K", pct: "92%", color: "green" },
  { name: "Macnhester City", count: "16.1K", pct: "80%", color: "blue" },
  { name: "Arsenal", count: "14.8K", pct: "74%", color: "red" },
  { name: "Bayern Munich", count: "13.2K", pct: "66%", color: "green" },
  { name: "Paris Saint-German", count: "11.9K", pct: "50%", color: "blue" },
];

const claimsExt = [
  {
    text: "Manchester United strong contenders to finish top 4, why UCL football could bolster their title hopes",
    source: "Some sports channel (Nov 12)",
  },
  {
    text: "Julian Alvarez transfer to Barcelona imminent, why his transfer could lead to UCL Success",
    source: "Some sports channel (Nov 10)",
  },
  {
    text: "Tottenham likely to be relegated? How their lackluster transfer spending has led to a weak squad",
    source: "Some sports channel (Nov 9)",
  },
];

// AI Topic Detection
// Each entry is a topic the LLM grouped from transcript segments.
// pct = bar width (relative to the highest-volume topic).
// rawCount is used to compute the total in the footnote.

const topicClusters = [
  { name: "Referee decisions & VAR", mentions: "3.2K", fontSize: 22, rawCount: 3200, style: { background: "#111", color: "#fff" } },
  { name: "Transfer window speculation", mentions: "2.8K", fontSize: 20, rawCount: 2800, style: { background: "#444", color: "#fff" } },
  { name: "Tactics & formation debates", mentions: "2.1K", fontSize: 18, rawCount: 2100, style: { background: "#777", color: "#fff" } },
  { name: "Injury & fitness updates", mentions: "1.7K", fontSize: 17, rawCount: 1700, style: { background: "#999", color: "#fff" } },
  { name: "Champions League previews", mentions: "1.4K", fontSize: 16, rawCount: 1400, style: { background: "#bbb", color: "#111" } },
  { name: "Youth & emerging talent", mentions: "0.9K", fontSize: 15, rawCount:  900, style: { background: "#ccc", color: "#111" } },
  { name: "Contract disputes", mentions: "0.7K", fontSize: 14, rawCount:  700, style: { background: "#ddd", color: "#111" } },
  { name: "Goalkeeping errors", mentions: "0.5K", fontSize: 14, rawCount:  500, style: { background: "#eee", color: "#111" } },
];