import React from "react";
import {BookmarkGrid} from "./components/BookmarkGrid/BookmarkGrid";

const bookmarkTreeIds = ["419", "425"];

function App() {
  return <BookmarkGrid treeIds={bookmarkTreeIds} />;
}

export default App;
