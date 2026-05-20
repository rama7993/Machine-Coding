const url = "https://jsonplaceholder.typicode.com/posts";
let posts = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    posts = data;
    displayPosts(posts);
  });

function displayPosts(data) {
  const list = document.getElementById("postList");
  const resultCount = document.getElementById("resultCount");

  resultCount.textContent = `Showing ${data.length} of ${posts.length} results`;

  if (data.length === 0) {
    list.innerHTML = `<p class="no-results">No posts found</p>`;
    return;
  }

  list.innerHTML = data
    .map(
      (post) => `
    <li>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </li>
  `,
    )
    .join("");
}

document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchText = e.target.value.toLowerCase();

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchText) ||
      post.body.toLowerCase().includes(searchText),
  );

  displayPosts(filteredPosts);
});
