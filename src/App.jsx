import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LegalPage } from './pages/LegalPage';
import { AppLayout } from './components/app/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { OptimizerPage } from './pages/OptimizerPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { RiskCenterPage } from './pages/RiskCenterPage';
import { OrdersPage } from './pages/OrdersPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Legal, Privacy & Trust Center */}
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route path="/trust" element={<LegalPage />} />
        <Route path="/security" element={<LegalPage />} />

        {/* Core App Shell */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="optimizer" element={<OptimizerPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="risk" element={<RiskCenterPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
