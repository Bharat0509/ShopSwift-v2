// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

// const HomeCarousel = () => {
//     return (
//         <div className='px-4 md:px-6 mx-auto'>
//             <Carousel showArrows={true} autoPlay showThumbs={false}>
//                 {/* <div>
//                     <img
//                         src='https://mobirise.com/extensions/commercem4/assets/images/gallery01.jpg'
//                         className='h-96 md:h-[75vh] bg-cover object-cover object-center'
//                     />
//                 </div>
//                 <div>
//                     <img
//                         src='https://mobirise.com/extensions/commercem4/assets/images/gallery03.jpg'
//                         className='h-96 md:h-[75vh] bg-cover object-cover'
//                     />
//                 </div>
//                 <div>
//                     <img
//                         src='https://mobirise.com/extensions/commercem4/assets/images/gallery05.jpg'
//                         className='h-96 md:h-[75vh] bg-cover object-cover'
//                     />
//                 </div> */}
//                 <div className='h-96'>
//                     <img
//                         src='https://img.freepik.com/free-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?w=1060'
//                         alt=''
//                         className='h-96 object-cover'
//                     />
//                 </div>
//                 <div>
//                     <img
//                         src='https://img.freepik.com/premium-vector/black-friday-online-shopping-banner-online-shopping-mobile-phone-website-banner_42705-121.jpg?w=1060'
//                         alt=''
//                         className='h-96 object-cover'
//                     />
//                 </div>
//                 <div>
//                     <img
//                         src='https://img.freepik.com/free-vector/hand-drawn-thrift-store-banner-design_23-2150007708.jpg?w=1060'
//                         alt=''
//                         className='h-96 object-cover'
//                     />
//                 </div>
//                 <div>
//                     <img
//                         src='https://img.freepik.com/premium-vector/fashion-week-banner-template-promotion-fashion-banner_122059-223.jpg?w=1060'
//                         alt=''
//                         className='h-96 object-cover'
//                     />
//                 </div>
//                 <div>
//                     <img
//                         src='https://img.freepik.com/free-vector/fashion-week-template-design_52683-150895.jpg?w=1060'
//                         alt=''
//                         className='h-96 object-cover'
//                     />
//                 </div>
//             </Carousel>
//         </div>
//     );
// };

// export default HomeCarousel;
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
                                    Discover the Future of Web Development
                                </h1>
                                <p className='text-lg md:text-xl lg:text-2xl max-w-[800px] line-clamp-2 dark:text-secondary'>
                                    Unlock the power of our cutting-edge
                                    platform and revolutionize the way you build
                                    and deploy your web applications.
                                </p>
                                <div className='flex gap-4'>
                                    <Link to='/account/cart'>
                                        <Button variant='secondary'>
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
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
