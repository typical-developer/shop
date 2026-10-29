"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Check, ChevronDown, Edit3, LayoutDashboard, LogOut, Plus, Search, Settings, Trash2, X } from "lucide-react"
import Link from "next/link"

type Vehicle = {
  id: number
  name: string
  year: number
  price: string
  mileage: string
  status: "Available" | "Reserved" | "Sold"
  category: string
  image: string
}

const initialVehicles: Vehicle[] = [
  { id: 1, name: "2024 Porsche 911 Carrera", year: 2024, price: "$128,900", mileage: "2,410 mi", status: "Available", category: "Sports", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "2023 Range Rover Sport", year: 2023, price: "$94,500", mileage: "8,120 mi", status: "Available", category: "SUV", image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "2022 Mercedes-Benz C 300", year: 2022, price: "$49,800", mileage: "14,620 mi", status: "Reserved", category: "Sedan", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85" },
]

export default function AdminPage() {
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [saved, setSaved] = useState(false)

  const filtered = useMemo(() => vehicles.filter((vehicle) => vehicle.name.toLowerCase().includes(query.toLowerCase())), [vehicles, query])

  function saveVehicle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editing) return
    setVehicles((current) => current.some((vehicle) => vehicle.id === editing.id) ? current.map((vehicle) => vehicle.id === editing.id ? editing : vehicle) : [...current, editing])
    setEditing(null)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  function removeVehicle(id: number) {
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== id))
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#151515]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-black/10 bg-[#fafaf8] p-7 lg:block">
        <Link href="/" className="mb-14 block font-serif text-2xl font-semibold tracking-tight">Spec Sheet<span className="text-[#b44b2b]">.</span></Link>
        <nav className="space-y-2 text-sm">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.18em] text-black/35">Workspace</p>
          <Link href="/admin" className="flex items-center gap-3 rounded-xl bg-[#171717] px-4 py-3 font-medium text-white"><LayoutDashboard size={16} /> Inventory</Link>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-black/55"><Settings size={16} /> Settings</button>
        </nav>
        <div className="absolute bottom-7 left-7 right-7 border-t border-black/10 pt-5 text-sm text-black/55">
          <button className="flex items-center gap-3"><LogOut size={16} /> Sign out</button>
        </div>
      </aside>

      <section className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-black/10 bg-[#fafaf8] px-6 py-5 md:px-10">
          <div><p className="text-xs text-black/45">Workspace / Inventory</p><h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight">Vehicle inventory</h1></div>
          <Link href="/" className="hidden items-center gap-2 text-sm text-black/55 transition hover:text-black md:flex"><ArrowLeft size={15} /> View storefront</Link>
        </header>

        <div className="p-6 md:p-10">
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[{ label: "Total listings", value: vehicles.length }, { label: "Available", value: vehicles.filter((vehicle) => vehicle.status === "Available").length }, { label: "Reserved", value: vehicles.filter((vehicle) => vehicle.status === "Reserved").length }].map((stat) => <div key={stat.label} className="rounded-2xl border border-black/10 bg-white p-5"><p className="text-xs text-black/45">{stat.label}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{stat.value}</p></div>)}
          </div>

          <div className="rounded-2xl border border-black/10 bg-white">
            <div className="flex flex-col justify-between gap-4 border-b border-black/10 p-5 md:flex-row md:items-center"><div><h2 className="font-semibold">Listings</h2><p className="mt-1 text-sm text-black/45">Manage the vehicles shown on your storefront.</p></div><div className="flex gap-3"><label className="flex items-center gap-2 rounded-xl border border-black/10 px-3 text-sm"><Search size={15} className="text-black/35" /><span className="sr-only">Search listings</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-24 bg-transparent py-2 outline-none placeholder:text-black/35" /></label><button onClick={() => setEditing({ id: Date.now(), name: "", year: new Date().getFullYear(), price: "", mileage: "", status: "Available", category: "Sports", image: "" })} className="flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-2 text-sm font-medium text-white"><Plus size={15} /> Add vehicle</button></div></div>
            <div className="divide-y divide-black/10">{filtered.map((vehicle) => <div key={vehicle.id} className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"><div className="flex min-w-0 items-center gap-4"><div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-black/5">{vehicle.image && <img src={vehicle.image} alt="" className="h-full w-full object-cover" />}</div><div className="min-w-0"><p className="truncate font-medium">{vehicle.name || "Untitled vehicle"}</p><p className="mt-1 text-sm text-black/45">{vehicle.year} · {vehicle.mileage} · {vehicle.category}</p></div></div><div className="flex items-center justify-between gap-5 md:justify-end"><div className="text-right"><p className="font-medium">{vehicle.price || "Price TBD"}</p><span className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${vehicle.status === "Available" ? "bg-[#e5f1e8] text-[#397047]" : "bg-[#fff1d6] text-[#9a6a1b]"}`}>{vehicle.status}</span></div><button onClick={() => setEditing(vehicle)} aria-label={`Edit ${vehicle.name}`} className="rounded-lg p-2 text-black/45 hover:bg-black/5 hover:text-black"><Edit3 size={16} /></button><button onClick={() => removeVehicle(vehicle.id)} aria-label={`Delete ${vehicle.name}`} className="rounded-lg p-2 text-black/35 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div></div>)}</div>
          </div>
        </div>
      </section>

      {editing && <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 p-4"><form onSubmit={saveVehicle} className="w-full max-w-lg rounded-2xl bg-[#fafaf8] p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><div><h2 className="font-serif text-2xl font-semibold">{vehicles.some((vehicle) => vehicle.id === editing.id) ? "Edit vehicle" : "Add vehicle"}</h2><p className="mt-1 text-sm text-black/45">Update the listing details.</p></div><button type="button" onClick={() => setEditing(null)} aria-label="Close"><X size={20} /></button></div><div className="grid gap-4 sm:grid-cols-2"><label className="sm:col-span-2"><span className="mb-1 block text-xs font-medium text-black/55">Vehicle name</span><input required value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none focus:border-black/40" /></label><label><span className="mb-1 block text-xs font-medium text-black/55">Year</span><input required type="number" value={editing.year} onChange={(event) => setEditing({ ...editing, year: Number(event.target.value) })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none" /></label><label><span className="mb-1 block text-xs font-medium text-black/55">Price</span><input required value={editing.price} onChange={(event) => setEditing({ ...editing, price: event.target.value })} placeholder="$72,500" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none" /></label><label><span className="mb-1 block text-xs font-medium text-black/55">Mileage</span><input value={editing.mileage} onChange={(event) => setEditing({ ...editing, mileage: event.target.value })} placeholder="12,400 mi" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none" /></label><label><span className="mb-1 block text-xs font-medium text-black/55">Category</span><input value={editing.category} onChange={(event) => setEditing({ ...editing, category: event.target.value })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none" /></label><label className="sm:col-span-2"><span className="mb-1 block text-xs font-medium text-black/55">Image URL</span><input value={editing.image} onChange={(event) => setEditing({ ...editing, image: event.target.value })} placeholder="https://..." className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none" /></label><label><span className="mb-1 block text-xs font-medium text-black/55">Status</span><select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as Vehicle["status"] })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 outline-none"><option>Available</option><option>Reserved</option><option>Sold</option></select></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="rounded-xl px-4 py-2 text-sm text-black/55">Cancel</button><button className="flex items-center gap-2 rounded-xl bg-[#171717] px-4 py-2 text-sm font-medium text-white"><Check size={15} /> Save listing</button></div></form></div>}
      {saved && <div className="fixed bottom-6 right-6 rounded-xl bg-[#171717] px-4 py-3 text-sm text-white shadow-lg">Listing saved</div>}
    </main>
  )
}
