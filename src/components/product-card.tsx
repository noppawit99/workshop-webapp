/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CartButton from "@/app/(front)/components/CartButton";

type Props = {
  product: any;
};

const ProductCard = ({ product }: Props) => {
  const rating = 4 + ((product.id ?? 0) % 10) / 10;
  const hasDiscount = (product.id ?? 0) % 3 === 0;

  return (
    <article className="group/card overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:border-primary/40 hover:shadow-product-hover hover:-translate-y-1">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
        <Image
          alt={product.name}
          className="size-full object-cover transition-transform duration-300 group-hover/card:scale-105"
          width={0}
          height={0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={`/product-image/${product.picture}`}
          loading="eager"
        />
        {hasDiscount && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em]"
          >
            ลดราคา
          </Badge>
        )}
        <Badge
          variant="outline"
          className="absolute right-3 bottom-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-bold"
        >
          ID: {product.id}
        </Badge>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-tertiary text-tertiary" />
          <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({10 + (product.id ?? 0)} รีวิว)</span>
        </div>

        <h3 className="mt-2 font-heading text-lg font-bold tracking-tight">
          {product.name}
        </h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-heading text-xl font-extrabold text-foreground">
            ฿{product.price.toLocaleString("th-TH")}
          </span>
          {hasDiscount && (
            <span className="text-sm font-semibold text-secondary line-through decoration-error/60">
              ฿{(Math.round(product.price * 1.25 / 100) * 100).toLocaleString("th-TH")}
            </span>
          )}
        </div>

        <div className="mt-4">
          <CartButton product={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;