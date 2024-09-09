'use client';
import React from 'react';

import useAuthRedirect from '@/src/hooks/useAuthRedirect';

const History = () => {
  const { loading } = useAuthRedirect();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>History page</div>;
};

export default History;
