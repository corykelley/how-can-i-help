console.log('js working!');
// Search API
const searchInput = document.querySelector('.search-input');
const searchSubmit = document.getElementById('search-submit');
const searchContainer = document.querySelector('.search-contain');

searchSubmit.addEventListener('click', e => {
  e.preventDefault();
  let value = searchInput.value;
  value = sParameter = encodeURIComponent(value.trim());
  console.log(value);
  fetch(
    `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&title=${value}&site=stackoverflow`
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
        searchContainer.append(searchItem);
      });
    })
    .catch(err => {
      console.log(err);
    });
});
