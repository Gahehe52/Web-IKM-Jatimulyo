import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    // Dibuat mirip dengan background melengkung dari style.css asli Anda
    <div className="flex items-center justify-center min-h-screen bg-light">
      {/* Background SVG ini diambil dari style.css Anda
        Ini adalah cara Tailwind untuk menambahkan background-image
      */}
      <style>{`
        body {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><path d='M50 100 Q150 50 300 120 T600 140 Q700 160 780 100' fill='none' stroke='%23aaa' stroke-width='0.8' opacity='0.35'/><path d='M0 250 Q200 200 400 260 T800 280' fill='none' stroke='%23bbb' stroke-width='1' opacity='0.3'/><path d='M100 400 Q250 500 500 380 T900 420' fill='none' stroke='%23999' stroke-width='1' opacity='0.25'/><path d='M0 500 Q100 550 250 480 T650 500 Q750 520 850 460' fill='none' stroke='%23777' stroke-width='0.8' opacity='0.25'/><path d='M700 0 Q600 100 650 250 T500 450 Q400 550 300 600' fill='none' stroke='%23aaa' stroke-width='0.7' opacity='0.2'/><path d='M150 0 Q200 150 400 200 T700 250 Q750 280 800 400' fill='none' stroke='%23999' stroke-width='0.7' opacity='0.25'/><path d='M0 100 Q120 200 60 400 Q40 500 200 600' fill='none' stroke='%23888' stroke-width='0.8' opacity='0.2'/></svg>");
          background-repeat: no-repeat;
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
        }
      `}</style>
      <Outlet />
    </div>
  );
};

export default AuthLayout;