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
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none rounded-md "
      onClick={handleClick}
    >
      <div className="product-img">
        {item.img ? (
          <>
            <img
              src={item.img}
              alt={`${item.title} image`}
              className="h-28 object-cover w-full border-b rounded-md"
            />
          </>
        ) : (
          <>
            <img
              src="https://grafgearboxes.com/productos/images/df.jpg"
              alt="image"
              className="h-28 object-cover w-full border-b rounded-md"
            />
          </>
        )}
      </div>

      <div className="product-info flex flex-col p-3 ">
        <span className="font-bold text-lg"> {item.title} </span>
        <span>{item.price.toFixed(2)}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
