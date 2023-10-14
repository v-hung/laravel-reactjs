import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import '../css/default.css'
import '../css/app.css'
import router from './router'
import MuiProvider from './components/MuiProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <MuiProvider>
      <RouterProvider router={router} />
    </MuiProvider>
    // <App />
  // </React.StrictMode>,
)