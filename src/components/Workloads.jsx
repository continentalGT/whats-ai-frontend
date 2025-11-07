import React from "react";
import { Link } from "react-router-dom";

function Workloads(props) {
  return (
    <div className="workload-card">
      <Link
        to={props.path}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h2>{props.workloadname}</h2>
      </Link>
    </div>
  );
}

export default Workloads;
