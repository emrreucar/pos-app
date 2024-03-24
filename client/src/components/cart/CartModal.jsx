import { Modal } from "antd";
import React from "react";
import CreateBill from "./CreateBill";

const CartModal = ({ handleCancel, isModalOpen }) => {
  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <CreateBill />
    </Modal>
  );
};

export default CartModal;
