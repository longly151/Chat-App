/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import _ from 'lodash';

export interface WithPureExampleProps {
}

const withPureExample = (
  { data }: {
    data: any,
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithPureExample extends React.Component<P & WithPureExampleProps, any> {
    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }
  return WithPureExample;
};
export default withPureExample;
