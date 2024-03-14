import { Suspense } from "react";

// Components
import Notification from "@/components/Notification";
import EntryForm from "@/app/(home)/entryForm";
import ExitForm from "@/app/(home)/exitForm";
import HomeTabs from "@/app/(home)/tabs";
import HomeTab from "@/app/(home)/tab";

// Contexts
import HomeProvider from "@/contexts/homeContext";

export default function Home() {
  return (
    <HomeProvider>
      <HomeTabs>
        <HomeTab value="entry">
          <EntryForm />
        </HomeTab>

        <HomeTab value="exit">
          <ExitForm />
        </HomeTab>
      </HomeTabs>
    </HomeProvider>
  );
}
