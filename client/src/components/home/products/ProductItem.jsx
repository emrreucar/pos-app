import { message } from "antd";
import { addProduct } from "../../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("Ürün başarıyla eklendi");
  };

  return (
    <div
      key={item._id}
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none rounded-md flex flex-col"
      onClick={handleClick}
    >
      <div className="product-img">
        {item.img ? (
          <>
            <img
              src={item.img}
              alt={`${item.title} image`}
              className="h-28 object-cover w-full border-b rounded-t-md"
            />
          </>
        ) : (
          <>
            <img
              src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
              alt="image"
              className="h-28 object-cover w-full border-b rounded-t-md"
            />
          </>
        )}
      </div>

      <div className="flex-grow flex flex-col justify-between p-3">
        <div>
          <h1 className="text-lg">{item.title} </h1>
        </div>

        <div className="mt-auto">
          <span className="font-bold">{item.price.toFixed(2)}₺</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
