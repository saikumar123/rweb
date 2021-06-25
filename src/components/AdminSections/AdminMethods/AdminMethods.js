import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import DepositMethods from "./components/DepositMethods/DepositMethods";
import TokenomicsMethods from "./components/TokenomicsMethods/TokenomicsMethods";

const AdminMethods = (props) => {
  const data = [
    {
      label: "Tokenomics Contract Methods",
      content: <TokenomicsMethods />,
    },
    {
      label: "Deposit Contract Methods",
      content: <DepositMethods />,
    },
    {
      label: "Escrow Contract Methods",
      content: <div></div>,
    },
  ];

  return (
    <div>
      <Accordion>
        {data.map((obj) => (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <span className="font-weight-bold" style={{ fontSize: "18px" }}>
                  {obj?.label}
                </span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>{obj?.content}</AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AdminMethods;
