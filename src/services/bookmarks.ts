export type Bookmark = {
  title: string;
  link: string;
};

export const getBookmarks = () => {
  return [
    {
      title: "some title",
      link: "link",
    },
    {
      title: "some title",
      link: "link",
    },
  ];
};
