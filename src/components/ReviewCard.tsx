export type Review = {
  name: string;
  place: string;
  when: string;
  topic: string;
  text: string;
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="stat-card review-card p-4 h-100">
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="review-avatar" aria-hidden="true">
          {review.name.slice(0, 1).toUpperCase()}
        </span>
        <div>
          <p className="fw-semibold mb-0">{review.name}</p>
          <p className="text-secondary small mb-0">{review.place}</p>
        </div>
      </div>
      <p className="review-stars mb-1" aria-label="5 out of 5">
        <span aria-hidden="true">★★★★★</span>
        <span className="review-score">5.0</span>
      </p>
      <p className="text-secondary small mb-2">
        {review.when} · {review.topic}
      </p>
      <p className="mb-0">{review.text}</p>
    </article>
  );
}
