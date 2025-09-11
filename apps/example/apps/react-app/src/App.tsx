import React from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

function App() {
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState(null);

  // Example using lodash from catalog
  const debouncedIncrement = React.useMemo(
    () => debounce(() => setCount(c => c + 1), 300),
    []
  );

  // Example using axios from catalog
  const fetchData = React.useCallback(async () => {
    try {
      const response = await axios.get('https://api.github.com/repos/houko/pnpm-catalog-updates');
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>🚀 React App Example</h1>
      <p>This app demonstrates using catalog dependencies:</p>
      
      <div style={{ margin: '1rem 0' }}>
        <h3>Counter with Lodash Debounce:</h3>
        <p>Count: {count}</p>
        <button onClick={debouncedIncrement}>
          Increment (debounced)
        </button>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <h3>GitHub API Data with Axios:</h3>
        {data ? (
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9em', color: '#666' }}>
        <h4>Dependencies from Catalog:</h4>
        <ul>
          <li><code>react</code> - UI framework</li>
          <li><code>lodash</code> - Utility library</li>
          <li><code>axios</code> - HTTP client</li>
        </ul>
        <p>
          Run <code>pnpm dlx pnpm-catalog-updates check</code> to see available updates!
        </p>
      </div>
    </div>
  );
}

export default App;