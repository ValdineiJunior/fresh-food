export default function Home() {
  return (
    <section className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold tracking-tight">Fresh Food</h1>
      <p>
        A simple way to discover what fruits and vegetables are fresh by month,
        build a grocery shopping list, and copy or print it to take with you.
      </p>
      <h2 className="text-2xl font-semibold">What you can do here</h2>
      <ul className="list-disc pl-6">
        <li>
          Explore seasonal produce by month to choose fresher, tastier, and more
          sustainable options.
        </li>
        <li>Create and save a shopping list of fruits and vegetables.</li>
        <li>Copy or print your list to use at the market.</li>
      </ul>
      <p>
        Use the navigation above to get started: check the seasonal produce or
        build your shopping list.
      </p>
    </section>
  );
}
