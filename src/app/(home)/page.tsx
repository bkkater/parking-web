import { z } from "zod";

// Components
import EntryForm, { EntryFormSchema } from "@/app/(home)/entryForm";
import ExitForm, { ExitFormSchema } from "@/app/(home)/exitForm";
import HomeTabs from "@/app/(home)/tabs";
import HomeTab from "@/app/(home)/tab";

// Data
import { api } from "@/data/api";

export default function Home() {
  /**
   * Fetch da entrada do veículo.
   */
  async function handleSubmitEntry(data: EntryFormSchema) {
    "use server";

    const response = await api("/", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    });
  }

  /**
   * Fetch do histórico do veículo.
   */
  async function verifyPlateStatus(data: ExitFormSchema) {
    "use server";

    const { plate } = data;

    const response = await api(`/${plate}`, {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      const plateHistory = await response.json();
      const lastRecord = plateHistory.reverse()[0] || null;

      return { data: lastRecord, error: null };
    } else {
      return { data: null, error: "Erro ao carregar os dados da API" };
    }
  }

  async function handleSubmitExit(data: ExitFormSchema) {
    "use server";

    const { plate } = data;

    await api(`/${plate}/out`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    });
  }

  /**
   * Fetch do pagamento do veículo.
   */
  async function handleSubmitPaymennt(data: ExitFormSchema) {
    "use server";

    const { plate } = data;

    await api(`/${plate}/pay`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    });
  }

  return (
    <HomeTabs>
      <HomeTab value="entry">
        <EntryForm
          onSubmitEntry={handleSubmitEntry}
          verifyPlateStatus={verifyPlateStatus}
        />
      </HomeTab>

      <HomeTab value="exit">
        <ExitForm
          onSubmitPayment={handleSubmitPaymennt}
          onSubmitExit={handleSubmitExit}
          verifyPlateStatus={verifyPlateStatus}
        />
      </HomeTab>
    </HomeTabs>
  );
}
