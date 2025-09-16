export interface PostType {
    id: string;
    title: string;
    body?: string | null;
    slug: string;
    createdAt: Date;   // PrismaはDate型で返す
    updatedAt: Date;
}