import { Button, Form, Input, Modal, message } from "antd";

const AddCategoryModal = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  const onFinish = (values) => {
    try {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      message.success("Kategori başarıyla eklendi");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);

      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Kategori ekle"
          name="title"
          rules={[
            {
              required: true,
              message: "Kategori ekle alanı boş bırakılamaz",
            },
          ]}
        >
          <Input placeholder="Bir kategori adı giriniz" />
        </Form.Item>

        <div className="flex justify-end">
          <Button htmlType="submit" type="primary" size="medium">
            Oluştur
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
