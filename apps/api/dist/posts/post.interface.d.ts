export interface PostType {
    id: string;
    title: string;
    body?: string | null;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
