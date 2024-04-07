import React from "react";
import Header from "../components/layout/Header";
import EditProductPageComp from "../components/home/products/EditProductPageComp";

const ProductsPage = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl text-center mb-4">Ürünlerim</h1>

        <EditProductPageComp />
      </div>
    </>
  );
};

export default ProductsPage;
