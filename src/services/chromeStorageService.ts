import { ILinkItem } from '../interfaces/ILinkItem';

const STORAGE_KEY = 'quickLinks';

export const addLink = async (link: ILinkItem): Promise<void> => {
    const existingLinks = await getAllLinks();
    const newId = Date.now().toString();
    const newLink = { ...link, id: newId };

    const updatedLinks = [...existingLinks, newLink];
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: updatedLinks }, () => resolve());
    });
};

export const getAllLinks = async (): Promise<ILinkItem[]> => {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            resolve(result[STORAGE_KEY] || []);
        });
    });
};

export const updateLink = async (id: string, updatedData: Partial<ILinkItem>): Promise<void> => {
    const links = await getAllLinks();
    const updatedLinks = links.map(link =>
        link.id === id ? { ...link, ...updatedData } : link
    );
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: updatedLinks }, () => resolve());
    });
};

export const deleteLink = async (id: string): Promise<void> => {
    const links = await getAllLinks();
    const filteredLinks = links.filter(link => link.id !== id);
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: filteredLinks }, () => resolve());
    });
};
