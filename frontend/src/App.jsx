import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { ProductProvider } from "./Context/ProductContext";
import { UserProvider } from "./Context/UserContext";
import { OrderProvider } from "./Context/OrderContext";

import "./App.css";

function App() {
  return (


    // ----- Wrapping the entire application with UserProvider, OrderProvider, and ProductProvider
    
    <UserProvider>
      <OrderProvider>
        <ProductProvider>
          <Header />
          <Main />
          <Footer />
        </ProductProvider>
      </OrderProvider>
    </UserProvider>
  );
}

export default App;
