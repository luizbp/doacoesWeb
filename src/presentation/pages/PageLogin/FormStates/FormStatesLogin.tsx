import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TypeLoginParams } from "../types/TypeLoginParams";
import toast, { Toaster } from "react-hot-toast";
import { Form, Input } from "antd";
import {CustomButton} from '../../../components/CustomButton'

import "../index.scss";
import { loadSessionStoraga } from "../../../../infra/Common/loadSessionStoraga";

export const FormStatesLogin = ({ userAuthenticator }: TypeLoginParams) => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleLogin = async (values: any) => {
    try {
      setLoading(true);
      const user = await userAuthenticator.signIn({
        email: values.fieldEmail,
        password: values.fieldPassword,
      });
      setLoading(false);
      if (user) {
        loadSessionStoraga(user.idUser)
        history.push("/home");
      }
    } catch (error:any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Entrar</h2>
      <Form layout={"vertical"} onFinish={handleLogin}>
        <Form.Item
          name="fieldEmail"
          rules={[{ required: true, message: "Preencha o E-mail" }]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="fieldPassword"
          rules={[{ required: true, message: "Preencha a senha" }]}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>
        <Form.Item>
          <CustomButton
            type="submit"
            disabled={loading}
          >
            {loading ? <span>Aguarde...</span> : <span>Entrar</span>}
          </CustomButton>
        </Form.Item>
      </Form>
      {/* <p>
        Se ainda não tem uma conta, <Link to="/register">clique aqui</Link> para
        se cadastrar
      </p> */}
      <Toaster />
    </div>
  );
};
