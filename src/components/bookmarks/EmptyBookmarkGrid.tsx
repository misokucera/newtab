import GroupSelectCard from "./GroupSelectCard";

const EmptyBookmarkGrid = () => {
    return (
        <div className="my-7 flex flex-col items-center gap-12 text-gray-600">
            <div className="text-center">
                <p className="mb-5 text-2xl font-bold">
                    It would be nice to have
                    <br /> some groups here
                </p>
                <p>Add a new group by clicking the button below</p>
            </div>

            <GroupSelectCard />
        </div>
    );
};

export default EmptyBookmarkGrid;
