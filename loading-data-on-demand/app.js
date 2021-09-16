const postsContainer = document.getElementById("posts");
const btnLoading = document.getElementById("btn-load-more");

//total page and limit data
let limit = 6;
let page = 1;

// get posts from jsonplaceholder api
async function getPosts() {
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Show posts in DOM
async function renderPost() {
  const posts = await getPosts();
  if (!posts.length) return false;

  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const carDiv = document.createElement("div");
    carDiv.classList.add("card");
    carDiv.innerHTML = `<h2 class="card-title">${post.title}</h2><p class="card-body">${post.body}</p>`;
    fragment.appendChild(carDiv);
  });

  postsContainer.appendChild(fragment);
  totalPostCount();

  return true;
}

// btn load more click
btnLoading.addEventListener("click", function () {
  this.textContent = "loading data...";
  this.disabled = true;

  setTimeout(async () => {
    page++;
    const isData = await renderPost();

    this.textContent = isData ? "Load More" : "No More Data";
    this.disabled = isData ? false : true;
  }, 1000);
});

//render post count
function totalPostCount() {
  const countTotal = document.getElementById("count-total-post");
  countTotal.textContent = `Total Post: ${page * limit}`;
}

// render initial posts
renderPost();
