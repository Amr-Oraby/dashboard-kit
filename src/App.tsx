import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
