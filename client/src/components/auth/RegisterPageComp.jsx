import { Button, Carousel, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "./AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPageComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        message.success("Kullanıcı başarıyla oluşturuldu");
        setLoading(false);
        navigate("/login");
      } else {
        message.error("Kullanıcı oluşturma işlemi başarısız!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <img src="/images/logo.jpg" alt="ender ticaret logo" />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre Tekrar Alanı Boş Bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız var mı?&nbsp;
            <Link to="/login" className="text-blue-600 underline">
              Şimdi giriş yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:flex hidden bg-[#6d62ff]">
          <div className="w-full h-full ">
            <Carousel autoplay>
              <AuthCarousel
                img="/images/responsive.svg"
                title="Responsive"
                desc="tüm cihaz boyutlarıyla uyumluluk"
              />
              <AuthCarousel
                img="/images/statistic.svg"
                title="İstatistikler"
                desc="geniş tutulan istatistikler"
              />
              <AuthCarousel
                img="/images/customer.svg"
                title="Müşteri Memnuniyeti"
                desc="deneyim sonunda üründen memnun kalan müşteriler"
              />
              <AuthCarousel
                img="/images/admin.svg"
                title="Yönetici Paneli"
                desc="tek yerden yönetim"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageComp;
