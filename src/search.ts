import Storage from "./libraries/Storage";
import {SeriesInfo} from "./contracts/SeriesEntities";

document.addEventListener('DOMContentLoaded', async () => {
  const searchButton = document.querySelector<HTMLInputElement>('#searchButton')!;
  const resetButton = document.querySelector<HTMLInputElement>('#resetButton')!;

  resetButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const data = await Storage.getAll();
    renderResult(data);
  });

  searchButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const search = document.querySelector<HTMLInputElement>('#search')!;
    const data = await Storage.find(search.value);
    renderResult(data);
  })

  const data = await Storage.getAll();

  renderResult(data);

});

function renderResult(data: SeriesInfo[]) {
  const result = document.querySelector('#result')!;

  document.querySelectorAll<HTMLButtonElement>('button.delete').forEach((button) => {
    button.removeEventListener('click', handleClickDeleteButton);
  })

  let html = '';

  if (data.length === 0) {
    html = '<tr><td colspan="6">Not found</td></tr>'
  }

  data.forEach((value, index) => {
    html += `<tr><td>${index + 1}</td><td>${value.name}</td><td>${value.season}</td><td>${value.episode}</td><td><a href="${value.url}" target="_blank">Go to...</a></td><td><button class="delete" data-id="${value.id}" type="button">delete</button></td></tr>`
  })

  result.innerHTML = html;

  document.querySelectorAll<HTMLButtonElement>('button.delete').forEach((button, index) => {
    button.addEventListener('click', handleClickDeleteButton);
  })
}

async function handleClickDeleteButton(this: HTMLButtonElement, event: MouseEvent) {
  event.preventDefault();

  const answer = confirm('Are you sure delete element?');

  if (!answer) {
    return;
  }

  const id = this.dataset['id'];

  if (id) {
    await Storage.removeById(id);
    const data = await Storage.getAll();
    renderResult(data);
  }
}
