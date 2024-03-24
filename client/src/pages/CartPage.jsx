import React, { useState } from "react";
import Header from "../components/layout/Header";
import CartTable from "../components/cart/CartTable";
import CartModal from "../components/cart/CartModal";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <CartTable showModal={showModal} />
      <CartModal handleCancel={handleCancel} isModalOpen={isModalOpen} />
    </>
  );
};

export default CartPage;
