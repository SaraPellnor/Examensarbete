import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { ProductProvider } from "./Context/ProductContext";

import "./App.css";
import { UserProvider } from "./Context/UserContext";
import { OrderProvider } from "./Context/OrderContext";

function App() {
  return (
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
