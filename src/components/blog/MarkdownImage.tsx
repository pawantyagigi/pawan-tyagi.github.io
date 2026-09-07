import type { ComponentPropsWithoutRef, FC } from "react";
import { withBasePath } from "@/lib/withBasePath";

type MarkdownImageProps = ComponentPropsWithoutRef<"img"> & {
  node?: unknown;
};

/** Markdown images: rewrite root-relative `/uploads/...` for GitHub Pages basePath. */
const MarkdownImage: FC<MarkdownImageProps> = ({
  src,
  alt,
  node,
  ...rest
}) => {
  void node;
  const srcStr = src != null ? String(src) : "";
  return <img src={withBasePath(srcStr) || undefined} alt={alt ?? ""} {...rest} />;
};

export default MarkdownImage;
