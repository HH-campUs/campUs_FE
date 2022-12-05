/* import { toast, ToastOptions } from "react-toastify";
import { Styles } from "../../style/ToastifyStyle";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  // 코드 리뷰 -> type은 enum으로 따로 빼기
  type: "success" | "error" | "info" | "action";
  message?: string;
  action?: string;
}

const toastOptions: ToastOptions = {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

export function showToast({ type, message, action = "바로가기" }: ToastProps) {
  switch (type) {
    case "success":
      // enum으로 타입 지정했을 때 가독성 상승 -> case ToastType.success:
      toast.success(message || "성공적으로 완료되었습니다", {
        ...toastOptions,
        icon: <img src="/svgs/toast_success.svg" alt="success" />,
      });
      return;
    case "error":
      toast.error(message || "다시 한번 시도해주세요", {
        ...toastOptions,
        icon: <img src="/svgs/toast_error.svg" alt="error" />,
      });
  }
}

export default function Toast() {
  return <Styles />;
} */

import React from "react";

function Toast() {
  return <div>Toast</div>;
}

export default Toast;
