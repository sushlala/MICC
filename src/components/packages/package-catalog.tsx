"use client";

import { useState } from "react";
import Link from "next/link";
import { SEED_PACKAGES, PILLARS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PackageCatalog() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? SEED_PACKAGES.filter((p) => p.pillar === activeFilter)
    : SEED_PACKAGES;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer",
            !activeFilter
              ? "bg-gold text-dark border-gold"
              : "border-dark-border text-dark-muted hover:border-gold/50 hover:text-foreground"
          )}
        >
          All
        </button>
        {PILLARS.map((pillar) => (
          <button
            key={pillar.slug}
            onClick={() =>
              setActiveFilter(
                activeFilter === pillar.slug ? null : pillar.slug
              )
            }
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer",
              activeFilter === pillar.slug
                ? "bg-gold text-dark border-gold"
                : "border-dark-border text-dark-muted hover:border-gold/50 hover:text-foreground"
            )}
          >
            {pillar.name}
          </button>
        ))}
      </div>

      {/* Package grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <Badge>{pkg.pillar.replace("-", " ")}</Badge>
              <span className="text-gold font-semibold text-lg">
                ${pkg.base_price.toLocaleString()}
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold mb-2">
              {pkg.name}
            </h3>
            <p className="text-sm text-dark-muted leading-relaxed mb-6 flex-1">
              {pkg.description}
            </p>
            <ul className="space-y-2 mb-6">
              {pkg.inclusions.map((item) => (
                <li
                  key={item}
                  className="text-sm text-foreground/70 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href={`/request?package=${pkg.slug}`}>
              <Button variant="secondary" className="w-full">
                Request This Package
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-dark-muted text-lg">
            No packages found for this pillar.
          </p>
        </div>
      )}
    </div>
  );
}
