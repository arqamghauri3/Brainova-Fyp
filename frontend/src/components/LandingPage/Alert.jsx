import { closeAlert } from "@/store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Alert({ message }) {
  const [alertClass, setAlertClass] = useState(
    "opacity-0 translate-y-5 scale-95"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setAlertClass("opacity-100 translate-y-0 scale-100");
    }, 100); // Small delay for smooth entry
  }, []);

  const handleClose = () => {
    setAlertClass("opacity-0 translate-y-5 scale-95");
    setTimeout(() => {
      dispatch(closeAlert());
    }, 300); // Wait for animation before dispatching
  };

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 2000); // Small delay for smooth entry
  })
  return (
    <div
      className={`bg-black text-white dark:bg-white dark:text-black p-3 rounded-md transition-all ease-in-out ${alertClass}`}
    >
      <div className="flex">
        <span className="mr-2 cursor-pointer" onClick={handleClose}>
          &times;
        </span>
        <strong>{message}</strong>
      </div>
    </div>
  );
}
