let searchString;
const title = document.getElementById('title');
const summary = document.getElementById('summary');
const apiEndpoint = 'https://en.wikipedia.org/w/api.php';
const params =
  'format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';

async function fetchArticle(query) {
  try {
    if (!query) {
      searchString = 'API';
    } else {
      searchString = query.toLowerCase();
    }
    const response = await fetch(apiEndpoint + '?' + params + searchString);

    const fetchData = await response.json();
    const articleID = Object.keys(fetchData.query.pages);

    title.innerText = fetchData.query.pages[`${articleID}`].title;
    summary.innerText = fetchData.query.pages[`${articleID}`].extract;
  } catch (error) {
    title.innerText = `There has been a problem with your fetch operation:${error}`;
    summary.innerText = 'Do you remember Microsoft Encarta?';
  }
}

const search = (() => {
  const searchbar = document.querySelector('input');
  const searchButton = document.getElementById('searchBtn');

  searchButton.addEventListener('click', () => {
    const query = searchbar.value;
    searchbar.value = '';
    fetchArticle(query);
  });

  searchbar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchButton.click();
    }
  });
})();

fetchArticle();
