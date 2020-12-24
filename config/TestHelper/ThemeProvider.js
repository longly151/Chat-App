import React from 'react';
import PropTypes from 'prop-types';
import deepmerge from 'deepmerge';
import {lightTheme} from '../../../../src/core/themes/Theme';

export const ThemeContext = React.createContext({
  theme: lightTheme
});

export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);

    this.defaultTheme = lightTheme;
    this.state = {
      theme: this.defaultTheme,
      useDark: props.useDark,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {useDark} = props;
    if (useDark !== state.useDark) {
      return {
        theme: lightTheme,
        useDark,
      };
    }
    return null;
  }

  updateTheme = (updates) => {
    this.setState(({theme}) => ({
      theme: deepmerge(theme, updates),
    }));
  };

  replaceTheme = (theme) => {
    this.setState(() => ({
      theme: deepmerge(this.defaultTheme, theme),
    }));
  };

  getTheme = () => this.state.theme;

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          updateTheme: this.updateTheme,
          replaceTheme: this.replaceTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node.isRequired,
  useDark: PropTypes.bool,
};

ThemeProvider.defaultProps = {
  theme: {},
  useDark: false,
};

export const ThemeConsumer = ThemeContext.Consumer;
