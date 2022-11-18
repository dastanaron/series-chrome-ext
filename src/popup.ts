import Storage from "./libraries/Storage";
import {getHash} from "./libraries/Hash";

document.addEventListener('DOMContentLoaded', async function () {
    const form = document.querySelector<HTMLFormElement>('#form')!;
    const searchLink = document.querySelector<HTMLLinkElement>('#search')!;

    const searchPage = chrome.runtime.getURL("search.html");
    searchLink.setAttribute('href', searchPage);

    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const currentUrl = tabs[0].url;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        formData.set('url', currentUrl || '');

        const name = formData.has('name') ? formData.get('name')!.toString() : '';

        await Storage.add({
            id: await getHash(name),
            url: formData.has('url') ? formData.get('url')!.toString() : '',
            name: name,
            season: formData.has('season') ? parseInt(formData.get('season')!.toString()) : 0,
            episode: formData.has('episode') ? parseInt(formData.get('episode')!.toString()) : 0,
        });
        window.close();
    })
});
