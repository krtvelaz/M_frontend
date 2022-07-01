import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import bell from "../../../utils/assets/img/bell.svg";
import { MailOutlined } from "@ant-design/icons";

const DropdownNotification = () => {
  const handleClick = (e: any) => {
    if (e.key !== "ver mas") {
    }
  };
  const menu = (
    <Menu
      onClick={handleClick}
      style={{
        width: 250,
        boxShadow: "0 0 10px #CCC",
        borderRadius: "5px",
      }}
      items={[
        {
          key: "notifi-1",
          label: <div className="text-center">notificacíon</div>,
          icon: <MailOutlined />,
        },
        {
          key: "notifi-2",
          label: <div className="text-center">notificacíon</div>,
          icon: <MailOutlined />,
        },
        {
          key: "ver mas",
          label: (
            <div
              className="text-center"
              style={{
                borderTop: "1px solid #CCC",
                color: "rgb(109, 163, 250)",
              }}
            >
              Ver más...
            </div>
          ),
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu}>
      <div>
        <img
          src={bell}
          alt=""
          style={{ marginLeft: "10px", cursor: "pointer" }}
        />
        <span
          style={{
            color: "#F8AC00",
            fontSize: "10px",
            marginLeft: "3px",
            marginRight: "10px",
          }}
        >
          99 +
        </span>
      </div>
    </Dropdown>
  );
};

export default DropdownNotification;
