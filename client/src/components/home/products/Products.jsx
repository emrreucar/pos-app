import { useState } from "react";
import ProductItem from "./ProductItem";

import { GoPlus } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import AddProductModal from "./AddProductModal";
import { Link } from "react-router-dom";

const Products = ({ products, setProducts, categories, filtered, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-card gap-4 mr-3">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}

      <div className="flex items-center justify-center gap-x-4">
        <div
          className="border hover:shadow-lg cursor-pointer transition-all select-none rounded-md flex items-center justify-center bg-[#a36361] hover:bg-[#a36361c9] duration-300 p-4"
          onClick={() => setIsAddModalOpen(true)}
        >
          <GoPlus size={25} fill="white" />
        </div>
        <Link
          to={"/products"}
          className="border hover:shadow-lg cursor-pointer transition-all select-none rounded-md flex items-center justify-center bg-[#eecc8c] hover:bg-[#eecc8ce0] duration-300 p-4"
        >
          <CiEdit size={25} fill="white" />
        </Link>
      </div>

      <AddProductModal
        products={products}
        setProducts={setProducts}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
      />
    </div>
  );
};

export default Products;
