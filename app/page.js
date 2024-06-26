import ListTodos from "@/components/ListTodos";
import Form from "@/components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center gap-10 p-8 px-12 pb-4 bg-slate-900 overflow-hidden">
      <Form />
      <section className="overflow-y-scroll px-5">
        <ListTodos />
      </section>
    </main>
  );
}
