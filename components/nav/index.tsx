import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { shopConfig } from "@/lib/config";

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 w-full border-b border-black/10 bg-[#f5f4f0]/95 backdrop-blur" id="nav-outer">
      <Container className="flex h-20 items-center gap-8">
        <Link className="shrink-0 text-xl font-semibold tracking-[-.04em]" href="/">{shopConfig.site.name}</Link>
        <div className="ml-auto flex items-center gap-6 text-sm font-medium">
          <Link href="/collections/all" className="hidden sm:block">Browse cars</Link>
          <Link href="#sell" className="hidden sm:block">Sell your car</Link>
          <Link href="#sell" className="rounded-full bg-[#171717] px-4 py-2 text-white hover:bg-black/80">Get started</Link>
        </div>
      </Container>
    </nav>
  );
}
