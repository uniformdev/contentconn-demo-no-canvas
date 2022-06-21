import type { GetServerSideProps } from "next";
import { getPageBySlug, getAllTalks } from "../lib/api";
import Page, { PageProps } from "../components/Page";
import {
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";
import { enhancers } from "../lib/enhancers";
import { canvasClient } from "../lib/canvasClient";

export default Page;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const slug = context?.params?.slug;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const preview = Boolean(context.preview);

  const pageSlug = slugString ? `/${slugString}` : "/";
  const page = await getPageBySlug(preview, pageSlug);
  const talks = await getAllTalks(preview);

  const { composition } = await canvasClient.getCompositionBySlug({
    slug: pageSlug,
    state:
      process.env.NODE_ENV === "development" || preview
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  });

  await enhance({ composition, enhancers, context });

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      page,
      talks,
      composition,
    },
  };
};
