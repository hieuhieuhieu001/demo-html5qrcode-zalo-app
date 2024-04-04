import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";
import { Button, Swiper } from "zmp-ui";

interface Html5QrcodeComponentProps {
  fps: number;
  qrbox: number;
  disableFlip: boolean;
}

const elementID = "reader";
const cretateConfig = (props) => {
  let config = {
    fps: null,
    qrbox: null,
    disableFlip: false,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodeComponent: React.FunctionComponent<Html5QrcodeComponentProps> = (props) => {
  const [html5QrCode, setHtml5QrCode] = useState({});

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(elementID);
    setHtml5QrCode(html5QrCode);
  }, []);

  const startScanner = () => {
    const config = cretateConfig(props);
    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        (decodedText, decodedResult) => {
          Swal.fire({
            title: "Scan result",
            text: decodedText,
            icon: "success",
          });
        },
        (errorMessage) => {
          console.log(`Error scanning: ${errorMessage}`);
        },
      )
      .catch((err) => {
        console.log(`Error starting scanner: ${err}`);
      });
  };

  const stopScanner = () => {
    html5QrCode
      .stop()
      .then(() => {
        console.log("Scanner stopped");
      })
      .catch((err) => console.log(`Error stopping scanner: ${err}`));
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div id="reader" className="w-full"></div>
      <div className="flex justify-around">
        <Button onClick={startScanner}>Scan</Button>
        <Button onClick={stopScanner}>Stop</Button>
      </div>
    </div>
  );
};

export default Html5QrcodeComponent;
