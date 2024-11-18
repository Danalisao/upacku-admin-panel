import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Clients } from './pages/Clients';
import { Partners } from './pages/Partners';
import { Requests } from './pages/Requests';
import { Offers } from './pages/Offers';
import { Finance } from './pages/Finance';
import { Vouchers } from './pages/Vouchers';
import { Features } from './pages/Features';
import { Support } from './pages/Support';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Sidebar />
    <div className="flex-1">
      <Header />
      <main className="p-6">
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <AppLayout>
              <Orders />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/clients" element={
          <ProtectedRoute>
            <AppLayout>
              <Clients />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/partners" element={
          <ProtectedRoute>
            <AppLayout>
              <Partners />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/requests" element={
          <ProtectedRoute>
            <AppLayout>
              <Requests />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/offers" element={
          <ProtectedRoute>
            <AppLayout>
              <Offers />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/finance" element={
          <ProtectedRoute>
            <AppLayout>
              <Finance />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/vouchers" element={
          <ProtectedRoute>
            <AppLayout>
              <Vouchers />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/features" element={
          <ProtectedRoute>
            <AppLayout>
              <Features />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute>
            <AppLayout>
              <Support />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;