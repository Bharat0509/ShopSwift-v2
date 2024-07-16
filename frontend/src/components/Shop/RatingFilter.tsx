import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Star } from "lucide-react";

type RatingFilterProps = {
    setFilters: React.Dispatch<
        React.SetStateAction<{
            rating: number;
            categories: string;
            sort: number;
        }>
    >;
};

export const RatingFilter: React.FC<RatingFilterProps> = ({ setFilters }) => (
    <div className='space-y-2'>
        <Label>
            Ratings More than
            <Separator className='mt-2' />
        </Label>
        <RadioGroup
            onValueChange={(val) =>
                setFilters((prev) => ({ ...prev, rating: Number(val) }))
            }
            className='flex flex-col space-y-1'
        >
            {[1, 2, 3, 4].map((rating) => (
                <div key={rating} className='flex items-center space-x-3'>
                    <RadioGroupItem value={rating.toString()} />
                    <Label className='flex gap-2'>
                        {Array.from({ length: rating }, (_, i) => (
                            <Star key={i} size={16} />
                        ))}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    </div>
);
