import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router'

const App = () => {
  return(
    <RouterProvider router={router}>
      <div>          
      </div>
    </RouterProvider>
  );
};
export default App;