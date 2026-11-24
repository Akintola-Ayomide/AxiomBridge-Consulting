import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-5 py-20">
      <div className="flex max-w-lg flex-col items-center text-center">
        <Link href="/">
          <Logo />
        </Link>

        <p className="mt-14 font-sans text-label-md uppercase text-gold-dark">
          404
        </p>
        <h1 className="mt-4 font-display text-display-sm font-semibold text-navy md:text-display-md">
          The page you are looking for is not here.
        </h1>
        <p className="mt-5 text-body-lg text-slate">
          The address may have changed, or the page may no longer be available.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Return to home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
