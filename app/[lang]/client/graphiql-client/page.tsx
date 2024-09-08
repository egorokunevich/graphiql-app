'use client';
import React from 'react';

import useAuthRedirect from '@/src/hooks/useAuthRedirect';

const GraphiQLClient = () => {
  const { loading } = useAuthRedirect();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Graphiql Client page</div>;
};

export default GraphiQLClient;
