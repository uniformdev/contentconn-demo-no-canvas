import { ComponentType } from "react";
import { DefaultNotImplementedComponent } from "./DefaultNotImplementedComponent";
import { Hero } from "./Hero";
import { TalkList } from "./TalkList";
import { WhyAttend } from "./WhyAttend";
import { Talk } from "./Talk";
import { RegisterForm } from "./RegisterForm";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PersonalizedTalkList } from "./PersonalizedTalkList";
import { PersonalizedHeroList } from "./PersonalizedHeroList";
import type {
  IHero,
  IPersonalizedHeroList,
  ICallToAction,
  IPage,
  IPersonalizedTalkListList,
  IRegistrationForm,
  ITalk,
  ITalksList,
  IWhyAttend,
  Entry,
} from "../lib/contentstack";
import { CDPLoader } from "./CDPLoader";

// @todo fix usage of union type.
export type EntryUnionType =
  | IHero
  | IPage
  | IPersonalizedHeroList
  | ICallToAction
  | IPersonalizedTalkListList
  | IRegistrationForm
  | ITalk
  | ITalksList
  | IWhyAttend;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentMapping = Record<string, ComponentType<any>>;

const mappings: ComponentMapping = {
  hero: Hero,
  talks_list: TalkList,
  talk: Talk,
  why_attend: WhyAttend,
  registration_form: RegisterForm,
  header: Navbar,
  footer: Footer,
  personalized_hero_list: PersonalizedHeroList,
  personalized_talkslist_list: TalkList,
  cdp_profile_loader: CDPLoader,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveRenderer(
  contentstackEntry: Entry<any>
): ComponentType<Entry<any>> {
  const componentImpl = mappings[contentstackEntry._content_type_uid];
  return componentImpl ?? DefaultNotImplementedComponent;
}

export default mappings;
