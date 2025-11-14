import Navbar from '../components/Navbar'
import PortfolioGrid from '../components/PortfolioGrid'

function Portfolio() {
  return (
    <div>
      <Navbar />
      <section className="pt-28">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Portfolio</h1>
        </div>
      </section>
      <PortfolioGrid />
    </div>
  )
}

export default Portfolio
