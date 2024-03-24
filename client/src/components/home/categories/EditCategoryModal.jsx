import { Button, Form, Input, Modal, Table, message, Popconfirm } from "antd";
import { useState } from "react";

const EditCategoryModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const onFinish = (values) => {
    try {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/categories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
      });
      message.success("Kategori başarıyla güncellendi");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );

      setIsEditModalOpen(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti!");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/categories/${id}`, {
      method: "DELETE",
    });
    message.success("Kategori başarıyla silindi");
    setCategories(categories.filter((item) => item._id !== id));
    setIsEditModalOpen(false);
  };

  const cancel = () => {
    message.error("Kategori silinmedi!");
  };

  const columns = [
    {
      title: "Başlık",
      dataIndex: "title",
      render: (text, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p> {record.title} </p>;
        }
      },
    },
    {
      title: "Olaylar",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex">
          <Button
            type="link"
            onClick={() => setEditingRow(record)}
            className="pl-0"
          >
            Düzenle
          </Button>
          <Button type="text" htmlType="submit">
            Kaydet
          </Button>

          <Popconfirm
            title="Kategori sil"
            description="Bu kategoriyi silmekten emin misiniz?"
            onConfirm={() => deleteCategory(record._id)}
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
    <Modal
      title="Kategori İşlemleri"
      open={isEditModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
