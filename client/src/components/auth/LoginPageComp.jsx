import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "./AuthCarousel";
import { useState } from "react";

const LoginPageComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }
      );

      const user = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
      } else if (res.status === 403) {
        message.error("Şifre yanlış!");
      } else {
        message.error("Bir şeyler ters gitti!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <img src="/images/logo.jpg" alt="ender ticaret logo" />
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email Alanı Boş Bırakılamaz!",
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center">
                <Checkbox checked>Beni hatırla</Checkbox>
                <Link to={"/"}>Şifremi unuttum</Link>
              </div>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-blue-600 underline">
              Şimdi Kayıt Ol
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

export default LoginPageComp;
