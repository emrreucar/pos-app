import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  message,
  Popconfirm,
  Select,
  Space,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const EditProductPageComp = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});

  // search start
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // search end

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

  // search func start
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Temizle
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  // search func end

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => <p className="font-bold"> {record?.title} </p>,
      ...getColumnSearchProps("title"),
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
      render: (text) => <b className="text-red-500" > {text.toFixed(2)}₺ </b>,
    },

    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
      ...getColumnSearchProps("category"),
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
          y: 500,
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
          initialValues={editingItem ? editingItem : {}}
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
