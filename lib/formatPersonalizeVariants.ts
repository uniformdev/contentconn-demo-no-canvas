import { PersonalizedVariant } from '@uniformdev/context';
import { Entry, PersonalizeCriteriaFields } from './contentstack';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatPersonalizeVariants<T extends Entry<PersonalizeCriteriaFields>>(
  variants: T[]
): (T & PersonalizedVariant)[] {
  return variants.map((variant) => {
    const personalizedVariant: T & PersonalizedVariant = { ...variant, id: variant.uid };
    if (variant.context_personalization_criteria?.name) {
      personalizedVariant.pz = variant.context_personalization_criteria.name as PersonalizedVariant['pz'];
    }
    return personalizedVariant;
  });
}
