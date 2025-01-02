import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home, LoginPage, RegisterPage, Logout,NotFoundPage, Dashboard} from '@/pages';
import { ProtectedRoute, NotAuthenticatedRoute} from '@/hooks';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
      
        <Route path="/login" element={
          <NotAuthenticatedRoute><LoginPage/></NotAuthenticatedRoute>
        } />
        <Route path="/register" element={
          <NotAuthenticatedRoute><RegisterPage/></NotAuthenticatedRoute>
        } />
        <Route path="/logout" element={
          <ProtectedRoute><Logout/></ProtectedRoute>
        } />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
