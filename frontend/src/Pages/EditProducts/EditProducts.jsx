// ----- Importing necessary React components and libraries
import { lazy, Suspense } from "react";
import "./EditProducts.css";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage.jsx";

// ---- Lazily importing the EditProductCard component for better code splitting
const LazyEditProductCards = lazy(() =>
  import("../../Components/EditProductCard/EditProductCard.jsx")
);

// ----- Functional component representing the EditProducts page
const EditProducts = () => {
  return (
    <div className="editProducts">
      <Suspense fallback={<LoadingPage />}>
        <LazyEditProductCards />
      </Suspense>
    </div>
  );
};

// ----- Exporting the EditProducts component as the default export
export default EditProducts;
