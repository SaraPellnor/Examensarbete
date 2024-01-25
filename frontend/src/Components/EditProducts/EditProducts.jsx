import { lazy, Suspense } from "react";

import "./EditProducts.css";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";

const LazyEditProductCards = lazy(() => import("../EditProductCard/EditProductCard.jsx"));

const EditProducts = () => {
  return (
    <div className="editProducts">
      <Suspense fallback={<LoadingPage />}>
        <LazyEditProductCards />
      </Suspense>
    </div>
  );
};

export default EditProducts;
