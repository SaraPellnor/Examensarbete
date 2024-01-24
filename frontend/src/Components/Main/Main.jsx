import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "../ProductPage/ProductPage";
import DetailPage from "../DetailPage/DetailPage";
import LoginPage from "../LoginPage/LoginPage";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import ErrorPage from "../ErrorPage/ErrorPage";
import UserPage from "../UserPage/UserPage";

// ----- Using the lazy loading function fron react to show loding icon wile getting data

const LazyOrderPage = lazy(() => import("../OrderPage/OrderPage"));
const LazyCartDrawer = lazy(() => import("../CartDrawer/CartDrawer"));

import "./Main.css";
import LoadingPage from "../LoadingPage/LoadingPage";

const Main = () => {
  // ----- Configuring routes for different pages

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<ProductPage />} />
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
