import React from 'react';
import Routes from './routes';
import { AuthProvider } from './context/auth';
import { PostProvider } from './context/post';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PostProvider>
          <Routes />
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;