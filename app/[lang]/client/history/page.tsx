'use client';
import Link from '@/node_modules/next/link';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import useAuthRedirect from '@/src/hooks/useAuthRedirect';
import { useHistoryContext } from '@src/context/HistoryContext';

const HistoryPage = () => {
  const { loading } = useAuthRedirect();
  const { history, clearHistory } = useHistoryContext();
  const router = useRouter();

  // const handleRestore = (entry) => {
  //   if (entry.type === 'REST') {
  //     router.push(`/rest-client?method=${entry.method}&url=${entry.url}`);
  //   } else if (entry.type === 'GraphQL') {
  //     router.push(`/graphql-client?url=${entry.url}&sdlUrl=${entry.sdlUrl}`);
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4">Request History</Typography>
      <List>
        {history.length === 0 ? (
          <Typography variant="h6">
            You haven't executed any requests. Try the
            <Button color="primary" variant="contained" >REST Client</Button> 
            <Button color="primary" variant="contained">GraphiQL Client</Button>.
          </Typography>
        ) : (
          history.map((entry, index) => (
            // <ListItem button key={index} onClick={() => handleRestore(entry)}>
            <ListItemText
              key={index}
              primary={`${entry.type} Request - ${entry.method || 'POST'} ${entry.url}`}
              secondary={`Headers: ${JSON.stringify(entry.headers)}`}
            />
            // </ListItem>
          ))
        )}
        <Button variant="contained" onClick={clearHistory}>
          Clear History
        </Button>
      </List>
    </div>
  );
};

export default HistoryPage;
