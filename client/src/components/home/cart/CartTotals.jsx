import { GoTrash } from "react-icons/go";
import { IoReceiptOutline } from "react-icons/io5";

import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import {
  decrease,
  deleteCartItem,
  increase,
  reset,
} from "../../../redux/cartSlice";
import { Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_80px)] flex flex-col ">
      <h2 className="bg-blue-600 text-center py-2 text-white font-semibold tracking-wide text-lg">
        Sepetteki Ürünler
      </h2>

      <ul className="cart-items py-1 flex flex-col gap-y-3 overflow-y-auto">
        {cart.cartItems.length === 0 ? (
          <>
            <p className="text-center font-bold text-xl my-4">
              Sepetinizde hiç ürün yok!
            </p>
          </>
        ) : (
          cart.cartItems.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-2 px-2 mb-2 "
            >
              <div className="product-img flex gap-x-2 cursor-pointer">
                {item.img ? (
                  <>
                    <img
                      src={item.img}
                      alt="product__image"
                      className="h-16 w-16 object-cover border-b rounded-md"
                      onClick={() => {
                        if (
                          window.confirm("Silmek istediğinizden emin misiniz?")
                        ) {
                          dispatch(deleteCartItem(item));
                          message.success("Ürün başarıyla silindi.");
                        } else {
                          message.error("Ürün silme işlemi başarısız!");
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <img
                      onClick={() => {
                        if (
                          window.confirm("Silmek istediğinizden emin misiniz?")
                        ) {
                          dispatch(deleteCartItem(item));
                          message.success("Ürün başarıyla silindi.");
                        } else {
                          message.error("Ürün silme işlemi başarısız!");
                        }
                      }}
                      src="https://grafgearboxes.com/productos/images/df.jpg"
                      alt="image"
                      className="h-16 w-16 object-cover border-b rounded-md"
                    />
                  </>
                )}

                <div className="product-info flex flex-col items-star justify-center">
                  <span className="font-bold"> {item.title} </span>
                  <div>
                    <span>
                      {item.price.toFixed(2)}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="quantity__buttons flex items-center gap-x-1">
                <button onClick={() => dispatch(increase(item))}>
                  <CiCirclePlus size={25} />
                </button>
                <span className="font-extrabold w-4 inline-block text-center">
                  {" "}
                  {item.quantity}{" "}
                </span>

                <button onClick={() => dispatch(decrease(item))}>
                  <CiCircleMinus size={25} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between items-center p-2">
            <span className="font-bold">Ara Toplam</span>
            <span>{cart.total.toFixed(2)}₺</span>
          </div>

          <div className="flex justify-between items-center p-2">
            <span className="font-bold">KDV %{cart.tax}</span>
            <span className="text-red-700">
              + {((cart.total * cart.tax) / 100).toFixed(2)} ₺
            </span>
          </div>
        </div>

        <div className="border-b">
          <div className="flex justify-between items-center p-2">
            <span className="font-bold text-xl text-green-500 ">
              Genel Toplam
            </span>
            <span className="text-xl font-bold">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)} ₺
            </span>
          </div>
        </div>

        <div className="py-2 px-2 flex flex-col items-center justify-center ">
          <Button
            onClick={() => navigate("/cart")}
            disabled={cart.cartItems.length === 0}
            type="primary"
            className="w-full py-2 px-1 text-white rounded-md font-bold flex items-center justify-center gap-x-1 duration-300 border-none"
          >
            <IoReceiptOutline size={20} />
            <span>Sipariş Oluştur</span>
          </Button>

          <Button
            disabled={cart.cartItems.length === 0}
            type="primary"
            danger
            className="w-full py-2 px-1 text-white rounded-md font-bold mt-2 flex items-center justify-center gap-x-1 duration-300 border-none"
            onClick={() => {
              if (
                window.confirm(
                  "Tüm ürünleri silmek istediğinizden emin misiniz?"
                )
              ) {
                dispatch(reset());
                message.success("Ürünler başarıyla silindi");
              } else {
                message.error("Ürün silme işlemi başarısız!");
              }
            }}
          >
            <GoTrash size={20} /> <span>Hepsini Temizle</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
