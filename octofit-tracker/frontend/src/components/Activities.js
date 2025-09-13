import React, { useEffect, useState } from 'react';

const ACTIVITIES_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;


function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', ACTIVITIES_API);
    fetch(ACTIVITIES_API)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Activities</h2>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="3" className="text-center">No activities found.</td></tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{activity.name || '-'}</td>
                      <td>{activity.description || '-'}</td>
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

export default Activities;
