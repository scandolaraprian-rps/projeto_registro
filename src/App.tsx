/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EventPortal from './components/EventPortal';
import AuditPortal from './components/AuditPortal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'register' | 'verify'>('dashboard');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'register' && <EventPortal />}
      {activeTab === 'verify' && <AuditPortal />}
    </Layout>
  );
}

