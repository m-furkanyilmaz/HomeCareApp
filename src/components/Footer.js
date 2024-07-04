import React from "react";

function Footer() {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          position: "fixed",
          bottom: "13px",
          width: "-webkit-fill-available",
        }}
        className="container"
      >
        <hr />
        <p style={{ bottom: "0px", marginBottom: "0px" }}>
          Tüm Hakları Saklıdır. {"    "}
          <span style={{ color: "gray" }}>Copyright®</span>
        </p>
      </div>
    </>
  );
}

export default Footer;
