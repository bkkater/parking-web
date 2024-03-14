"use client";

import { ReactNode, useEffect, useState } from "react";

// Components
import Notification from "@/components/Notification";

type StateProps = {
  isLoading: boolean;
  isSubmitSuccessful: boolean;
  submittedText: string;
  loadingText: string;
  children: ReactNode;
};

export default function State({
  children,
  isSubmitSuccessful,
  isLoading,
  loadingText,
  submittedText,
}: StateProps) {
  const [showCheck, setShowCheck] = useState(false);

  /**
   * Exibe o check quando a requisição é bem sucedida.
   */
  useEffect(() => {
    if (isSubmitSuccessful) {
      setShowCheck(true);

      setTimeout(() => {
        setShowCheck(false);
      }, 2000);
    }
  }, [isLoading, isSubmitSuccessful]);

  if (isLoading) {
    return <Notification text={loadingText} type="loading" />;
  }

  if (showCheck) {
    return <Notification text={submittedText} type="success" />;
  }

  return <>{children}</>;
}
