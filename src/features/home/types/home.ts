export type ActivitySnippet = {
    id: string;
    label: string;
    count: number;
    href: string;
    icon: 'inbox' | 'calendar' | 'wallet';
    color: string;
};

export interface HomeProps {
    user: {
        id: string;
        name: string;
        image?: string | null;
    };
}

export type HomeCategory = {
    id: string;
    label: string;
    slug: string;
    icon: any;
    image: string;
    count?: number;
};