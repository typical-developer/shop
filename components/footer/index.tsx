import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { shopConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f5f4f0]">
      <Container className="flex flex-col gap-5 py-10 text-sm text-black/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {shopConfig.site.name}. Built for better car buying.</p>
        <div className="flex gap-5"><Link href="/collections/all" className="hover:text-black">Browse cars</Link><Link href="#sell" className="hover:text-black">Sell your car</Link></div>
      </Container>
    </footer>
  );
}
