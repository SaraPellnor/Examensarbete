import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  // ----- To gets the routes work in app
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
