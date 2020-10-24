import { isDev } from "./environment";

export const getFaviconUrl = (url: string): string => {
    if (isDev()) {
        return `https://www.google.com/s2/favicons?domain=${url}&sz=24`;
    } else {
        return `chrome://favicon/${url}`;
    }
};
