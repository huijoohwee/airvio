import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Orchestrations from '@/pages/Orchestrations';
import Agents from '@/pages/Agents';
import Monitoring from '@/pages/Monitoring';
import Documents from '@/pages/Documents';
import Settings from '@/pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/orchestrations" element={<Orchestrations />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
