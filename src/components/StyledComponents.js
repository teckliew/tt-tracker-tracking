import styled from "styled-components";

const lightBlue = "#eaf6fa";
const gray200 = "#fafafa";
const gray300 = "#e9eced";

const smallGap = "8px";
export const SideBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  box-shadow: 1px 0 4px rgb(0 0 0 / 10%);
  width: 250px;
  height: 100%;
  padding: 0;
  z-index: 1000;
`;

export const Header = styled.div`
  display: flex;
  gap: ${smallGap};
  padding: ${smallGap} ${smallGap} 12px ${smallGap};
  background-color: ${gray200};
  border-bottom: 1px solid ${gray300};
`;

export const LogContainer = styled.div`
  background-color: white;
  padding: ${smallGap};
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
`;
