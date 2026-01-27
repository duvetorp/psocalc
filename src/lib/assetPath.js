const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const assetPath = (path) => {
  if (!path) return basePath;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
};
