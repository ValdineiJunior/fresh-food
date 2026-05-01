export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 text-center text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>
          © {new Date().getFullYear()} Comida Fresca — alimentos frescos, de
          forma simples e sustentável.
        </p>
      </div>
    </footer>
  );
}
