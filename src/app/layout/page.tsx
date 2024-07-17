// ClientButton.js
'use client';

import { signOut } from 'next-auth/react';

const ClientButton = () => {
  return (
    <button onClick={() => signOut()} >
      Cerrar Sesión
    </button>
  );
};

export default ClientButton;
