import contentstack from "contentstack";
import { Entry, IPage, ITalk, StandardEntryFields } from "./contentstack";
import * as Utils from "@contentstack/utils";

if (!process.env.CONTENTSTACK_STACK_API_KEY) {
  throw new Error("CONTENTSTACK_STACK_API_KEY env not set.");
}

if (!process.env.CONTENTSTACK_DELIVERY_TOKEN) {
  throw new Error("CONTENTSTACK_DELIVERY_TOKEN env not set.");
}

if (!process.env.CONTENTSTACK_ENVIRONMENT) {
  throw new Error("CONTENTSTACK_ENVIRONMENT env not set.");
}

const region =
  process.env.CONTENTSTACK_REGION?.toUpperCase() === "EU"
    ? contentstack.Region.EU
    : contentstack.Region.US;

const config: contentstack.Config = {
  api_key: process.env.CONTENTSTACK_STACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region,
};

const client = contentstack.Stack(config);

const previewClient = client;

const getClient = (preview: boolean) => (preview ? previewClient : client);

export const getPageBySlug = async (
  preview: boolean,
  slug: string
): Promise<IPage | undefined> => {
  const query = getClient(preview)
    .ContentType("page")
    .Query()
    .includeCount()
    .includeContentType()
    .includeReference([
      "components",
      "components.personalized_heros",
      "components.personalized_talklists",
    ])
    .addParam("include_dimension", "true")
    .toJSON();
  const result = await query.where("slug", slug).find();

  const [first] = result[0];
  return first ? { ...first, _content_type_uid: "page" } : undefined;
};

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
  preview: boolean;
};

export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
  preview,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = getClient(preview).ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

export const getAllEntries = async (preview: boolean): Promise<any> => {
  const response: any = await getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
    preview,
  });

  return response[0];
};

export const getEntriesByContentType = async <T extends StandardEntryFields>(
  preview: boolean,
  type: string
): Promise<Entry<T>[]> => {
  const query = getClient(preview)
    .ContentType(type)
    .Query()
    .includeCount()
    .includeContentType()
    .toJSON();
  const result = await query.find();
  const entries = result[0].map((entry: Entry<any>) => {
    entry._content_type_uid = type;
    return entry;
  });

  return entries as Entry<T>[];
};

export const getAllTalks = async (
  preview: boolean
): Promise<ITalk[] | undefined> => {
  return getEntriesByContentType(preview, "talk");
};
