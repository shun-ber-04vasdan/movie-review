import Card from "@/shared/ui/atoms/Card";
import Heading from "@/shared/ui/atoms/Heading";
import Text from "@/shared/ui/atoms/Text";
import Link from "@/shared/ui/atoms/Link";
import RatingStars from "@/shared/ui/molecules/RatingStars";

export type ReviewItem = {
    title: string;
    slug: string;
    summary: string;
    rating: number;
    createdAt: string;
    coverUrl?: string;
    tags?: string[];
}

export default function ReviewCard({ review }: {review: ReviewItem}) {
    const date = new Date(review.createdAt);
    const dateLabel = date.toLocaleDateString();

    return (
        <Card as="article" interactive padding="md" className="fles gap-4">
            {review.coverUrl && (
                <img
                    src={review.coverUrl}
                    alt={`${review.title}のポスター`}
                    className="h-28 w-20 shrink-0 rounded-lg object-cover"
                    loading="lazy"
                />
            )}

            <div className="min-w-0 flex-1">
                <header className="mb-1 flex items-start justify-between gap-3">
                    <Heading as="h3" level={3} className="line-clamp-1">
                        {review.title}
                    </Heading>
                    <Text size="sm" tone="muted" className="whitespace-nowrap">
                        {dateLabel}
                    </Text>
                </header>
                <div className="mb-2 flex items-center gap-2">
                    <RatingStars value={review.rating} />
                    {review.tags && review.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                        {review.tags.slice(0, 3).map((t) => (
                            <span
                            key={t}
                            className="rounded-full border px-2 py-0.5 text-xs text-gray-600"
                            >
                                #{t}
                            </span>
                        ))}
                        {review.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{review.tags.length - 3}</span>
                        )}
                        </div>
                    )}
                </div>

                <Text tone="default" className="line-clamp-3">
                    {review.summary}   
                </Text>

                <div className="mt-3">
                    <Link href={`/reviews/${review.slug}`} underline="auto">
                        続きを読む →
                    </Link>
                </div>
            </div>
        </Card>
    )
}