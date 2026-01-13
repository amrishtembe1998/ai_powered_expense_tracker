import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Outlet />
    </div>
  );
};

export default Layout;
