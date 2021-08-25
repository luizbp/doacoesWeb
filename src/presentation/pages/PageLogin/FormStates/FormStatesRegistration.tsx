import { Link, useHistory } from "react-router-dom";
import { PageLoginParams } from "../../../types/PageLoginParams";
import toast, { Toaster } from "react-hot-toast";

import { Form, Input, Button } from "antd";

import "../index.scss";
import { useState } from "react";

export const FormStatesRegistration = (
  { userAuthenticator }: PageLoginParams,
  { formStateFunction }: any
) => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleRegistration = async (values: any) => {
    try {
      if (values.fieldPassword !== values.fieldConfirmPassword) {
        toast.error(`As senhas não se coincidem`);
        return;
      }
      setLoading(true);
      const user = await userAuthenticator.signUp({
        email: values.fieldEmail,
        password: values.fieldPassword,
      });
      setLoading(false);
      if (user) {
        toast.success("Cadastro realizado com sucesso, verifique seu e-mail");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      <Form layout={"vertical"} onFinish={handleRegistration}>
        <Form.Item
          name="fieldEmail"
          rules={[{ required: true, message: "Preencha o E-mail" }]}
        >
          <Input placeholder="E-mail" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="fieldPassword"
          rules={[{ required: true, message: "Preencha a senha" }]}
        >
          <Input.Password placeholder="Senha" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="fieldConfirmPassword"
          rules={[
            { required: true, message: "Preencha a confirmação de senha" },
          ]}
        >
          <Input.Password
            placeholder="Confirmação de senha"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="button"
            type="primary"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? <span>Aguarde...</span> : <span>Cadastrar</span>}
          </Button>
        </Form.Item>
      </Form>
      <p>
        Se ja tem uma conta, <Link to="/login">clique aqui</Link> para entrar
      </p>
      <Toaster />
    </div>
  );
};
