import React from 'react';
import Head from 'next/head';
import CurrencySwapForm from '../components/CurrencySwapForm';
import '../styles/globals.css';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Problem 2</title>
        <meta name='description' content='Currency Swap Form' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <p className='text-2xl text-center text-cyan-500 pt-20 pb-8'>Problem 2 - 99tech</p>
        <CurrencySwapForm />
        <p className='text-base text-center text-cyan-500 pt-44'>Created by Huynh Van Phuot - 11/8/2024</p>
      </main>
    </div>
  );
};

export default Home;
