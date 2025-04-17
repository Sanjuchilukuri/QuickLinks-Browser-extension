import * as SupabaseService from './linkServices';
import * as ChromeStorageService from './chromeStorageService';
import { ILinkItem } from '../interfaces/ILinkItem';
import UseAuth from '../Hooks/UseAuth';
import { AuthType } from '../enum';

export const useLinkService = () => {
    const { isAuthenticated, user, authType } = UseAuth();


    const addLink = async (link: ILinkItem) => {
        return isAuthenticated && authType == AuthType.Github
            ? SupabaseService.addLink(link)
            : ChromeStorageService.addLink(link);
    };

    const getAllLinks = async (): Promise<ILinkItem[]> => {
        return isAuthenticated && authType == AuthType.Github
            ? SupabaseService.getAllLinks(user.userEmail)
            : ChromeStorageService.getAllLinks();
    };

    const updateLink = async (id: string, updatedData: Partial<ILinkItem>) => {
        return isAuthenticated && authType == AuthType.Github
            ? SupabaseService.updateLink(id, updatedData)
            : ChromeStorageService.updateLink(id, updatedData);
    };

    const deleteLink = async (id: string) => {
        return isAuthenticated && authType == AuthType.Github
            ? SupabaseService.deleteLink(id)
            : ChromeStorageService.deleteLink(id);
    };

    return { addLink, getAllLinks, updateLink, deleteLink };
};
