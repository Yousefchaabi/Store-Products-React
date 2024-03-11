import React from "react";

function Rating({ rate, count }) {
  return (
    <>
      <span className="badge badge-pill bg-primary"> {rate} / 5)</span>
    </>
  );
}

export default Rating;
