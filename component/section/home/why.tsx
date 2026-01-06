// Codes by mahdi tasha
// Creating and exporting Why section of home page as default
export default function Why() {
  // Returning JSX
  return (
    <section className="max-w-4xl border-x border-foreground/10 mx-auto border-b">
      <main className="prose dark:prose-invert prose-neutral p-4 max-w-full">
        <h2 className="mt-0">Why EvolveOS?</h2>
        <ol>
          <li>Simple & Fast: Focus on progress, not tools.</li>
          <li>Opinionated Workflow: Pre-built structure for growth.</li>
          <li>Offline-First: Your life shouldn’t depend on the internet.</li>
          <li>
            Markdown-First: Future-proof, portable, and developer-friendly.
          </li>
        </ol>
      </main>
    </section>
  );
}
