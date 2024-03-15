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
  if (isLoading) {
    return <Notification text={loadingText} type="loading" />;
  }

  if (isSubmitSuccessful) {
    return <Notification text={submittedText} type="success" />;
  }

  return <>{children}</>;
}
