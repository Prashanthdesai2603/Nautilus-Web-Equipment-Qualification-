import React from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import StudyWeight from "./StudyWeight";
import Dim1 from "./Dim1";
import Dim2 from "./Dim2";
import Notes from "./Notes";

const Tabs = ({ session, onCloseSession }) => {
  const headertext = [
    { text: "Tonnage Study Weight" },
    { text: "Tonnage Dim1" },
    { text: "Tonnage Dim2" },
    { text: "Notes" },
  ];

  const content0 = () => <StudyWeight sessionId={session?.id} onClose={onCloseSession} />;
  const content1 = () => <Dim1 sessionId={session?.id} onClose={onCloseSession} />;
  const content2 = () => <Dim2 sessionId={session?.id} onClose={onCloseSession} />;
  const content3 = () => <Notes sessionId={session?.id} onClose={onCloseSession} />;


  return (
    <div className="tonnage-tabs-wrapper pl-3 pr-3">
      <TabComponent heightAdjustMode="Auto" id="tonnageTabs">
        <TabItemsDirective>
          <TabItemDirective header={headertext[0]} content={content0} />
          <TabItemDirective header={headertext[1]} content={content1} />
          <TabItemDirective header={headertext[2]} content={content2} />
          <TabItemDirective header={headertext[3]} content={content3} />
        </TabItemsDirective>
      </TabComponent>
    </div>
  );
};

export default Tabs;

