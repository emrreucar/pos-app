import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ isModalOpen, handleCancel, customer, setCustomer }) => {
  const date = new Date(customer?.createdAt);
  const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className=" bg-white">
          <article className="overflow-hidden">
            <div className="logo">
              <img
                src="/images/logo.jpg"
                alt="ender ticaret"
                className="w-[200px] h-[90px] object-contain"
              />
            </div>

            {/* bill details */}
            <div className="px-7">
              <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-12">
                {/* bill detail item start */}
                <div className="text-md text-slate-500">
                  <span className="font-bold text-slate-700">Fatura</span>
                  <p>
                    {" "}
                    <span className="font-bold uppercase">
                      Ender Ticaret <br />
                    </span>{" "}
                    Orhaniye mahallesi 157 no'lu sokak no:48 Menteşe/Muğla
                  </p>
                </div>
                {/* bill detail item end */}

                {/* bill detail item start */}
                <div className="text-md text-slate-500">
                  <span className="font-bold text-slate-700">
                    Fatura Detayı
                  </span>
                  <p>
                    <span className="font-bold text-green-600 uppercase">
                      {" "}
                      {customer?.customerName}{" "}
                    </span>{" "}
                    <br />
                    Fake customer street
                  </p>
                </div>
                {/* bill detail item end */}

                {/* bill detail item start */}
                <div className="text-md text-slate-500">
                  <div>
                    <span className="font-bold text-slate-700">
                      Fatura Numarası
                    </span>
                    <p> 00{Math.floor(Math.random() * 100)} </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700">Tarih</span>
                    <p> {formattedDate} </p>
                  </div>
                </div>
                {/* bill detail item end */}
              </div>
            </div>

            {/* cart items */}
            <div className="px-7 mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      {" "}
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-end text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>

                      <td className="py-4">
                        <span className="font-medium"> {item.title} </span>
                      </td>
                      <td className="py-4 text-center">
                        <span>{item.price.toFixed(2)}₺</span>
                      </td>
                      <td className="py-4 text-center">
                        <span> {item.quantity} </span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity).toFixed(2)}₺</span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <th className="text-right pt-6" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal.toFixed(2)}₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        KDV %{customer?.tax}{" "}
                      </span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        +
                        {((customer?.subTotal * customer?.tax) / 100).toFixed(
                          2
                        )}
                        ₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">Total</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount.toFixed(2)}₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>

              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                    Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                    sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                    talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                    ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                    Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi
                    geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of
                    England tabanı olmak üzere toplam %8,5 uygulanacaktır.
                    Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
