import './App.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './utils/routes';
import { Provider } from 'react-redux';
import { store } from './utils/store/store';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
