import { Button, Card, Popconfirm, Table } from "antd";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { decrease, deleteCartItem, increase } from "../../redux/cartSlice";

const CartTable = ({ showModal }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (_, record) => (
        <img src={record.img} className="w-full h-16 object-cover" />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      render: (_, record) => <b> {record.title} </b>,
      sorter: (a, b) => a.title - b.title,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <b> {record.price.toFixed(2)}₺ </b>,
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => {
        return (
          <div className="quantity__buttons flex items-center gap-x-1">
            <button onClick={() => dispatch(increase(record))}>
              <CiCirclePlus size={25} />
            </button>
            <span className="font-extrabold w-4 inline-block text-center">
              {" "}
              {record.quantity}{" "}
            </span>

            <button onClick={() => dispatch(decrease(record))}>
              <CiCircleMinus size={25} />
            </button>
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (_, record) => (
        <b> {(record.price * record.quantity).toFixed(2)}₺ </b>
      ),
    },
    {
      title: "Olaylar",
      render: (_, record) => (
        <Popconfirm
          title="Silmek istediğinizden emin misiniz?"
          onConfirm={() => dispatch(deleteCartItem(record))}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button className="pl-0" type="link" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const cart = useSelector((state) => state.cart);
  return (
    <div className="px-6">
      <Table
        scroll={{
          x: 1000,
          y: 350,
        }}
        dataSource={cart.cartItems}
        columns={columns}
        bordered
      />

      <div className="cart-total flex justify-end">
        <Card className="w-72 mt-4">
          <div className="flex justify-between items-center">
            <span>Ara Toplam</span>
            <span> {cart.total.toFixed(2)}₺</span>
          </div>

          <div className="flex justify-between items-center my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              +{((cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-lg ">Genel Toplam</span>
            <span className="font-bold text-lg ">
              {" "}
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>

          <Button
            className="mt-2 w-full"
            type="primary"
            size="middle"
            onClick={showModal}
            disabled={cart.cartItems.length === 0}
          >
            Sipariş Oluştur
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CartTable;
