import React, { useEffect, useState } from 'react';

const WORKOUTS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;


function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', WORKOUTS_API);
    fetch(WORKOUTS_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Workouts</h2>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr><td colSpan="4" className="text-center">No workouts found.</td></tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{workout.name || '-'}</td>
                      <td>{workout.description || '-'}</td>
                      <td>{workout.duration || '-'}</td>
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

export default Workouts;
