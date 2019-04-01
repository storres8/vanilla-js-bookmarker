const myform = document.getElementById("myform");
myform.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  const siteName = document.getElementById("siteName").value;
  const url = document.getElementById("url").value;

  let bookmark = {
    name: siteName,
    url: url
  };

  // initialize localstorage
  if (localStorage.getItem("bookmarks") === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}
