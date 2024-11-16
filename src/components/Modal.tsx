import React from "react";
import { ModalProps } from "../interfaces";

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="z-10 fixed inset-0 bg-gray-500/75 transition-opacity flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-200 w-full sm:max-w-md max-w-72 py-2 px-4 rounded relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
