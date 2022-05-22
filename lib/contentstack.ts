import { PersonalizedVariant, EnrichmentData } from '@uniformdev/context';

export type Entry<T extends StandardEntryFields> = {
  uid: string;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
  _version: number;
  _in_progress: boolean;
  tags: string[];
  locale: string;
  url: string;
} & T;

export interface StandardEntryFields {
  /** Title */
  title: string;
}

export interface PersonalizeCriteriaFields extends StandardEntryFields {
  context_personalization_criteria?: { name?: PersonalizedVariant['pz'] | undefined } | undefined;
}

export interface StandardPageEntryFields {
  /** Url */
  url: string;
}

export interface PersonalizedHeroListFields extends StandardEntryFields {
  /** Hero Options */
  personalized_heros: IHero[];
}

export type IPersonalizedHeroList = Entry<PersonalizedHeroListFields>;

export interface PersonalizedTalkListListFields extends StandardEntryFields {
  /** Hero Options */
  personalized_talklists: ITalksList[];
}

export type IPersonalizedTalkListList = Entry<PersonalizedTalkListListFields>;

export interface CallToActionFields extends StandardEntryFields {
  /** Subheading */
  subheading?: string | undefined;

  /** Button Link */
  button_link?: string | undefined;

  /** Button Text */
  button_text?: string | undefined;

  /** Button Image */
  button_image?: IAsset | undefined;
}

export type ICallToAction = Entry<CallToActionFields>;

export interface HeroFields extends StandardEntryFields, PersonalizeCriteriaFields {
  /** Description */
  description: string;

  /** Button Text */
  button_text: string;

  /** Button Link Slug */
  button_link_slug: string;

  /** image */
  image?: IAsset | undefined;
}

export type IHero = Entry<HeroFields>;

export interface PageFields extends StandardEntryFields, StandardPageEntryFields {
  slug: string;
  context_enrichment_tags: {
    name?: EnrichmentData[] | undefined;
  };
  /** Components */
  components: ((
    | ICallToAction
    | IHero
    | IPersonalizedHeroList
    | IRegistrationForm
    | ITalksList
    | IWhyAttend
  ) & { _content_type_uid: string })[];
}

export type IPage = Entry<PageFields>;

export interface RegistrationFormFields extends StandardEntryFields {
  /** ButtonText */
  button_text?: string | undefined;

  /** Registered Text */
  registered_text?: string | undefined;
}

export type IRegistrationForm = Entry<RegistrationFormFields>;

export interface TalkFields extends StandardEntryFields {
  /** Description */
  description?: string | undefined;

  /** Intent Tags */
  unfrm_opt_intent_tag?: Record<string, any> | undefined;

  audience: string;
}

export type ITalk = Entry<TalkFields>;

export interface TalksListFields extends StandardEntryFields, PersonalizeCriteriaFields {
  /** Title When Personalized */
  title_when_personalized?: string | undefined;

  /** NumberToShow */
  number_to_show?: number | undefined;

  /** Register Button Text */
  register_button_text?: string | undefined;

  talks: ITalk[];
}

export type ITalksList = Entry<TalksListFields>;

export interface WhyAttendFields extends StandardEntryFields {
  /** Description */
  description?: string | undefined;

  /** Image */
  image?: IAsset | undefined;
}

export type IWhyAttend = Entry<WhyAttendFields>;

export interface IAsset {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  /** mime-type */
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  _version: number;
  title: string;
  dimension: Record<string, any>;
}
