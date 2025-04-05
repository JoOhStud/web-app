import React, { useState } from "react";

const CookieBanner: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("cookiesAccepted");
    return storedValue === "true";
  });

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsAccepted(true);
  };

  if (isAccepted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ddd",
        padding: "1rem",
        textAlign: "center",
        zIndex: 9999,
      }}
    >
      <p>Ta strona używa plików cookies w celu poprawy jakości usług.</p>
      <button onClick={handleAccept}>Akceptuję</button>
    </div>
  );
};

export default CookieBanner;
