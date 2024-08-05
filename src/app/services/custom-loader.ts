import { ImageLoaderConfig } from "@angular/common";

export const myCustomLoader = (config: ImageLoaderConfig) => {
    let url = `https://bakejoli.blob.core.windows.net/bakecontainer/${config.src}?`;
    let queryParams = [];
    if (config.width) {
      queryParams.push(`w=${config.width}`);
    }
    if (config.loaderParams?.['roundedCorners']) {
      queryParams.push('mask=corners&corner-radius=5');
    }
    return url + queryParams.join('&');
  };