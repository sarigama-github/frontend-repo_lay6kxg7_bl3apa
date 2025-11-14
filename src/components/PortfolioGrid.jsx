import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function PortfolioGrid() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/works`)
        const data = await res.json()
        setWorks(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchWorks()
  }, [])

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Progetti recenti</h2>
        {loading ? (
          <p className="text-gray-500">Caricamento…</p>
        ) : works.length === 0 ? (
          <p className="text-gray-500">Nessun progetto ancora. Aggiungine uno dalla pagina "Aggiungi Lavoro".</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {works.map((w) => (
              <div key={w.id} className="group rounded-lg overflow-hidden border border-gray-200 bg-white">
                {w.cover_image ? (
                  <img src={w.cover_image} alt={w.title} className="aspect-[4/3] w-full object-cover group-hover:opacity-90" />
                ) : (
                  <div className="aspect-[4/3] w-full bg-gray-100 grid place-items-center text-gray-400">No image</div>
                )}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{w.title}</h3>
                  {w.location && <p className="text-sm text-gray-500">{w.location}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PortfolioGrid
