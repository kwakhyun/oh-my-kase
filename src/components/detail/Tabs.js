import React, { useState } from "react";
import styled from "styled-components";
import Information from "./Information";
import Menu from "./Menu";
import Review from "./Review";

const Tabs = ({ item }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabArray = [
    {
      tabTitle: (
        <div
          className={tabIndex === 0 ? "select" : ""}
          onClick={() => setTabIndex(0)}
        >
          메뉴
        </div>
      ),
      tabContent: <Menu {...item} />,
    },
    {
      tabTitle: (
        <div
          className={tabIndex === 1 ? "select" : ""}
          onClick={() => setTabIndex(1)}
        >
          정보
        </div>
      ),
      tabContent: <Information {...item} />,
    },
    {
      tabTitle: (
        <div
          className={tabIndex === 2 ? "select" : ""}
          onClick={() => setTabIndex(2)}
        >
          리뷰
        </div>
      ),
      tabContent: <Review {...item} />,
    },
  ];

  return (
    <>
    <StyledTab>
      {tabArray.map((tab, idx) => 
         <StyledTabTitle key={idx}>{tab.tabTitle}</StyledTabTitle>
      )}
    </StyledTab>
    <StyledDiv>{tabArray[tabIndex].tabContent}</StyledDiv>
  </>
  );
};

export default Tabs;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: 20px auto;
  border-radius: 5px;
  font-size: 0.7em;
  box-shadow: 2px 80px 30px grey;
`;
const StyledTab = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  div {
    padding: 10px 0;
  }
  .select {
    border-bottom: 1px solid black;
  }
`;
const StyledTabTitle = styled.div`

`