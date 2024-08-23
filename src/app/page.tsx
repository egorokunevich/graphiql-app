import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MainContent from '@/components/Main/Main';

function MainPage() {
  return (
    <>
      <div className="container">
        <Header isAuthenticated={true} />
        <Header isAuthenticated={false} />
        <MainContent isAuthenticated={false} username={''} />
        <MainContent isAuthenticated={true} username={'Vasia'} />
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
