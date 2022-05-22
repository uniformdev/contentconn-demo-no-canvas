import { Personalize } from '@uniformdev/context-react';
import { TalkList } from './TalkList';
import { formatPersonalizeVariants } from '../lib/formatPersonalizeVariants';
import { IPersonalizedTalkListList } from '../lib/contentstack';

export function PersonalizedTalkList(props: IPersonalizedTalkListList) {
  if (!props.personalized_talklists.length) {
    return null;
  }

  //@todo consider adding "count" field to Personalized List content type from the app
  return (
    <Personalize
      name={props.title ?? 'Default name for Personalized list of TalkList'}
      variations={formatPersonalizeVariants(props.personalized_talklists)}
      component={TalkList}
    />
  );
}
