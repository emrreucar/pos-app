import { Button, Form, Input, Modal, Select, message } from "antd";

const AddProductModal = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  setProducts,
  categories,
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  const onFinish = (values) => {
    // console.log("add product values: ", values);

    try {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      message.success("Ürün başarıyla eklendi");
      form.resetFields();
      setProducts([
        ...products,
        { ...values, _id: Math.random(), price: +values.price },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün adı"
          name="title"
          rules={[
            {
              required: true,
              message: "Ürün adı alanı boş bırakılamaz",
            },
          ]}
        >
          <Input placeholder="Bir ürün adı giriniz" />
        </Form.Item>

        <Form.Item label="Ürün resmi" name="img">
          <Input placeholder="Bir ürün görsel url'i giriniz" />
        </Form.Item>

        <Form.Item
          label="Ürün fiyat"
          name="price"
          rules={[
            {
              required: true,
              message: "Ürün fiyat alanı boş bırakılamaz",
            },
          ]}
        >
          <Input placeholder="Ürünün fiyatını giriniz" />
        </Form.Item>

        {/* select category */}
        <Form.Item
          label="Kategori seçin"
          name="category"
          rules={[
            {
              required: true,
              message: "Kategori alanı boş bırakılamaz",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Kategori ara..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button htmlType="submit" type="primary" size="medium">
            Ekle
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
