import { Button, Card, Form, Input, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

const CreateBill = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/bills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          cartItems: cart.cartItems,
          subTotal: cart.total,
          tax: (cart.total * cart.tax) / 100,
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
        }),
      });

      if (res.ok) {
        message.success("Fatura başarıyla oluşturuldu");
        dispatch(reset());
        navigate("/bills");
      } else {
        message.error("Fatura oluşturulamadı!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cart = useSelector((state) => state.cart);

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Müşteri Adı"
        name={"customerName"}
        rules={[{ required: true, message: "Müşteri adı boş geçilemez!" }]}
      >
        <Input placeholder="Müşteri adı giriniz" />
      </Form.Item>

      <Form.Item
        label="Telefon Numarası"
        name={"customerPhoneNumber"}
        rules={[{ required: true, message: "Telefon Numarası boş geçilemez!" }]}
      >
        <Input maxLength={17} placeholder="Müşteri telefon numarası giriniz" />
      </Form.Item>

      <Form.Item
        label="Ödeme Yöntemi"
        name={"paymentMode"}
        rules={[{ required: true, message: "Ödeme yöntemi boş geçilemez!" }]}
      >
        <Select placeholder="Ödeme yöntemi seçiniz">
          <Select.Option value="Nakit">Nakit</Select.Option>
          <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          <Select.Option value="Veresiye">Veresiye</Select.Option>
        </Select>
      </Form.Item>

      {/* form bottom */}
      <Card bordered={false}>
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
          htmlType="submit"
          className="mt-2 w-full"
          type="primary"
          size="middle"
        >
          Fatura Oluştur
        </Button>
      </Card>
    </Form>
  );
};

export default CreateBill;
