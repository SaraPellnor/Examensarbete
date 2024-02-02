// ----- Importing necessary React components and libraries
import { lazy, Suspense } from "react";
import "./ProductPage.css";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

// ----- Lazily importing the ProductCard component for better code splitting
const LazyProductCards = lazy(() => import("../../Components/ProductCard/ProductCard.jsx"));

// ----- Functional component representing the ProductPage
const ProductPage = () => {
  return (
    <div className="productPage">
       <img src="../../../src/assets/hero.png" alt="Logo" />
      <Suspense fallback={<LoadingPage />}>
        <LazyProductCards />
      </Suspense>
    </div>
  );
};

// ----- Exporting the ProductPage component as the default export
export default ProductPage;
