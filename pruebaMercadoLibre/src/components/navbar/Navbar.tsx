import "./Navbar.css";
import React from "react";


export default function Navbar({
  height,             
  iconSrc,             
  iconAlt = "Inicio",  
  iconHref = "#"       
}: {
  height?: number;
  iconSrc?: string;
  iconAlt?: string;
  iconHref?: string;
}) {
  const style = height ? { '--topstripe-height': `${height}px` } as React.CSSProperties : undefined;

  return (
    <>
      <div className="top-stripe" style={style} aria-hidden="true" />
      {iconSrc ? (
        <a
          href={iconHref}
          className="top-stripe-icon"
          aria-label={iconAlt}
          title={iconAlt}
        >
          <img
            className="top-stripe-icon-img"
            src={iconSrc}
            alt={iconAlt}
            decoding="async"
          />
        </a>
      ) : null}

      <div className="top-stripe-spacer" style={style} aria-hidden="true" />
    </>
  );
}
