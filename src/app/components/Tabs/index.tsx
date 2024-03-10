"use client";

import Link from "next/link";

// Components
import Button from "@/components/Button";
import Form from "@/components/Form";
import Tabs from "@/components/Tabs";

export default function HomeTabs() {
  return (
    <Tabs defaultValue="entry">
      <Tabs.List className="flex" aria-label="Registre os carros estacionados">
        <Tabs.Trigger value="entry">Entrada</Tabs.Trigger>

        <Tabs.Trigger value="exit">Saída</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="entry">
        <Form>
          <Form.Field>
            <Form.Label htmlFor="plate">Numero da placa:</Form.Label>

            <Form.Input id="plate" type="text" placeholder="AAA-0000" />
          </Form.Field>

          <Button type="submit">Confirmar entrada</Button>
        </Form>
      </Tabs.Content>

      <Tabs.Content value="exit">
        <Form>
          <Form.Field>
            <Form.Label htmlFor="plate">Numero da placa:</Form.Label>

            <Form.Input id="plate" type="text" placeholder="AAA-0000" />
          </Form.Field>

          <Button type="submit" color="secoundary">
            Pagamento
          </Button>

          <Button type="submit" color="secoundary" variant="outlined">
            Saída
          </Button>

          <Link
            href="/history"
            className="mx-auto mt-3 font-semibold uppercase text-cyan200"
          >
            Ver histórico
          </Link>
        </Form>
      </Tabs.Content>
    </Tabs>
  );
}
