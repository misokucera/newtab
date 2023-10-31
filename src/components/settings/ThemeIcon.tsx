import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const variants = cva(
    "h-4 w-4 rounded-full bg-gradient-to-br opacity-70 transition-all",
    {
        variants: {
            color: {
                light: "from-amber-200 to-amber-400",
                dark: "from-stone-200 to-stone-400",
            },
        },
    },
);

type Props = { active?: boolean } & VariantProps<typeof variants>;

const ThemeIcon = ({ active = false, color }: Props) => {
    return (
        <div
            className={twMerge(
                classNames(variants({ color }), {
                    "rotate-45 opacity-100": active,
                }),
            )}
        ></div>
    );
};

export default ThemeIcon;
