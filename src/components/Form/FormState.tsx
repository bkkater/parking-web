"use client";

import { ReactNode, useEffect, useState } from "react";

// Components
import Notification from "@/components/Notification";

type StateProps = {
  isLoading: boolean;
  isSubmitSuccessful: boolean;
  children: ReactNode;
};

export default function State({
  children,
  isSubmitSuccessful,
  isLoading,
}: StateProps) {
  const [showCheck, setShowCheck] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setShowCheck(true);

      setTimeout(() => {
        setShowCheck(false);
      }, 1000);
    }
  }, [isLoading, isSubmitSuccessful]);

  console.log("isLoading", isLoading);

  if (showLoading) {
    return <Notification text="Registrando..." type="loading" />;
  }

  if (showCheck) {
    return <Notification text="REGISTRADO!" type="success" />;
  }

  return <>{children}</>;
}
