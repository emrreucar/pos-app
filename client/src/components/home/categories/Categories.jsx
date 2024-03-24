import { GoPlus } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  const handleCategoryClick = (title) => {
    setCategoryTitle(title);
  };

  return (
    <ul className="flex md:flex-col flex-row text-center gap-4 text-lg">
      {categories.map((item) => (
        <li
          key={item._id}
          className={`category__button ${
            categoryTitle === item.title && "!bg-[#b4817f]"
          }`}
          onClick={() => handleCategoryClick(item.title)}
        >
          <span> {item.title} </span>
        </li>
      ))}

      <div className="flex items-center justify-center gap-x-4">
        <li
          className="bg-[#a36361] hover:bg-[#a36361c9] duration-300 flex items-center justify-center rounded-md cursor-pointer p-4"
          onClick={() => setIsAddModalOpen(true)}
        >
          <GoPlus size={25} fill="white" />
        </li>

        <li
          className="bg-[#eecc8c] hover:bg-[#eecc8ce0] duration-300 flex items-center justify-center rounded-lg cursor-pointer p-4"
          onClick={() => setIsEditModalOpen(true)}
        >
          <CiEdit size={25} fill="white" />
        </li>
      </div>

      <AddCategoryModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />

      <EditCategoryModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
