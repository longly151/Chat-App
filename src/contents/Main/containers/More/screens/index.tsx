import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, QuickView, Body } from '@components';
import { ListItem, Divider, Icon } from 'react-native-elements';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import PickerChangeLanguage from '@contents/Config/Shared/PickerChangeLanguage';
import LogoutButton from '@contents/Auth/containers/Login/Shared/LogoutButton';
import LoginButton from '@contents/Auth/containers/Login/Shared/LoginButton';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

const BLUE = '#007AFF';
const GREY = '#8E8E93';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
  },
  separatorComponent: {
    backgroundColor: 'white',
  },
  separator: {
    marginLeft: 58,
  },
  headerSection: {
    height: 30,
  },
});

class Settings extends React.PureComponent<any> {
  renderItem = ({
    title, backgroundColor, icon, rightElement,
  }: any) => (
    <ListItem
      containerStyle={{ paddingVertical: 8 }}
      key={title}
      bottomDivider
    >
      <Icon
        name={icon}
        type="ionicon"
        size={20}
        color="white"
        containerStyle={{
          backgroundColor,
          width: 28,
          height: 28,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <ListItem.Content>
        <ListItem.Title>
          {title}
        </ListItem.Title>
      </ListItem.Content>
      {rightElement}
    </ListItem>
  );

  renderSectionHeader = () => <View style={styles.headerSection} />;

  ItemSeparatorComponent = () => (
    <View style={styles.separatorComponent}>
      <Divider style={styles.separator} />
    </View>
  );

  render() {
    const { t } = this.props;
    const sections = [
      {
        title: t('theme'),
        backgroundColor: BLUE,
        icon: 'ios-bulb',
        hideChevron: true,
        rightElement: <SwitchChangeTheme />,
      },
      {
        title: t('language'),
        icon: 'ios-settings',
        backgroundColor: GREY,
        hideChevron: true,
        rightElement: <PickerChangeLanguage />,
      },
    ];

    return (
      <Container>
        <Header title={i18next.t('header:setting')} shadow />
        <Body scrollable fullWidth>
          <QuickView marginTop={10}>
            {sections.map((e) => this.renderItem(e))}
          </QuickView>
          <QuickView paddingHorizontal={10} paddingVertical={15}>
            {/* <GoToExampleButton /> */}
            <LoginButton />
            <LogoutButton />
          </QuickView>
        </Body>
      </Container>
    );
  }
}
export default withTranslation()(Settings as any);
