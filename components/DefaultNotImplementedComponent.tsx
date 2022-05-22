import { Entry } from '../lib/contentstack';
import React from 'react';

/**
 * A default implementation of a component-not-implemented component.
 * Useful for model-first workflows where frontend dev comes later.
 * To make this work, it needs to be the default returned from the
 * resolveRenderer() function when the component is unknown.
 **/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DefaultNotImplementedComponent(props: Entry<any>) {
  const componentType = props.sys.contentType.sys.id;

  if (!componentType) {
    return null;
  }

  return (
    <div
      style={{
        borderLeft: '10px solid #e42535!important',
        padding: '0.01em 16px 16px',
        borderRadius: '16px',
        backgroundColor: 'rgba(122, 215, 218, 0.3)',
        color: '#1d3557',
      }}
    >
      <h2>Component: {componentType}</h2>
      <p>
        <strong>{componentType}</strong> has no React implementation. It may need to be added to your{' '}
        <code>resolveRenderer()</code> function.
      </p>
      <details>
        <summary>Props</summary>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </details>
    </div>
  );
}
