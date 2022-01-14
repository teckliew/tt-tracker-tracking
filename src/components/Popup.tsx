import React from "react";
import { Text, Title } from "@thumbtack/thumbprint-react";

import { Header } from "./StyledComponents";
import Tack from "../assets/tack.svg";

function Popup() {
  return (
    <div style={styles.main}>
      <Header>
        <Tack />
        <Title size={3}>Thumbtack Tracking Tracker</Title>
      </Header>
      <Text>
        Check the sidebar in your window, where we log the actions tracked on
        the website. Only works for Thumbtack domains.
      </Text>
    </div>
  );
}

const styles = {
  main: {
    width: "300px",
    height: "300px",
  },
};

export default Popup;
