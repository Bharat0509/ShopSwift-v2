import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { CheckedState } from "@radix-ui/react-checkbox";

type CategoryFilterProps = {
    filters: {
        categories: string;
    };
    handleCheckedChange: (id: string, checked: CheckedState) => void;
};

const categories = [
    { id: "all", label: "All" },
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "books", label: "Books" },
    { id: "home_appliances", label: "Home Appliances" },
    { id: "sports_outdoors", label: "Sports & Outdoors" },
    { id: "health_beauty", label: "Health & Beauty" },
] as const;

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    filters,
    handleCheckedChange,
}) => (
    <div className='mb-4 space-y-2'>
        <Label className='text-base'>
            Select Category
            <Separator className='mt-2' />
        </Label>
        <div className='space-y-2'>
            {categories.map((item) => (
                <div
                    key={item.id}
                    className='flex flex-row items-start space-x-3'
                >
                    <Checkbox
                        checked={filters.categories.includes(item.id)}
                        onCheckedChange={(checked: CheckedState) =>
                            handleCheckedChange(item.id, checked)
                        }
                    />
                    <Label className='font-normal'>{item.label}</Label>
                </div>
            ))}
        </div>
    </div>
);
