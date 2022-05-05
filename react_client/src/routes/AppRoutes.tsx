import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Survey from '../pages/Survey';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/survey" element={<Survey />} />
      <Route path="*" element={<Navigate to="/survey" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
