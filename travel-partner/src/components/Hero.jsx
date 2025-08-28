import SearchForm from './SearchForm'

const bgUrl = 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2580&auto=format&fit=crop'

function Hero() {
  return (
    <section
      className="relative h-[60vh] sm:h-[70vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mb-4 text-white">
          <h1 className="text-3xl font-semibold sm:text-4xl">Find your perfect travel partner</h1>
          <p className="mt-1 text-sm sm:text-base text-white/90">Join multi-day trips planned by riders. Save money, meet people, and explore more.</p>
        </div>
        <SearchForm />
      </div>
    </section>
  )
}

export default Hero

