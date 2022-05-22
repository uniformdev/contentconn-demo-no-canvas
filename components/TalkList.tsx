import React from "react";
import { Personalize } from "@uniformdev/context-react";
import { PersonalizedVariant } from "@uniformdev/context/*";
import { useScores } from "@uniformdev/context-react";
import { ITalk, ITalksList } from "../lib/contentstack";
import TalksContext from "../lib/talksContext";
import { PERSONALIZATION_CRITERIA_FIELD_ID } from "../lib/constants";
import { Talk } from "./Talk";

export function TalkList({ title }: ITalksList) {
  const talks = React.useContext(TalksContext);
  const scores = useScores();
  const hasScores = scores.techies > 0 || scores.nonTechies > 0;

  // for fun - personalizing the component title based on the tracker scores
  let headerTitle = title;
  if (scores.techies > 0) {
    headerTitle += " for developers";
  } else if (scores.nonTechies > 0) {
    headerTitle += " for marketers";
  }

  const variations = formatPersonalizeVariants(talks!, hasScores);

  return (
    <fieldset>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            {headerTitle}
          </h1>
          {variations ? (
            <Personalize
              name={"asdas"}
              count={3}
              variations={variations}
              component={Talk}
            />
          ) : null}
        </div>
      </section>
    </fieldset>
  );
}

export function formatPersonalizeVariants<T extends ITalk | undefined>(
  variants: T[],
  hasScores: boolean
): (T & PersonalizedVariant)[] {
  const mappedVariants = variants.map((variant: any) => {
    const personalizedVariant: T & PersonalizedVariant = {
      ...variant,
      id: variant?.uid,
    };
    if (variant.context_personalization_criteria?.name) {
      personalizedVariant.pz = variant.context_personalization_criteria
        .name as PersonalizedVariant["pz"];
    }
    return personalizedVariant;
  });

  if (!mappedVariants) {
    return mappedVariants;
  }

  if (hasScores) {
    return mappedVariants.filter((v) => v.pz);
  }

  return mappedVariants;
}
