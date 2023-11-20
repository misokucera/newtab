const supportsChromeRuntime = () => chrome?.runtime !== undefined;

export const getFaviconUrl = (url: string): string => {
    if (supportsChromeRuntime()) {
        return getLocalFaviconUrl(url);
    } else {
        return `https://www.google.com/s2/favicons?domain=${url}&sz=24`;
    }
};

const getLocalFaviconUrl = (page: string) => {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));

    url.searchParams.set("pageUrl", page);
    url.searchParams.set("size", "32");

    return url.toString();
};
