import React, { createContext, useState, useContext } from "react";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
    setTimeout(() => {
      setToast({ visible: false, type: "", message: "" });
    }, 3000);
  };

  const toastVariants = {
    success: {
      icon: <CheckCircle className="text-green-400 w-5 h-5 mr-2" />,
      bg: "bg-green-950 border border-green-800 shadow-green-400/20",
      text: "text-green-300",
    },
    error: {
      icon: <XCircle className="text-red-400 w-5 h-5 mr-2" />,
      bg: "bg-red-950 border border-red-800 shadow-red-400/20",
      text: "text-red-300",
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-400 w-5 h-5 mr-2" />,
      bg: "bg-yellow-900 border border-yellow-700 shadow-yellow-400/20",
      text: "text-yellow-200",
    },
    info: {
      icon: <Info className="text-blue-400 w-5 h-5 mr-2" />,
      bg: "bg-blue-950 border border-blue-800 shadow-blue-400/20",
      text: "text-blue-300",
    },
    default: {
      icon: <Info className="text-gray-400 w-5 h-5 mr-2" />,
      bg: "bg-gray-900 border border-gray-800 shadow-gray-400/20",
      text: "text-gray-300",
    },
  };

  const variant = toastVariants[toast.type] || toastVariants.default;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] max-w-full px-5 py-3 rounded-lg flex items-center text-sm font-medium shadow-lg backdrop-blur-md transition-all duration-300 z-50 ${variant.bg} ${variant.text}`}
        >
          {variant.icon}
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
