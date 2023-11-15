import { useGroup } from "../../hooks/useGroup";
import Card from "../ui/Card";
import Title from "../ui/Title";

type Props = {
    treeId: string;
};

const BookmarkGroupOverlay = ({ treeId }: Props) => {
    const { title } = useGroup(treeId);

    return (
        <Card className="cursor-grabbing shadow-xl">
            <Title className="mb-3 truncate">{title}</Title>
            <div className="mb-5 flex flex-col gap-2 px-3">
                <div className="h-4 w-9/12 rounded-full bg-gray-200 dark:bg-slate-500"></div>
                <div className="h-4 w-7/12 rounded-full bg-gray-200 dark:bg-slate-500"></div>
                <div className="h-4 w-11/12 rounded-full bg-gray-200 dark:bg-slate-500"></div>
                <div className="h-4 w-8/12 rounded-full bg-gray-200 dark:bg-slate-500"></div>
                <div className="h-4 w-7/12 rounded-full bg-gray-200 dark:bg-slate-500"></div>
                <div className="h-4 w-10/12 rounded-full bg-gray-200 dark:bg-slate-500"></div>
            </div>
        </Card>
    );
};

export default BookmarkGroupOverlay;
