"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { z } from "zod";

// Data
import { api } from "@/data/api";

// Utils
import { carSchema } from "@/utils/schema/car";

export type FormSchema = z.infer<typeof carSchema>;

type HomeProviderProps = {
  children: ReactNode;
};

type ErrorProps = {
  entry: string | null;
  exit: string | null;
};

const INITIAL_ERROR_STATE = {
  entry: null,
  exit: null,
};

type HomeContextType = {
  error: ErrorProps;
  onSubmitPayment: (data: FormSchema) => void;
  onSubmitExit: (data: FormSchema) => void;
  onSubmitEntry: (data: FormSchema) => void;
  getLastRecord: (data: FormSchema) => any;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};

export const HomeProvider = ({ children }: HomeProviderProps) => {
  const [error, setError] = useState<ErrorProps>(INITIAL_ERROR_STATE);

  /**
   * Fetch do pagamento do veículo.
   */
  const onSubmitPayment = async (data: FormSchema) => {
    setError(INITIAL_ERROR_STATE);

    const { plate } = data;

    const response = await api(`/${plate}/pay`, {
      method: "POST",
      cache: "no-store",
    });

    if (!response.ok) {
      setError((prevState) => ({
        ...prevState,
        exit: "Erro ao registrar pagamento",
      }));
    }
  };

  /**
   * Fetch da saída do veículo.
   */
  const onSubmitExit = async (data: FormSchema) => {
    setError(INITIAL_ERROR_STATE);

    const { plate } = data;

    const response = await api(`/${plate}/out`, {
      method: "POST",
      cache: "no-store",
    });

    if (!response.ok) {
      setError((prevState) => ({
        ...prevState,
        exit: "Erro ao registrar saída",
      }));
    }
  };

  /**
   * Fetch da entrada do veículo.
   */
  const onSubmitEntry = async (data: FormSchema) => {
    setError(INITIAL_ERROR_STATE);

    const response = await api("", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      setError((prevState) => ({
        ...prevState,
        entry: "Erro ao registrar entrada",
      }));
    }
  };

  /**
   * Fetch do último registro do veículo.
   */
  const getLastRecord = async (data: FormSchema) => {
    const { plate } = data;

    const response = await api(`/${plate}`, {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      const plateHistory = await response.json();
      const lastRecord = plateHistory.reverse()[0];

      return {
        lastRecord: lastRecord || null,
        error: null,
      };
    } else {
      return {
        lastRecord: null,
        error: "Erro ao carregar os dados da API",
      };
    }
  };

  return (
    <HomeContext.Provider
      value={{
        error,
        onSubmitPayment,
        onSubmitExit,
        onSubmitEntry,
        getLastRecord,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
