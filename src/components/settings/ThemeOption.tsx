import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import ThemeIcon from "./ThemeIcon";
import { ReactNode } from "react";
import { Theme } from "../../contexts/ThemeContext";

type Props = {
    value: Theme;
    color: "light" | "dark";
    children: ReactNode;
};

const ThemeOption = ({ value, color, children }: Props) => {
    return (
        <RadioGroup.Option
            value={value}
            className="rounded-full focus-visible:shadow-focus focus-visible:outline-none"
        >
            {({ checked }) => (
                <div
                    className={classNames(
                        "flex cursor-pointer items-center gap-2 rounded-full py-1 pl-3 pr-4 text-sm text-gray-800 hover:bg-white dark:text-gray-300 dark:hover:bg-slate-700",
                        { "bg-white dark:bg-slate-700": checked },
                    )}
                >
                    <ThemeIcon color={color} active={checked} />
                    {children}
                </div>
            )}
        </RadioGroup.Option>
    );
};

export default ThemeOption;
