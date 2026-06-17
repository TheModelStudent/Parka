import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="heading-serif mt-4 text-5xl md:text-6xl">404</h1>
      <p className="mt-4 max-w-sm text-sm font-light text-muted">
        The page you are looking for has slipped away. Let us guide you back.
      </p>
      <Link href="/" className="btn-line mt-9">
        Return Home
      </Link>
    </div>
  );
}
