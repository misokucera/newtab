export const getFaviconUrl = (url: string): string => {
    // @ts-ignore
    if (chrome !== undefined) {
        return `https://www.google.com/s2/favicons?domain=${url}&sz=24`;
    } else {
        return `chrome://favicon/${url}`;
    }
};
