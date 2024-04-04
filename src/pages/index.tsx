import React, { useState } from "react";
import { List, Page, Icon, useNavigate, Button } from "zmp-ui";

import Html5QrcodeComponent from "../components/html5-qrcode";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="page">
      <div className="section-container">
        <div>
          <Html5QrcodeComponent fps={10} qrbox={250} disableFlip={false}/>
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
