console.log('js working!');
// Search API
const titleInput = document.querySelector('.title-input');
const bodyInput = document.querySelector('.body-input');
const searchSubmit = document.getElementById('search-submit');
const searchResults = document.querySelector('.search-results');

//Clear all children
const clearChildren = () => {
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.lastChild);
  }
};

searchSubmit.addEventListener('click', e => {
  e.preventDefault();
  clearChildren();
  let titleValue = titleInput.value;
  let bodyValue = bodyInput.value;
  titleValue = sParameter = encodeURIComponent(titleValue.trim());
  bodyValue = sParameter = encodeURIComponent(bodyValue.trim());
  console.log(titleValue);
  console.log(bodyValue);
  fetch(
    `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&body=${bodyValue}&title=${titleValue}&site=stackoverflow`
  )
    .then(res => res.json())
    .then(data => data.items)
    .then(items => {
      items.forEach(item => {
        const title = document.createElement('h4');
        title.innerText = `+ ${item.title}`;
        const link = document.createElement('a');
        link.setAttribute('href', item.link);
        link.innerText = 'Link';
        link.classList.add('button-style');
        const searchItem = document.createElement('div');
        searchItem.classList.add('search-item');
        searchItem.append(title);
        searchItem.append(link);
        searchResults.append(searchItem);
      });
    })
    .catch(err => {
      console.log(err);
    });
});
