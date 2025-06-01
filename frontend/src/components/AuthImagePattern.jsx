import React from "react";

const AuthImagePattern = ({ title, subtitle }) => (
  <div className="bg-base-200 mt-[64px] py-8"> {/* 64 px = navbar height; adjust if different */}
    <div className="max-w-md mx-auto text-center">
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-2xl bg-primary ${
              i % 2 === 0 ? "animate-pulse" : ""
            }`}
          />
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-base-content/60 text-sm">{subtitle}</p>
    </div>
  </div>
);

export default AuthImagePattern;
