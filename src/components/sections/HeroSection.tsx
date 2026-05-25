
function HeroSection() {
    return (
        <section className="relative flex items-center justify-start h-[87vh] px-6 text-center" style={{ backgroundImage: 'url(/src/assets/hero.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className=" hover:cursor-pointer max-w-4xl space-y-8">
                <p className="uppercase tracking-[0.45em] text-[#D6B98C]/70 text-xs md:text-sm">
                    Style In Every Tick
                </p>

                <h2 style={{ fontFamily: 'Nikanely' }} className="text-5xl md:text-7xl leading-tight  text-[#F8F5F0]">
                    Luxury Inspired Watches
                    <span className="block text-[#D6B98C] italic mt-2">
                        for Everyday Wear
                    </span>
                </h2>

                <p className="text-[#F8F5F0]/60 max-w-2xl mx-auto leading-8 text-sm md:text-base">
                    Discover stylish, reliable, and modern watches crafted for everyday confidence without overspending. Premium aesthetics, durable quality, and prices that actually make sense.
                </p>
            </div>
        </section>
    )
}

export default HeroSection
