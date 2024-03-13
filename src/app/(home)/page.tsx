import { z } from "zod";

// Components
import EntryForm, { EntryFormSchema } from "@/app/(home)/entryForm";
import ExitForm, { ExitFormSchema } from "@/app/(home)/exitForm";
import HomeTabs from "@/app/(home)/tabs";
import HomeTab from "@/app/(home)/tab";

// Utils
import { plateRegex } from "@/utils/regex";

// Data
import { api } from "@/data/api";

export default function Home() {
  async function handleSubmitEntry(data: EntryFormSchema) {
    "use server";

    await api("/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function handleSubmitExit(data: ExitFormSchema) {
    "use server";

    const { plate } = data;

    await api(`/${plate}/out`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function handleSubmitPaymennt(data: ExitFormSchema) {
    "use server";

    const { plate } = data;

    await api(`/${plate}/pay`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  return (
    <HomeTabs>
      <HomeTab value="entry">
        <EntryForm onSubmitEntry={handleSubmitEntry} />
      </HomeTab>

      <HomeTab value="exit">
        <ExitForm
          onSubmitPayment={handleSubmitPaymennt}
          onSubmitExit={handleSubmitExit}
        />
      </HomeTab>
    </HomeTabs>
  );
}
