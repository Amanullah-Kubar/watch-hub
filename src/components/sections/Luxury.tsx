import ProductCard from "../ProductCard";

function Luxury() {

    return (
        <>
            <section className="py-16 px-6 text-center">
                <h3 className="text-3xl md:text-4xl font-serif text-[#F8F5F0] mb-6">
                    The Essence of Luxury
                </h3>
                <div className=" flex flex-wrap justify-center gap-8 max-w-8xl mx-auto text-[#F8F5F0]/70 leading-7 text-sm md:text-base">
                    <ProductCard />
                </div>
            </section>



        </>
    )
}

export default Luxury
