import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main>
      <Title>A2UI SolidStart Example</Title>
      <h1>SolidStart is running</h1>
      <Counter />
      <p>
        Open <a href="/a2ui">/a2ui</a> to see the A2UI Solid renderer demo.
      </p>
    </main>
  );
}
