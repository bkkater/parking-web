import Link from "next/link";

// Components
import Button from "@/components/Button";
import Form from "@/components/Form";
import HomeTabs from "@/app/(home)/tabs";
import HomeTab from "@/app/(home)/tab";

export default function Home() {
  return (
    <HomeTabs>
      <HomeTab value="entry">
        <Form>
          <Form.Field>
            <Form.Label htmlFor="plate">Numero da placa:</Form.Label>

            <Form.Input id="plate" type="text" placeholder="AAA-0000" />
          </Form.Field>

          <Button>Confirmar entrada</Button>
        </Form>
      </HomeTab>

      <HomeTab value="exit">
        <Form>
          <Form.Field>
            <Form.Label htmlFor="plate">Numero da placa:</Form.Label>

            <Form.Input id="plate" type="text" placeholder="AAA-0000" />
          </Form.Field>

          <Button color="secoundary">Pagamento</Button>

          <Button color="secoundary" variant="outlined">
            Saída
          </Button>

          <Link
            href="/history"
            className="mx-auto mt-3 font-semibold uppercase text-cyan200"
          >
            Ver histórico
          </Link>
        </Form>
      </HomeTab>
    </HomeTabs>
  );
}
