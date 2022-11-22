import {SeriesInfo, StorageEntities} from "../contracts/SeriesEntities";
import {getHash} from "./Hash";

const SERIES_KEY = 'series';

export class Storage {
  private storage: chrome.storage.SyncStorageArea;
  constructor() {
    this.storage = chrome.storage.sync;
  }

  async add(info: SeriesInfo): Promise<void> {
    const data: StorageEntities | undefined = await this.storage.get([SERIES_KEY]);

    if (!data[SERIES_KEY]) {
      data[SERIES_KEY] = [];
      await this.storage.set(data);
    }

    const foundIndex = await this.findById(await getHash(info.name));

    if (foundIndex > -1) {
      data[SERIES_KEY].splice(foundIndex, 1);
    }

    data[SERIES_KEY].push(info);
    await this.storage.set(data);
  }

  async getAll(): Promise<SeriesInfo[]> {
    const data: StorageEntities = await this.storage.get([SERIES_KEY]);
    return data[SERIES_KEY] || [];
  }

  async removeById(id: string): Promise<void> {
    const data: StorageEntities = await this.storage.get([SERIES_KEY]);

    data[SERIES_KEY].forEach((series, index) => {
      if (series.id === id) {
        data[SERIES_KEY].splice(index, 1);
      }
    })

    await this.storage.set(data);
  }

  async find(keyword: string): Promise<SeriesInfo[]> {
    const data = await this.getAll();
    const found: SeriesInfo[] = [];

    data.forEach((series) => {
      const pattern = new RegExp(`${keyword}`, 'gmi')
      if (series.name.search(pattern) > -1) {
        found.push(series);
      }
    })

    return found;
  }

  async findByUrl(url: string): Promise<SeriesInfo | null> {
    const data = await this.getAll();

    for (const series of data) {
      if (series.url === url) {
        return series;
      }
    }

    return null
  }

  async findById(id: string): Promise<number> {
    const data = await this.getAll();

    let foundIndex = -1;

    data.forEach((series, index) => {
      if (series.id === id) {
        foundIndex = index;
      }
    })

    return foundIndex;
  }
}

export default new Storage();
