import React from "react";

export default function Banner() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5 text-center">
      <h3 className="font-semibold">My Blog</h3>
      <h2 className="text-5xl font-bold tracking-wide">
        Writings from our team
      </h2>
      <p className="tracking-wide">
        The latest industry news, interviews, technologies and resources.
      </p>
    </div>
  );
}
