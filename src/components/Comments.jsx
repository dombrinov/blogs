import React from "react";

export const Comments = ({ email, body }) => {
  return (
    <div>
      <h5>{email}</h5>
      <div>{body}</div>
    </div>
  );
};
