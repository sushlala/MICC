import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { OfferingsCardProps } from "@/types/components";

export function OfferingsCard({
  title,
  tagline,
  description,
  slug,
  icon: Icon,
}: OfferingsCardProps) {
  return (
    <Link href={`/pillars/${slug}`}>
      <Card className="h-full text-center group cursor-pointer">
        <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <Icon className="w-7 h-7 text-gold" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-1">{title}</h3>
        <p className="text-xs text-gold tracking-[0.15em] uppercase mb-3">
          {tagline}
        </p>
        <p className="text-sm text-dark-muted leading-relaxed">{description}</p>
      </Card>
    </Link>
  );
}
