const myform = document.getElementById("myform");
myform.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  const siteName = document.getElementById("siteName").value;
  const url = document.getElementById("url").value;
  let bookmark = [
    {
      name: siteName,
      url: url
    }
  ];

  console.log(bookmark);
}
