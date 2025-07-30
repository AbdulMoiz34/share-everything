import { find } from "linkifyjs";

export const detetectURLS = (text: string): any[] => {
    const links = find(text);
    console.log(links)
    return links.map(link => link.href);
}