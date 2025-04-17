import { createContext, useEffect, useState, ReactNode } from "react";
import { ILinkItem } from "../interfaces/ILinkItem";
import { useLinkService } from "../services/serviceInterpreter";

interface ILinksContext {
  allLinks: ILinkItem[];
  addLink: (link: ILinkItem) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  getAllLinks: () => Promise<void>;
  updateLink: (id: string, updatedData: Partial<ILinkItem>) => Promise<void>;
}

export const LinksContext = createContext({} as ILinksContext);

interface ILinksProviderProps {
  children: ReactNode;
}

export function LinksContextProvider({ children }: ILinksProviderProps) {
  const { addLink: serviceAddLink, deleteLink: serviceDeleteLink, getAllLinks: serviceGetAllLinks, updateLink: serviceUpdateLink } = useLinkService();
  const [allLinks, setAllLinks] = useState<ILinkItem[]>([]);

  const getAllLinks = async () => {
    const links = await serviceGetAllLinks();
    // alert(JSON.stringify(links, null, 2));
    setAllLinks(links);
  };

  const addLink = async (link: ILinkItem) => {
    await serviceAddLink(link);
    await getAllLinks();
  };

  const deleteLink = async (id: string) => {
    await serviceDeleteLink(id);
    await getAllLinks();
  };

  const updateLink = async (id: string, updatedData: Partial<ILinkItem>) => {
    await serviceUpdateLink(id, updatedData);
    await getAllLinks();
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  return (
    <LinksContext.Provider value={{ allLinks, addLink, deleteLink, getAllLinks, updateLink }}>
      {children}
    </LinksContext.Provider>
  );
}
