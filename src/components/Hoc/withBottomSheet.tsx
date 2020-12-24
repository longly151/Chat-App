import React, { useCallback } from 'react';
import { BottomSheetOverlay, useBottomSheetModal } from '@gorhom/bottom-sheet';
import QuickView from '@components/Common/View/QuickView';
import { BottomSheetModalConfigs } from '@gorhom/bottom-sheet/lib/typescript/types';
import AppView from '@utils/appView';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import { ThemeEnum } from '@contents/Config/redux/slice';
import AppHelper from '@utils/appHelper';
import withModalProvider from './withModalProvider';

interface IWithBottomSheet {
  snapPoints?: Array<string | number>,
  configs?: BottomSheetModalConfigs,
}
export interface WithBottomSheetProps {
}

const withBottomSheet = (data?: IWithBottomSheet) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  function BottomSheet(props: any) {
    const { present, dismiss } = useBottomSheetModal();
    const { reduxThemeName } = props;
    const theme = AppHelper.getThemeByName(reduxThemeName);

    let indicatorBackgroundColor = theme.colors.primaryBackground;
    const setIndicatorBackgroundColor = (bgColor: string) => {
      indicatorBackgroundColor = bgColor;
    };

    const BottomSheetHandleComponent = () => {
      const backgroundColor = theme.key === ThemeEnum.LIGHT
        ? 'rgba(0, 0, 0, 0.25)'
        : 'rgba(255, 255, 255, 0.25)';

      return (
        <QuickView
          paddingHorizontal={16}
          paddingVertical={10}
          backgroundColor={indicatorBackgroundColor}
          borderTopLeftRadius={AppView.roundedBorderRadius}
          borderTopRightRadius={AppView.roundedBorderRadius}
        >
          <QuickView style={{
            alignSelf: 'center',
            width: (8 * AppView.screenWidth) / 100,
            height: 5,
            borderRadius: 4,
            backgroundColor,
          }}
          />
        </QuickView>
      );
    };

    // callbacks
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChange = useCallback((index: number) => {
      // if (index === 0) {
      //   Alert.alert('Modal Been Dismissed');
      // }
    }, []);

    let modalContent: any = <QuickView />;

    const setModalContent = (content: React.ComponentType<any>) => {
      modalContent = content;
    };

    const open = useCallback(() => {
      present(
        modalContent,
        {
          snapPoints: data?.snapPoints || ['40%', '90%'],
          animationDuration: 250,
          overlayComponent: BottomSheetOverlay,
          overlayOpacity: 0.75,
          dismissOnOverlayPress: true,
          onChange: handleChange,
          handleComponent: BottomSheetHandleComponent,
          ...data?.configs
        }
      );
    }, [present, handleChange]);

    const close = useCallback(() => {
      dismiss();
    }, [dismiss]);

    // renders
    return (
      <WrappedComponent
        {...props}
        open={open}
        close={close}
        themeName={reduxThemeName}
        setModalContent={setModalContent}
        setIndicatorBackgroundColor={setIndicatorBackgroundColor}
      />
    );
  }

  const mapStateToProps = (state: any) => ({
    reduxThemeName: themeSelector(state)
  });

  return withModalProvider(connect(
    mapStateToProps,
    null,
    null,
    { forwardRef: true }
  )(BottomSheet as any));
};
export default withBottomSheet;
