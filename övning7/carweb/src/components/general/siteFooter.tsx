export function SiteFooter() {
  const d = new Date();
  const year = d.getUTCFullYear();

  return (
    <p className="text-center">&copy; Car Handlers Inc. {year}</p>
  );
}
