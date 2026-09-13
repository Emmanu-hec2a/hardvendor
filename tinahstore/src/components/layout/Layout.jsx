import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AgeVerification from '../ui/AgeVerification.jsx';

export default function Layout() {
  return (
    <>
      <AgeVerification />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
