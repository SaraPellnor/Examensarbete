import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import DetailPage from "../../Pages/DetailPage/DetailPage";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import OrderSuccess from "../../Pages/OrderSuccess/OrderSuccess";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import UserPage from "../../Pages/UserPage/UserPage";

// ----- Using the lazy loading function fron react to show loding icon wile getting data

const LazyOrderPage = lazy(() => import("../../Pages/OrderPage/OrderPage"));
const LazyCartDrawer = lazy(() => import("../../Pages/CartDrawer/CartDrawer"));

import "./Main.css";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import EditProducts from "../../Pages/EditProducts/EditProducts";

const Main = () => {
  // ----- Configuring routes for different pages

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/edit-products" element={<EditProducts />} />

        <Route
          path="/cart"
          element={
            // ----- Using the Suspens fallback to run the Spinner wile waiting

            <Suspense fallback={<LoadingPage />}>
              <LazyCartDrawer />
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
            <Suspense fallback={<LoadingPage />}>
              <LazyOrderPage />
            </Suspense>
          }
        />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/order-succsess" element={<OrderSuccess />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default Main;
