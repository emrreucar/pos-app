import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  message,
  Popconfirm,
  Select,
} from "antd";
import { useEffect, useState } from "react";

const EditProductPageComp = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/products`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/categories`
        );
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const onFinish = (values) => {
    try {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, productId: editingItem._id }),
      });
      message.success("Ürün başarıyla güncellendi");

      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          } else {
            return item;
          }
        })
      );

      setIsEditModalOpen(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti!");
      console.log(error);
    }
  };

  const deleteProduct = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });
    message.success("Ürün başarıyla silindi");
    setIsEditModalOpen(false);

    setProducts(products.filter((item) => item._id !== id));
  };

  const cancel = () => {
    message.error("Ürün silinmedi!");
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => <p className="font-bold"> {record?.title} </p>,
    },

    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <>
            {record?.img ? (
              <>
                <img
                  className="w-full h-20 object-cover"
                  src={record?.img}
                  alt="image"
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
          </>
        );
      },
    },

    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },

    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },

    {
      title: "Olaylar",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => (
        <div className="flex">
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsEditModalOpen(true);
              setEditingItem(record);
            }}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Ürün sil"
            description="Bu ürünü silmekten emin misiniz?"
            onConfirm={() => deleteProduct(record._id)}
            onCancel={cancel}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="text" danger>
              Sil
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 400,
        }}
      />

      <Modal
        title="Ürünü düzenle"
        open={isEditModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
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
              Güncelle
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductPageComp;
