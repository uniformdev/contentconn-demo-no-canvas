import type { GetStaticPaths, GetStaticProps } from "next";
import { getPageBySlug, getAllTalks, getAllEntries } from "../lib/api";
import Page, { PageProps } from "../components/Page";
import {
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";
import { canvasClient } from "../lib/canvasClient";

// @ts-expect-error
export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const slug = context?.params?.slug;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const preview = Boolean(context.preview);
  const pageSlug = slugString ? `/${slugString}` : "/";
  const page = await getPageBySlug(preview, pageSlug);
  const talks = await getAllTalks(preview);

  let canvasComposition = {};
  try {
    const { composition } = await canvasClient.getCompositionBySlug({
      slug: "/",
      state:
        process.env.NODE_ENV === "development" || preview
          ? CANVAS_DRAFT_STATE
          : CANVAS_PUBLISHED_STATE,
    });

    canvasComposition = composition;
  } catch (error) {
    console.log("unable to fetch composition with slug " + pageSlug);
  }

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
      composition: canvasComposition,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getAllEntries(false);
  const paths = entries.map((page: any) => page.slug);
  return { paths: paths, fallback: false };
};

export default Page;
