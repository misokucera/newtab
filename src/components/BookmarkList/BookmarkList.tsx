import { getBookmarks } from "../../services/bookmarks";
import * as React from "react";

export const BookmarkList = () => {
  const bookmarks = getBookmarks();

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div>{bookmark.title}</div>
      ))}
    </div>
  );
};
