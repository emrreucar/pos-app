import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Categories from "../components/home/categories/Categories";
import Products from "../components/home/products/Products";
import CartTotals from "../components/home/cart/CartTotals";
import { Spin } from "antd";

const HomePage = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 md:flex-row flex flex-col justify-between gap-10 pb-20 md:pb-0">
          <div className="categories flex-[1.3] overflow-x-hidden overflow-y-auto h-[calc(100vh_-_112px)] px-2 py-4 md:py-0">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>

          <div className="products flex-[8] h-[calc(100vh_-_112px)] overflow-auto">
            <Products
              products={products}
              setProducts={setProducts}
              categories={categories}
              setCategories={setCategories}
              filtered={filtered}
              search={search}
            />
          </div>

          <div className="cartTotals min-w-[350px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="h-screen flex items-center justify-center relative bottom-32"
        />
      )}
    </>
  );
};

export default HomePage;
