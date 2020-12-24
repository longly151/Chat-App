import React, { PureComponent, ReactNode } from 'react';
import Modal, { ModalProps as RNModalProps } from 'react-native-modal';
import AppHelper from '@utils/appHelper';
import _ from 'lodash';
import { OrNull } from 'react-native-modal/dist/types';
import { Animation, CustomAnimation } from 'react-native-animatable';
import { NavigationService } from '@utils/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import modalStack from '@contents/Modal/routes';
import { withTheme, ThemeProps } from 'react-native-elements';
import QuickView from '../../View/QuickView';
import Button, { ButtonProps } from '../DefaultButton';
import Text from '../../Text';

interface ModalProps extends Pick<RNModalProps, 'onSwipeStart' | 'onSwipeMove' | 'onSwipeComplete' | 'onSwipeCancel' | 'style' | 'swipeDirection' | 'onDismiss' | 'onShow' | 'hardwareAccelerated' | 'onOrientationChange' | 'presentationStyle' | 'supportedOrientations'> {
  children?: ReactNode;
  backdropClose?: boolean;
  type?: 'notification' | 'confirmation' | 'bottom-half' | 'fullscreen' ;
  title?: string;
  t?: string;
  onOkButtonPress?: () => any;
  okTitle?: string;
  cancelTitle?: string;
  animationIn?: Animation | CustomAnimation;
  animationInTiming?: number;
  animationOut?: Animation | CustomAnimation;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  coverScreen?: boolean;
  hasBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  customBackdrop?: ReactNode;
  useNativeDriver?: boolean;
  deviceHeight?: number;
  deviceWidth?: number;
  hideModalContentWhileAnimating?: boolean;
  propagateSwipe?: boolean;
  isVisible?: boolean;
  onModalShow?: () => void;
  onModalWillShow?: () => void;
  onModalHide?: () => void;
  onModalWillHide?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  swipeThreshold?: number;
  scrollTo?: OrNull<(e: any) => void>;
  scrollOffset?: number;
  scrollOffsetMax?: number;
  scrollHorizontal?: boolean;
  snapPoints?: Array<string | number>;
  theme?: any;
}

export interface ModalButtonProps extends Omit<ButtonProps, 'onPress'> {
  ref?: any;
  children?: any;
  buttonChildren?: any;
  invisible?: boolean;
  modalProps?: ModalProps;
  onPress?: () => any;
}

interface State {
  isVisible: boolean
}
class ModalButton extends PureComponent<ModalButtonProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  open = () => {
    const { modalProps, children } = this.props;
    if (modalProps && modalProps.type === 'fullscreen') {
      const content = children;
      const id = AppHelper.setModalIntoGlobal(content);
      NavigationService.navigate(modalStack.defaultModal, { id });
    } else {
      const { onPress } = this.props;
      this.setState({ isVisible: true });
      if (onPress) onPress();
    }
  };

  renderChildren = () => {
    const { theme, modalProps, children } = this.props;
    if (children) return children;

    if (modalProps) {
      const defaultModalProps: any = _.merge({
        backdropClose: true,
        type: 'notification',
      }, modalProps);
      const {
        type,
        title,
        onOkButtonPress,
        okTitle,
        cancelTitle,
      } = defaultModalProps;

      return (
        <QuickView
          backgroundColor={theme.Modal.backgroundColor}
          borderRadius={theme.Modal.roundedBorderRadius}
          width={theme.Modal.width}
          center
          padding={15}
        >
          <Text type="xTitle" color={theme.Modal.textColor} center marginBottom={15}>{title}</Text>
          <QuickView row center>
            {
            type === 'notification' ? (
              <Button
                title={okTitle || 'Ok'}
                width={100}
                onPress={() => {
                  this.setState({ isVisible: false });
                  if (onOkButtonPress) onOkButtonPress();
                }}
              />
            )
              : (
                <>
                  <Button
                    title={okTitle}
                    t="ok"
                    titlePaddingHorizontal={15}
                    marginRight={10}
                    onPress={() => {
                      this.setState({ isVisible: false });
                      if (onOkButtonPress) onOkButtonPress();
                    }}
                  />
                  <Button
                    title={cancelTitle}
                    t="cancel"
                    titlePaddingHorizontal={15}
                    marginLeft={10}
                    onPress={() => this.setState({ isVisible: false })}
                  />
                </>
              )
            }
          </QuickView>
        </QuickView>
      );
    }
    return null;
  };

  close = () => {
    const { modalProps } = this.props;
    if (modalProps?.type === 'fullscreen') {
      NavigationService.goBack();
    } else {
      this.setState({ isVisible: false });
    }
  };

  render() {
    const { isVisible } = this.state;
    const {
      modalProps,
      children,
      invisible,
      buttonChildren,
      ...otherProps
    } = this.props;

    const defaultModalProps: ModalProps = _.merge({
      backdropClose: true,
      type: 'notification',
    }, modalProps);
    // eslint-disable-next-line max-len
    defaultModalProps.swipeDirection = (defaultModalProps.type === 'notification' || defaultModalProps.type === 'confirmation') ? ['up', 'down'] : undefined;
    // eslint-disable-next-line max-len
    if (modalProps && !_.isUndefined(modalProps.swipeDirection)) defaultModalProps.swipeDirection = modalProps.swipeDirection;

    if (defaultModalProps.swipeDirection) {
      defaultModalProps.onSwipeComplete = () => this.setState({ isVisible: false });
    }

    const {
      backdropClose,
      type,
      title,
      t,
      onOkButtonPress,
      style,
      ...otherModalProps
    } = defaultModalProps;

    /**
     * fullscreen
     */
    if (type === 'fullscreen') {
      const { onPress, ...customOtherProps } = otherProps;
      const onPressFn = () => {
        const content = children;
        const id = AppHelper.setModalIntoGlobal(content);
        NavigationService.navigate(modalStack.defaultModal, { id });
        if (onPress) onPress();
      };
      if (invisible) {
        return (
          <TouchableOpacity onPress={onPressFn}>
            {buttonChildren}
          </TouchableOpacity>
        );
      }
      return (
        <Button
          {...customOtherProps}
          onPress={onPressFn}
        />
      );
    }

    /**
     * Other types
     */
    let customStyle = style;
    if (type === 'bottom-half') {
      const bottomHalfStyle = {
        justifyContent: 'flex-end',
        margin: 0,
      };
      customStyle = _.merge(bottomHalfStyle, style);
    }
    return (
      <>
        {
          invisible ? (
            <TouchableOpacity onPress={() => this.open()}>
              {buttonChildren}
            </TouchableOpacity>
          )
            : <Button {...otherProps} onPress={() => this.open()} />
        }

        <Modal
          {...otherModalProps}
          isVisible={isVisible}
          onBackdropPress={() => {
            if (backdropClose) this.setState({ isVisible: false });
          }}
          style={customStyle}
        >
          {this.renderChildren()}
        </Modal>
      </>
    );
  }
}

export default withTheme(
  ModalButton as any as React.ComponentType<ModalButtonProps & ThemeProps<any>>
);
