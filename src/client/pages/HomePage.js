import React from 'react';

const Home = () => {
  return (
    <div>
      <div>I am home component very best</div>
      <button onClick={() => console.log('Hi')}>Button</button>
    </div>
  );
};

export default {
  component: Home
};