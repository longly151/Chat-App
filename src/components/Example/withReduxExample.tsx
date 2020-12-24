/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

export interface WithReduxExampleProps {
}

const withReduxExample = (
  { data }: {
    data: any,
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithReduxExample extends React.Component<P & WithReduxExampleProps, any> {
    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }

  const mapStateToProps = (state: any) => {

  };

  const mapDispatchToProps = (dispatch: any) => {
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxExample as any);
};
export default withReduxExample;
