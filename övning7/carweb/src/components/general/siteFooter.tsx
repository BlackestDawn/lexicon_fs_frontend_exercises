export default function SiteFooter() {
  const d = new Date();
  const year = d.getUTCFullYear();

  return (
    <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
      &copy; Car Handlers Inc. {year}
    </p>
  );
}
