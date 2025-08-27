export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground/10 fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 py-3 text-sm text-foreground/70 flex items-center justify-between">
        <p>
          © {new Date().getFullYear()} Fresh Food. Feito para ajudar você a
          comer de forma saudável e sustentável.
        </p>
      </div>
    </footer>
  );
}
