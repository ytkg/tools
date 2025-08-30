import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Layout from './Layout';

const allowed = new Set(['en', 'ja']);

const LangGuard: React.FC = () => {
  const { lang } = useParams();
  const location = useLocation();

  const current = (lang ?? '').toLowerCase();
  if (!allowed.has(current)) {
    const newPath = location.pathname.replace(/^\/[\w-]+/, '/ja') || '/ja';
    return <Navigate to={newPath} replace />;
  }

  return <Layout />;
};

export default LangGuard;

