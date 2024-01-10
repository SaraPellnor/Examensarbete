import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { ProductProvider } from "./Context/ProductContext";

import "./App.css";
import { UserProvider } from "./Context/UserContext";
import { OrderProvider } from "./Context/OrderContext";

function App() {
  return (
    <OrderProvider>
      <UserProvider>
        <ProductProvider>
          <Header />
          <Main />
          <Footer />
        </ProductProvider>
      </UserProvider>
    </OrderProvider>
  );
}

export default App;
