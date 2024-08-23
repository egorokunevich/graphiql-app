import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MainContent from '@/components/Main/Main';

function MainPage() {
  return (
    <>
      <div className="container">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
