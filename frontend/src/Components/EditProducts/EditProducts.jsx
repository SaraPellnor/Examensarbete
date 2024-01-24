import { lazy, Suspense } from "react";

import "./EditProducts.css";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

const LazyProductCards = lazy(() => import("../ProductCard/ProductCard.jsx"));

const EditProducts = () => {
  return (
    <div className="editProducts">
      <Suspense fallback={<LoadingPage />}>
        <LazyProductCards />
      </Suspense>
    </div>
  );
};

export default EditProducts;
