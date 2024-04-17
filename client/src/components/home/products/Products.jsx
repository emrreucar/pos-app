import { useState } from "react";
import ProductItem from "./ProductItem";

import { GoPlus } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import AddProductModal from "./AddProductModal";
import { Link } from "react-router-dom";

const Products = ({ products, setProducts, categories, filtered, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-start gap-x-4 mb-6">
        <div
          className="border hover:shadow-lg cursor-pointer transition-all select-none rounded-md flex items-center justify-center gap-x-2 bg-[#a36361] hover:bg-[#a36361c9] duration-300 p-4"
          onClick={() => setIsAddModalOpen(true)}
        >
          <span className="uppercase text-white">Ürün Ekle</span>
          <GoPlus size={25} fill="white" />
        </div>
        <Link
          to={"/products"}
          className="border hover:shadow-lg cursor-pointer transition-all select-none rounded-md flex items-center justify-center gap-x-2 bg-[#d0ae6e] hover:bg-[#937d54e0] duration-300 p-4"
        >
          <span className="uppercase text-white">Ürün Düzenle</span>
          <CiEdit size={25} fill="white" />
        </Link>
      </div>

      <div className="grid grid-cols-card gap-4 mr-3">
        {filtered
          .filter((product) => product.title.toLowerCase().includes(search))
          .map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}

        <AddProductModal
          products={products}
          setProducts={setProducts}
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          categories={categories}
        />
      </div>
    </>
  );
};

export default Products;
