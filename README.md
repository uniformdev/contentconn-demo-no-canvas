# Uniform Context + Contentstack starter

This is StarterKit/Example of [Next.js](https://nextjs.org/) project with direct integration of [Uniform Context](https://docs.uniform.app/context/) with [Contentstack](https://www.contentstack.com/) via Uniform Context app

## Getting Started

First, you need provide API keys to connect with empty Uniform App project and empty Stack in Contentstack:

Copy `.env.example` into `.env` and fill all the keys, for example:
```bash
UNIFORM_API_KEY='aaaabbbbccc'
UNIFORM_PROJECT_ID='a99887b0-9e34-4f73-b30a-738118c67ebc'
```

**IMPORTANT**: run slug generation script to enable SSR or SSG - `npm run generate:slug-page`

> The API key must have all the write permissions for Uniform Context in order to complete the setup below.

### Step 1: setup Uniform Context

1. `npm install`
1. Start by running import the Uniform Context definitions from local disk (`/data/context`) into your Uniform project by running this command:

    ```
    npm run push:context
    ```

1. Publish the manifest via GUI by clicking the Publish button on the Personalization tab.

1. If the command above is successful, now let's pull the newly imported Context definitions into a local manifest stored in `/lib/context-manifest.json` by running this command:

    ```
    npm run pull:manifest
    ```
1. Check `/lib/context-manifest.json` and ensure the manifest is not empty, you should be able to see this in there:
    ```json
    {
    "project": {
        "pz": {
        "agg": {
            "submitCallForPapers": {
            "inputs": [
                {
                "dim": "callForPapers"
                }
            ]
            },
            "nonTechies": {
            "inputs": [
                {
                "dim": "1_mkt"
                }
            ]
            },
            "techies": {
            "inputs": [
                {
                "dim": "1_dev"
                }
            ]
            }
        },
        "enr": {
            "1": {
            "cap": 100
            }
        },
        "sig": {
            "registrationComplete": {
            "str": 50,
            "cap": 100,
            "dur": "p",
            "crit": {
                "op": "&",
                "type": "G",
                "clauses": [
                {
                    "type": "CK",
                    "match": {
                    "cs": false,
                    "op": "=",
                    "rhs": "true"
                    },
                    "cookieName": "unfrmconf_registered"
                }
                ]
            }
            },
            "callForPapers": {
            "str": 50,
            "cap": 100,
            "dur": "p",
            "crit": {
                "op": "&",
                "type": "G",
                "clauses": [
                {
                    "type": "QS",
                    "match": {
                    "cs": false,
                    "op": "=",
                    "rhs": "unfrmconf"
                    },
                    "queryName": "utm_campaign"
                }
                ]
            }
            }
        }
        },
        "test": {
        "whyAttendTest": {}
        }
    }
    }
    ```

### Step 2: setup Contentstack Stack
Follow these steps in order to import the content for this showcase app into your own Contentstack Stack.

1. Create an empty stack in your Contentstack account.
1. Generate the following for your stack `Settings->Tokens`: `Stack API key`, `Delivery Token`, and `Management Token` and save them in a handy place.
1. Install Context App from the Contentstack marketplace (important to do it before import script!)
1. Since Contentstack uses unique per stack UIDs for App Extensions, we need to extract the extension UID before we can import our content. This value will be used for Enrichment Tags and Personalize Criteria fields.
1. Run this API request:

    ```
    GET https://api.contentstack.io/v3/extensions?include_branch=true&include_marketplace_extensions=true
    Accept: application/json
    api_key: <YOUR_STACK_API_KEY>
    authorization: <YOUR_API_MANAGEMENT_KEY>
    ```
    The response should return 4 field widgets.
1. Take the value of `uid` property from the object with "Uniform Context - Personalization Criteria" title:

    ```json
    {
        "uid": "blta7dce40b45a35da1",
        ...
        "title": "Uniform Context - Personalization Criteria",
        ...
    },
    ```

1. Perform value replacement of the `extension_uid` field inside content type export files under `./data/contentstack/content_types` with the value extracted in the previous step. In this example, it is `blta7dce40b45a35da1` but your value will be different. For convenience, find all instances of `REPLACE_ME_SEE_README_context_personalization_criteria` and replace them with the value of `uid` extracted in the previous step.
    > For this step, replace the `extension_uid` field only within the object that have `"uid": "context_personalization_criteria"`:

    ```json
    {
        "display_name": "Context Personalization Criteria",
        "extension_uid": "blta7dce40b45a35da1",
        "field_metadata": { "extension": true },
        "uid": "context_personalization_criteria",
        ...
    }
    ```

1. Repeat the same for the "Uniform Context - Enrichment Tag" field. The value for the `extension_uid` field will need to be extracted from another object in the response:

    ```json
    {
    "uid": "blt755d67d7dfd462de",
    ...
    "title": "Uniform Context - Enrichment Tag",
    ...
    },
    ```

    > For this step, replace the `extension_uid` field only within the object that have `"uid": "context_enrichment_tags"`. For convenience, find all instances of `REPLACE_ME_SEE_README_context_enrichment_tags` and replace them with the value of `uid` extracted in the previous step:

    ```json
    {
        "display_name": "Context Enrichment Tags",
        "extension_uid": "blt755d67d7dfd462de",
        ...
        "uid": "context_enrichment_tags",

      }
    ```

1. These two operations 
    This should result in replacements in the the following files:

        - hero.json
        - schema.json
        - talk.json
        - talks_list.json

1. Install Contentstack CLI if you haven't done already with `npm install -g @contentstack/cli`

1. Run `csdx config:set:region` to set your region, for example: `csdx config:set:region NA`

1. Create a management token alias via the `csdx auth:tokens:add -m` flow (learn more [here](https://www.contentstack.com/docs/developers/cli/authenticate-with-the-cli/)). 
    At the end you will get a value you can use in command below.

1. Now we are ready to import. Run the following command:
    ```bash
    csdx cm:import -a <YOUR_API_MANAGEMENT_TOKEN_ALIAS> -d ./data/contentstack/main
    ```
App configurations encryption key: ```context```
### Run the project

Run dev server:

```
npm run dev
```

Or run production:

```
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Export you local changes in Contentstack and Uniform

Export latest Contentstack content model and content (you may need to [login](https://www.contentstack.com/docs/developers/cli/authenticate-with-the-cli/) into Contentstack CLI first):

    ```
    csdx cm:export -a <YOUR MANAGEMENT TOKEN ALIAS> -d ./data/contentstack
    ```

Export Uniform Dev

    ```
    npm run pull:context
    ```

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
