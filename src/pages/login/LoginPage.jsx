import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { setCookies } from "../../utils/Cookies";
import { rtl, setRtl } from "../../redux/slices/theme/themeSlice";
import { useLoginMutation } from "../../redux/slices/auth/authSlice";
import LoadingComponent from "../../components/LoadingComponent";
export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const rtlState = useSelector(rtl);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      phone: yup.string().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: "123456789",
      password: "123456789",
    },
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    login(data)
      .unwrap()
      .then(async (data) => {
        if (data.status) {
          toast.success(data?.message);
          setCookies("user_type", data?.data.type);
          await setCookies("token", data?.data?.token).then(() => {
            navigate("/");
          });
        } else {
          toast.error(data?.errors.phone);
        }
      });
  };

  return (
    <>
      <Button
        style={{ position: "absolute", top: 10, left: 10 }}
        variant=""
        onClick={() => {
          dispatch(setRtl(!rtlState));
          if (rtlState) {
            setCookies("lang", "en");
            i18n.changeLanguage("en");
          } else {
            setCookies("lang", "ar");
            i18n.changeLanguage("ar");
          }
        }}
        className="btn-blue-green"
      >
        {rtlState ? "English" : "العربية"}
      </Button>
      <Card
        dir={rtlState ? "rtl" : "ltr"}
        className="login-card p-4 rounded-4 shadow border-0"
      >
        {isLoading ? (
          <LoadingComponent boxed />
        ) : (
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center my-3">{t("login")}</h3>
            <Form.Group className="my-3" controlId="formBasicEmail">
              <input
                {...register("phone", { required: true })}
                placeholder={t("phone")}
                className={`input-custom`}
              />
              <p className={errors.email && "text-danger"}>
                {errors.email && <span>{errors.email.message}</span>}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <input
                {...register("password", { required: true })}
                type="password"
                className={`input-custom`}
                placeholder={t("password")}
              />
              <p className={errors.password && "text-danger"}>
                {errors.password && <span>{errors.password.message}</span>}
              </p>
            </Form.Group>
            <div className="mb-3 d-flex justify-content-center">
              <button
                className="btn btn-blue-green w-50 p-2 rounded-3"
                disabled={isLoading}
              >
                {t("login")}
              </button>
            </div>
          </Form>
        )}
      </Card>
    </>
  );
}
