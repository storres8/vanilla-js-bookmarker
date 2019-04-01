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

  if (!siteName || !url) {
    alert("Please fill in the form");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!url.match(regex)) {
    alert("Please provide a valid url");
    return false;
  }

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

  fetchBookmarks();

  document.getElementById("myform").reset();
}

function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  let results = document.getElementById("results");

  results.innerHTML = "";

  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    results.innerHTML +=
      "<div class='border mb-3'>" +
      "<h3 class='font-weight-light mt-2' >" +
      "<span class='ml-1 mt-1 mr-3'>" +
      name +
      "</span>" +
      '<a href="' +
      url +
      '"class="btn btn-outline-primary mr-2"> Visit </a>' +
      "<a onClick='deleteBookmark(\"" +
      url +
      "\")' href ='#' class='btn btn-outline-danger'> Delete </a>" +
      "<a></a>" +
      "</h3>" +
      "</div>";
  }
}
