import React, { useEffect, useState } from 'react';

const LEADERBOARD_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;


function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', LEADERBOARD_API);
    fetch(LEADERBOARD_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Leaderboard</h2>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaders.length === 0 ? (
                  <tr><td colSpan="3" className="text-center">No leaderboard data found.</td></tr>
                ) : (
                  leaders.map((leader, idx) => (
                    <tr key={leader.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{leader.name || leader.username || '-'}</td>
                      <td>{leader.score || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
