import React from "react";

function Footer() {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          flexShrink: 0,
          bottom: "0px",
          width: "-webkit-fill-available",
          marginBottom: "0px",
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
