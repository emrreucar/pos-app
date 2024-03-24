import { Button, Table } from "antd";
import { useEffect, useState } from "react";

const CustomersPageComp = () => {
  const [billItems, setBillItems] = useState([]);

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
  ];

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

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-6">Müşterilerim</h1>
      <Table
        scroll={{
          x: 1000,
          y: 400,
        }}
        className="px-10"
        dataSource={billItems}
        columns={columns}
      />
    </div>
  );
};

export default CustomersPageComp;
