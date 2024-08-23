import Link from 'next/link';

import './Main.css';

interface MainInterface {
  isAuthenticated: boolean;
  username: string;
}
const MainContent = ({ isAuthenticated, username }: MainInterface) => {
  return (
    <main className="main">
      <h1>{isAuthenticated ? `Welcome Back, ${username}!` : 'Welcome!'}</h1>
      {isAuthenticated && (
        <div>
          <Link className="main__link" href={'/rest-client'}>
            REST Client
          </Link>
          <Link className="main__link" href={'/graphiql-client'}>
            GraphiQL Client
          </Link>
          <Link className="main__link" href={'/history'}>
            History
          </Link>
        </div>
      )}
    </main>
  );
};

export default MainContent;
