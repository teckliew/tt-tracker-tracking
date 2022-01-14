import React, { useEffect, useRef, useState } from "react";
import { Pill, Text, Title, Wrap } from "@thumbtack/thumbprint-react";

import { SideBar, Header, LogContainer } from "./StyledComponents";
import Tack from "../assets/tack.svg";

function Foreground() {
  const [logs, setLogs] = useState<{ url: string; requestBody: string }[]>([]);
  const numberRef = useRef(0);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      ({ details }, sender, sendResponse) => {
        const { url, requestBody } = details;
        console.log({
          details,
          url,
          requestBody,
          numberRef: numberRef.current,
        });
        if (url || requestBody) {
          setLogs((prev) => [...prev, { url, requestBody }]);
          numberRef.current++;
        }
        sendResponse({ success: true });
        return true;
      }
    );
  }, []);
  return (
    <SideBar>
      <Header>
        <Tack />
        <Title size={3}>Tracking Tracker</Title>
      </Header>
      <LogContainer>
        <Pill color="green">{`${numberRef.current}`}</Pill>
        {logs.map(({ url, requestBody }) => (
          <Wrap>
            <Text size={3} className="b">
              » {url.split("/").splice(3, 5).join("/")}
            </Text>
          </Wrap>
        ))}
      </LogContainer>
    </SideBar>
  );
}

export default Foreground;
