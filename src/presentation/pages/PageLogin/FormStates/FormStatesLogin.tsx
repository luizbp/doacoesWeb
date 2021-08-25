import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { PageLoginParams } from "../../../types/PageLoginParams";
import toast, { Toaster } from "react-hot-toast";
import { Form, Input, Button, Radio } from "antd";

import "../index.scss";

export const FormStatesLogin = ({ userAuthenticator }: PageLoginParams) => {
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
        history.push("/home");
      }
    } catch (error) {
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
          <Button
            className="button"
            type="primary"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? <span>Aguarde...</span> : <span>Entrar</span>}
          </Button>
        </Form.Item>
      </Form>
      <p>
        Se ainda não tem uma conta, <Link to="/register">clique aqui</Link> para
        se cadastrar
      </p>
      <Toaster />
    </div>
  );
};
