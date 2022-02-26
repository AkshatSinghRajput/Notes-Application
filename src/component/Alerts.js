import React from "react";

function Alert(props) {
  return (
    <div className="container" style={{ height: "40px" }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type}`} role="alert">
          <center>
            <strong>{props.alert.message}</strong>
          </center>
        </div>
      )}
    </div>
  );
}

export default Alert;