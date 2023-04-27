interface ILayout {
    children: any;
}

interface IHeader {
    links: {
        link: string;
        label: string;
    }[];
}

export type { ILayout, IHeader };