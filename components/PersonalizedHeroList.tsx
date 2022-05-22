import { Personalize } from '@uniformdev/context-react';
import { Hero } from './Hero';
import { formatPersonalizeVariants } from '../lib/formatPersonalizeVariants';
import { IPersonalizedHeroList } from '../lib/contentstack';

export function PersonalizedHeroList(props: IPersonalizedHeroList) {
  if (!props.personalized_heros.length) {
    return null;
  }

  //@todo consider adding "count" field to Personalized List content type from the app
  return (
    <Personalize
      name={props.title ?? 'Default name for Personalized list of Heros'}
      variations={formatPersonalizeVariants(props.personalized_heros)}
      component={Hero}
    />
  );
}
