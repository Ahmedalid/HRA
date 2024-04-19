import { Nav, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import AddCountry from "../country/add/AddCountry";
import AddCity from "../city/add/AddCity";
export default function AddLocation({ setShowDialog }) {
  const { t } = useTranslation();
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="country">
      <Nav variant="pills" className="justify-content-center gap-2 mb-3">
        <Nav.Item style={{ minWidth: 150, textAlign: "center" }}>
          {/* change active color in index.scss line 72 */}
          <Nav.Link className="custom-tab-link" eventKey="country">
            {t("country")}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ minWidth: 150, textAlign: "center" }}>
          <Nav.Link className="custom-tab-link" eventKey="city">
            {t("city")}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="country">
          <AddCountry setShowDialog={setShowDialog} />
        </Tab.Pane>
        <Tab.Pane eventKey="city">
          <AddCity setShowDialog={setShowDialog} />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
  // }
}
