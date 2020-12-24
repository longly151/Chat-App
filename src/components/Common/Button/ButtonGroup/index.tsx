import React from 'react';
import QuickView from '../../View/QuickView';
import Button, { ButtonProps } from '../DefaultButton';
import FlatList, { FlatListProps } from '../../FlatList/DefaultFlatList';

export interface ButtonGroupProps extends Omit<ButtonProps, 'title'|'t'|'onPress'|'margin'|'marginLeft'|'marginVertical'>{
  defaultIndexChange?: boolean;
  titleList?: Array<string>;
  onItemPress?: (index: number) => any;
  flatListProps?: FlatListProps
  defaultActiveIndex?: number;
}

interface State {
  activeIndex: number;
}

class ButtonGroup extends React.Component<ButtonGroupProps, State> {
  static defaultProps = {
    defaultIndexChange: true,
  };

  private flatListRef: any;

  constructor(props: ButtonGroupProps) {
    super(props);
    const { defaultActiveIndex } = this.props;
    this.state = { activeIndex: defaultActiveIndex || 0 };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { defaultIndexChange } = nextProps;
    const { activeIndex } = prevState;
    if (defaultIndexChange && nextProps.defaultActiveIndex !== activeIndex) {
      return {
        activeIndex: nextProps.defaultActiveIndex,
      };
    }
    return {
      activeIndex,
    };
  }

  componentDidUpdate() {
    const { activeIndex } = this.state;
    if (this.flatListRef && activeIndex) {
      this.flatListRef.flatListRef.scrollToIndex({
        animated: true,
        index: activeIndex - 1 > 0 ? activeIndex - 1 : 0,
      });
    }
  }

  onPress = (index: number) => {
    this.setState({ activeIndex: index });
    const { onItemPress } = this.props;
    if (onItemPress) {
      onItemPress(index);
    }
  };

  getIndex = () => {
    const { activeIndex } = this.state;
    return activeIndex || 0;
  };

  renderItem = ({ item, index }: { item: string; index: number }) => {
    const {
      flatListProps,
      titleList,
      marginRight: marginRightProp,
      marginHorizontal,
      ...otherButtonProps
    } = this.props;
    const { activeIndex } = this.state;
    const list = titleList;
    const marginRight = marginRightProp || 10;
    if (list) {
      return (
        <Button
          outline
          {...otherButtonProps}
          title={titleList ? item : undefined}
          marginRight={
            index === list.length - 1 ? (marginHorizontal || 0) : marginRight
          }
          marginLeft={
            index === 0 ? marginHorizontal : 0
          }
          active={activeIndex === index}
          onPress={() => this.onPress(index)}
        />
      );
    }
    return <QuickView />;
  };

  render() {
    const {
      titleList, flatListProps, defaultActiveIndex, defaultIndexChange,
    } = this.props;
    const { activeIndex } = this.state;
    const FlatListButton: any = FlatList;
    return (
      <FlatListButton
        ref={(ref: any) => {
          this.flatListRef = ref;
        }}
        horizontal
        renderItem={this.renderItem}
        {...flatListProps}
        data={titleList}
        initialScrollIndex={defaultActiveIndex}
        onScrollToIndexFailed={() => {
          this.flatListRef.flatListRef.scrollToIndex({
            animated: true,
            index: 0,
          });
        }}
        showsHorizontalScrollIndicator={flatListProps?.horizontal || false}
        extraData={defaultIndexChange ? defaultActiveIndex : activeIndex}
      />
    );
  }
}

export default ButtonGroup;
