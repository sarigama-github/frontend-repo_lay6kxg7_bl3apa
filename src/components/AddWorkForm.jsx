import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function AddWorkForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    year: '',
    location: '',
    cover_image: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    try {
      const payload = {
        ...form,
        year: form.year ? Number(form.year) : null,
        gallery: [],
      }
      const res = await fetch(`${BACKEND}/api/works`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Errore durante il salvataggio')
      const data = await res.json()
      setStatus('saved')
      setForm({ title: '', description: '', year: '', location: '', cover_image: '' })
    } catch (e) {
      setStatus(`error:${e.message}`)
    }
  }

  return (
    <section className="pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Aggiungi un nuovo lavoro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titolo</label>
            <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrizione</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md" rows={4} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Anno</label>
              <input name="year" type="number" value={form.year} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md" min={1900} max={2100} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Luogo</label>
              <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Immagine di copertina (URL)</label>
            <input name="cover_image" value={form.cover_image} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black">Salva</button>
            {status === 'saving' && <span className="text-gray-500">Salvataggio…</span>}
            {status === 'saved' && <span className="text-green-600">Salvato!</span>}
            {status?.startsWith('error:') && <span className="text-red-600">{status.replace('error:', '')}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddWorkForm
