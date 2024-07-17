import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

export default function Component() {
    return (
        <div className='container mx-auto px-4 md:px-6 max-w-5xl py-12 h-[40rem] overflow-scroll'>
            <div className='grid gap-8'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='flex items-center gap-2 text-2xl font-bold'>
                        <div className='flex items-center gap-0.5'>
                            <StarIcon className='w-6 h-6 fill-primary' />
                            <StarIcon className='w-6 h-6 fill-primary' />
                            <StarIcon className='w-6 h-6 fill-primary' />
                            <StarIcon className='w-6 h-6 fill-muted stroke-muted-foreground' />
                            <StarIcon className='w-6 h-6 fill-muted stroke-muted-foreground' />
                        </div>
                        <span className='text-primary'>4.2</span>
                        <span className='text-muted-foreground'>
                            (124 reviews)
                        </span>
                    </div>
                    {/* <div className='flex flex-col items-center gap-2 w-full'>
                        <div className='flex items-center gap-0.5 w-full'>
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <div className='h-3 bg-primary rounded-full w-[50%]' />
                            <span className='text-muted-foreground text-sm'>
                                5
                            </span>
                        </div>
                        <div className='flex items-center gap-0.5 w-full'>
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <div className='h-3 bg-primary rounded-full w-[60%]' />
                            <span className='text-muted-foreground text-sm'>
                                12
                            </span>
                        </div>
                        <div className='flex items-center gap-0.5 w-full'>
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <div className='h-3 bg-primary rounded-full w-[75%]' />
                            <span className='text-muted-foreground text-sm'>
                                45
                            </span>
                        </div>
                        <div className='flex items-center gap-0.5 w-full'>
                            <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                            <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                            <div className='h-3 bg-muted-foreground rounded-full w-[32%]' />
                            <span className='text-muted-foreground text-sm'>
                                32
                            </span>
                        </div>
                        <div className='flex items-center gap-0.5 w-full'>
                            <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                            <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                            <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                            <div className='h-3 bg-muted-foreground rounded-full w-[30%]' />
                            <span className='text-muted-foreground text-sm'>
                                30
                            </span>
                        </div>
                    </div> */}
                </div>
                <div className='grid gap-6 '>
                    <h2 className='text-xl font-bold mb-4'>Customer Reviews</h2>
                    <div className='flex gap-4'>
                        <Avatar className='w-10 h-10 border'>
                            <AvatarImage src='/placeholder-user.jpg' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-2'>
                            <div className='flex items-center gap-2'>
                                <h3 className='font-medium'>Sarah Johnson</h3>
                                <span className='text-muted-foreground text-sm'>
                                    2 days ago
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                                    <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                                </div>
                                <span className='text-muted-foreground text-sm'>
                                    4.0
                                </span>
                            </div>
                            <p className='text-muted-foreground text-sm leading-loose'>
                                I've been using these headphones for a few weeks
                                now and they've been a great addition to my
                                daily routine. The noise cancellation works
                                really well, and the battery life is impressive.
                                The only downside is that they can feel a bit
                                tight after wearing them for an extended period.
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Avatar className='w-10 h-10 border'>
                            <AvatarImage src='/placeholder-user.jpg' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-2'>
                            <div className='flex items-center gap-2'>
                                <h3 className='font-medium'>Alex Smith</h3>
                                <span className='text-muted-foreground text-sm'>
                                    3 weeks ago
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                                    <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                                </div>
                                <span className='text-muted-foreground text-sm'>
                                    4.0
                                </span>
                            </div>
                            <p className='text-muted-foreground text-sm leading-loose'>
                                These headphones have been a game-changer for
                                me. The sound quality is incredible, and the
                                noise cancellation is top-notch. I use them for
                                both work and leisure, and they've held up
                                remarkably well. The only minor issue I've
                                encountered is that the controls can be a bit
                                finicky at times.
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Avatar className='w-10 h-10 border'>
                            <AvatarImage src='/placeholder-user.jpg' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-2'>
                            <div className='flex items-center gap-2'>
                                <h3 className='font-medium'>Emily Parker</h3>
                                <span className='text-muted-foreground text-sm'>
                                    2 days ago
                                </span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-0.5'>
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-primary' />
                                    <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                                    <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                                    <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                                </div>
                                <span className='text-muted-foreground text-sm'>
                                    3.0
                                </span>
                            </div>
                            <p className='text-muted-foreground text-sm leading-loose'>
                                I was a bit disappointed with these headphones.
                                While the sound quality is decent, the noise
                                cancellation isn't as effective as I had hoped.
                                They also feel a bit bulky and uncomfortable
                                after wearing them for a while. I may need to
                                look for a more lightweight and comfortable
                                option.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
