import { lazy, Suspense } from "react";

import "./ProductPage.css";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

const LazyProductCards = lazy(() => import("../ProductCard/ProductCard.jsx"));

const ProductPage = () => {
  return (
    <div className="productPage">
      <Suspense fallback={<LoadingPage />}>
        <LazyProductCards />{" "}
      </Suspense>
    </div>
  );
};

export default ProductPage;
