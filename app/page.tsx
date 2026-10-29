import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, CarFront, Gauge, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const vehicles = [
  { name: "2024 Porsche 911 Carrera", detail: "3.0L Twin-Turbo · 8,240 mi", price: "$128,900", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85" },
  { name: "2023 Land Rover Defender", detail: "3.0L I6 · 18,410 mi", price: "$76,500", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85" },
  { name: "2022 BMW M4 Competition", detail: "3.0L Twin-Turbo · 11,890 mi", price: "$69,950", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85" },
];

export async function generateMetadata(): Promise<Metadata> {
  const title = "Find your next car";
  const description = shopConfig.site.description;
  return { title: `${title} | ${shopConfig.site.name}`, description, alternates: buildAlternates({ pathname: "/" }), openGraph: buildOpenGraph({ title, description, url: "/", type: "website" }) };
}

export default function HomePage() {
  return (
    <Page className="bg-[#f5f4f0] pt-0 text-[#171717]">
      <Sections className="gap-0">
        <section className="relative overflow-hidden bg-[#171717] text-[#f5f4f0]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,.88),rgba(10,10,10,.18)),url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=90')] bg-cover bg-center" />
          <Container className="relative flex min-h-[590px] items-end py-20 lg:py-28">
            <div className="max-w-2xl">
              <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-[#d8b16c]"><Sparkles className="size-4" /> Curated cars. Clear choices.</p>
              <h1 className="max-w-xl text-5xl font-medium leading-[.98] tracking-[-.06em] md:text-7xl">The right car changes everything.</h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/70 md:text-lg">Shop exceptional vehicles from trusted sellers, with the details you need to make your next move confidently.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Button render={<Link href="/collections/all" />} className="h-12 rounded-full bg-[#d8b16c] px-6 text-[#171717] hover:bg-[#e6c486]">Explore inventory <ArrowRight className="size-4" /></Button><Button render={<Link href="#sell" />} variant="outline" className="h-12 rounded-full border-white/35 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white">Sell your car</Button></div>
            </div>
          </Container>
        </section>

        <section className="border-b border-black/10 bg-[#f5f4f0] py-7"><Container className="grid gap-6 sm:grid-cols-3"><Trust icon={<BadgeCheck />} title="Verified vehicles" text="Every listing is reviewed." /><Trust icon={<ShieldCheck />} title="Transparent pricing" text="No hidden surprises." /><Trust icon={<CarFront />} title="Easy to own" text="A simpler buying journey." /></Container></section>

        <section className="py-20 md:py-28"><Container><div className="mb-10 flex items-end justify-between gap-6"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-[#9b6f2d]">Featured inventory</p><h2 className="text-4xl font-medium tracking-[-.05em] md:text-5xl">Cars worth driving.</h2></div><Link href="/collections/all" className="hidden items-center gap-2 text-sm font-medium sm:flex">View all cars <ArrowRight className="size-4" /></Link></div><div className="grid gap-6 md:grid-cols-3">{vehicles.map((vehicle) => <article key={vehicle.name} className="group"><div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#e2e0da]"><img src={vehicle.image} alt={vehicle.name} className="size-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="flex items-start justify-between gap-4 pt-4"><div><h3 className="text-lg font-medium tracking-tight">{vehicle.name}</h3><p className="mt-1 text-sm text-black/55">{vehicle.detail}</p></div><p className="whitespace-nowrap text-sm font-semibold">{vehicle.price}</p></div></article>)}</div></Container></section>

        <section id="sell" className="bg-[#dedbd3] py-20 md:py-24"><Container className="grid items-center gap-10 md:grid-cols-[1fr_auto]"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-[#9b6f2d]">Ready for a change?</p><h2 className="max-w-xl text-4xl font-medium tracking-[-.05em] md:text-5xl">Your car deserves a better next chapter.</h2><p className="mt-5 max-w-lg leading-7 text-black/60">Get a straightforward valuation and reach serious buyers looking for their next favorite car.</p></div><Button render={<Link href="mailto:sales@apexmotors.example" />} className="h-12 rounded-full bg-[#171717] px-6 text-white hover:bg-black/80">Start selling <ArrowRight className="size-4" /></Button></Container></section>
      </Sections>
    </Page>
  );
}

function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="flex items-center gap-3"><div className="rounded-full bg-[#dedbd3] p-2 text-[#9b6f2d]">{icon}</div><div><p className="text-sm font-semibold">{title}</p><p className="text-sm text-black/50">{text}</p></div></div>; }
