import { Button, Popconfirm, Table, message } from "antd";
import { useEffect, useState } from "react";
import PrintBill from "./PrintBill";

const BillsPageComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/bills`
        );
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/bills/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        message.success("Fatura başarıyla silindi");
        setBillItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        message.error("Fatura silme işlemi başarısız!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        const date = new Date(text);
        const formattedDate = date.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <span> {formattedDate} </span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_, record) => <b> {record.totalAmount.toFixed(2)}₺</b>,
    },
    {
      title: "Olaylar",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            className="pl-0"
            type="link"
            onClick={() => {
              showModal();
              setCustomer(record);
            }}
          >
            Yazdır
          </Button>

          <Popconfirm
            title="Silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger type="link">
              Sil
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-6">Faturalarım</h1>

      <Table
        className="px-10"
        scroll={{
          x: 1000,
          y: 400,
        }}
        dataSource={billItems}
        columns={columns}
      />

      <PrintBill
        customer={customer}
        setCustomer={setCustomer}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default BillsPageComp;
