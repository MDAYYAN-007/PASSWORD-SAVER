import React from 'react';

const Header = () => {
  return (
    <header className='my-6 w-full flex flex-col items-center mt-24'>
      <h1 className='text-4xl font-bold font-mono mb-2 text-gray-200'>
        <span className='text-gold'>&lt;</span>Pass<span className='text-gold'>Keeper/&gt;</span>
      </h1>
      <p className='text-lg text-gray-400'>Your secure password storage solution.</p>
    </header>
  );
};

export default Header;
