import { useEffect } from "react";

export default function LoadingComponent({ boxed }) {
  useEffect(() => {
    document.getElementById("root").style.overflow = "hidden";
    return () => {
      document.getElementById("root").style.overflow = "auto";
    };
  }, []);
  return (
    <div className={`load_screen ${boxed && "boxed"}`}>
      <div className="loader"></div>
    </div>
  );
}
