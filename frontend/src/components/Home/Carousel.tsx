import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { bannerContent } from "@/lib/constants";

export default function HomeCarousel() {
    return (
        <section className='w-full'>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className='w-full'
            >
                <CarouselContent>
                    {bannerContent.map((banner) => (
                        <CarouselItem>
                            <div className='relative w-full h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden'>
                                <img
                                    alt='Banner 1'
                                    className='w-full h-full object-cover'
                                    height={1080}
                                    src='/placeholder.svg'
                                    style={{
                                        aspectRatio: "1920/1080",
                                        objectFit: "cover",
                                    }}
                                    width={1920}
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent' />
                                <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center space-y-6 md:space-y-8 text-secondary-foreground/75'>
                                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight dark:text-primary/75'>
                                        {banner.title}
                                    </h1>
                                    <p className='text-lg md:text-xl lg:text-2xl max-w-[800px] line-clamp-2 dark:text-secondary'>
                                        {banner.description}
                                    </p>
                                    <div className='flex gap-4'>
                                        <Link to={banner.buttonLink}>
                                            <Button variant='secondary'>
                                                {banner.buttonText}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2 z-10 text-primary/75 hover:text-primary transition-colors'>
                    <ChevronLeftIcon className='h-8 w-8' />H
                </CarouselPrevious>
                <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2 z-10 text-primary/75 hover:text-primary transition-colors'>
                    <ChevronRightIcon className='h-8 w-8' />
                </CarouselNext>
            </Carousel>
        </section>
    );
}
