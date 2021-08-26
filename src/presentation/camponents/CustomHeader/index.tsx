import { LogoutOutlined } from "@ant-design/icons";

import { Button } from "antd";
import { useHistory } from "react-router-dom";

import { Header } from "antd/lib/layout/layout";
import { TypeCustomHeaderParam } from "./types/TypeCustomHeaderParam";

import swal from "sweetalert";

import "./index.scss";
export const CustomHeader = ({ userAuthenticator }: TypeCustomHeaderParam) => {
  const history = useHistory();

  const handleLoggout = async () => {
    swal({
      title: "Deseja desconectar da sua conta?",
      icon: "info",
      buttons: ['Cancelar', true],
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await userAuthenticator.signOut();
        if (response) {
          history.push("/");
        }
      }
    });
  };
  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="actions-header">
          <Button
            onClick={handleLoggout}
            type="dashed"
            icon={<LogoutOutlined />}
          >
            Sair
          </Button>
        </div>
      </Header>
    </>
  );
};
