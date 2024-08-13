import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex items-center text-white h-16 justify-between px-3 fixed top-0 w-full z-20'>
      <h1 className='text-2xl font-semibold'>
        <a href="/">
        <span className='text-gold'>&lt;</span>Pass<span className='text-gold'>Keeper/&gt;</span>
        </a>
      </h1>
      <a href="https://www.instagram.com/mddayyan007/" target='_blank' rel="noopener noreferrer">
        <button className='bg-gold hover:bg-gold-dark p-2 border border-transparent rounded-full flex items-center text-black transition duration-300'>
          <i className="fab fa-instagram mr-2"></i>Follow
        </button>
      </a>
    </nav>
  );
};

export default Navbar;
