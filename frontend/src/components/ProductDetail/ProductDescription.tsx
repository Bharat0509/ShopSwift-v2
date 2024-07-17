import {  BriefcaseIcon, CalendarIcon, CheckIcon, ClockIcon, LockIcon, RulerIcon, ScaleIcon, StarIcon, TruckIcon, UmbrellaIcon } from "lucide-react";


export default function Description() {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <section className='relative overflow-hidden rounded-lg w-full'>
                <div className='absolute inset-0 bg-gradient-to-t from-background to-transparent' />
            </section>
            <div className='container mx-auto px-0 py-12 md:px-6 md:py-20 lg:py-24 flex flex-col items-center'>
                <div className='md:w-3/4 grid gap-8 md:grid-cols-1 md:gap-12 lg:gap-16 '>
                    <div>
                        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
                            Handcrafted Leather Messenger Bag
                        </h1>
                        <p className='mt-4 text-muted-foreground md:text-lg'>
                            Crafted from the finest Italian leather, this
                            messenger bag is a timeless accessory that combines
                            style and functionality. With its adjustable strap
                            and spacious interior, it's the perfect companion
                            for your daily commute or weekend adventures.
                        </p>
                        <div className='mt-8 grid gap-4 w-full'>
                            <div className='flex items-center gap-2'>
                                <StarIcon className='h-5 w-5 fill-primary' />
                                <StarIcon className='h-5 w-5 fill-primary' />
                                <StarIcon className='h-5 w-5 fill-primary' />
                                <StarIcon className='h-5 w-5 fill-primary' />
                                <StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    4.2 out of 5 stars
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <ClockIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    In stock. Ships within 1-2 business days.
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <TruckIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    Free shipping on orders over $50.
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CalendarIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    1-year limited warranty
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <RulerIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    Dimensions: 15" x 11" x 4"
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <ScaleIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    Weight: 3 lbs
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <BriefcaseIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    Capacity: 15" laptop, tablet, and more
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <LockIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    Secure magnetic snap closure
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <UmbrellaIcon className='h-5 w-5 fill-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    Water-resistant leather exterior
                                </span>
                            </div>
                            
                        </div>
                    </div>
                    <div className='grid gap-4 md:w-2/3 gap-y-12'>
                        <div className='grid gap-2'>
                            <h2 className='text-xl font-bold'>
                                Product Specifications
                            </h2>
                            <div className='grid gap-1 text-muted-foreground '>
                                <div className='flex justify-between'>
                                    <span>Material</span>
                                    <span>100% Italian Leather</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Strap Length</span>
                                    <span>Adjustable, 20" - 50"</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Care</span>
                                    <span>Spot clean with a damp cloth</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Hardware</span>
                                    <span>Solid brass hardware</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Lining</span>
                                    <span>100% cotton twill lining</span>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <h2 className='text-xl font-bold'>Features</h2>
                            <ul className='grid gap-1 text-muted-foreground'>
                                <li className='flex items-start gap-2'>
                                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-primary' />
                                    <span>
                                        Adjustable, padded shoulder strap for
                                        comfort
                                    </span>
                                </li>
                                <li className='flex items-start gap-2'>
                                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-primary' />
                                    <span>
                                        Multiple interior pockets and
                                        compartments for organization
                                    </span>
                                </li>
                                <li className='flex items-start gap-2'>
                                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-primary' />
                                    <span>
                                        Durable, water-resistant Italian leather
                                        exterior for all-weather protection
                                    </span>
                                </li>
                                <li className='flex items-start gap-2'>
                                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-primary' />
                                    <span>
                                        Reinforced bottom with metal feet for
                                        added stability and protection
                                    </span>
                                </li>
                                <li className='flex items-start gap-2'>
                                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-primary' />
                                    <span>
                                        Magnetic snap closure for easy access
                                        and secure closure
                                    </span>
                                </li>
                                <li className='flex items-start gap-2'>
                                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-primary' />
                                    <span>
                                        Handcrafted with premium Italian leather
                                        for long-lasting durability
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className='grid gap-2'>
                            <h2 className='text-xl font-bold'>
                                Laptop Specifications
                            </h2>
                            <div className='grid gap-1 text-muted-foreground'>
                                <div className='flex justify-between'>
                                    <span>Brand</span>
                                    <span>Acme Laptop</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Display</span>
                                    <span>15.6" FHD IPS</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Processor</span>
                                    <span>Intel Core i7-11800H</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>RAM</span>
                                    <span>16GB DDR4</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Storage</span>
                                    <span>512GB SSD</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Graphics</span>
                                    <span>NVIDIA GeForce RTX 3060</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
