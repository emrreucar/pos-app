import CardItem from "./CardItem";
// import { BarPlot } from "@mui/x-charts/BarChart";
// import { LinePlot } from "@mui/x-charts/LineChart";
// import { ChartContainer } from "@mui/x-charts/ChartContainer";

// import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
// import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
// import { PieChart } from "@mui/x-charts/PieChart";

import { Area, Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";

const StatisticPageComp = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("posUser"));

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/products`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const asyncFetch = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/bills`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.log("fetch data failed: ", err));
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  return (
    <>
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>

        <section>
          <div className="flex items-center justify-start">
            <span className="text-2xl">Hoşgeldin</span> &nbsp;
            <span className="text-green-500 capitalize text-3xl font-semibold ">
              {user.username}
            </span>
          </div>

          <div className="statistic-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-10 ">
            <CardItem
              icon="/images/user.png"
              title="Toplam Müşteri"
              value={data?.length}
            />
            <CardItem
              icon="/images/money.png"
              title="Toplam Kazanç"
              value={totalAmount()}
            />
            <CardItem
              icon="/images/sale.png"
              title="Toplam Satış"
              value={data?.length}
            />
            <CardItem
              icon="/images/product.png"
              title="Toplam Ürün"
              value={products.length}
            />
          </div>
        </section>

        {/* line and pie charts */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 px-12">
          <div
            className="lg:w-1/2 lg:h-1/2 h-72"
            style={{ width: "70%", height: "300px" }}
          >
            <Area {...config} />
          </div>
          <div
            className="lg:w-1/2 lg:h-1/2 h-72"
            style={{ width: "30%", height: "300px" }}
          >
            <Pie {...config2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPageComp;
