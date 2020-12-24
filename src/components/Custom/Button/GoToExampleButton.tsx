import React, { PureComponent } from 'react';
import { NavigationService } from '@utils/navigation';
import exampleStack from '@contents/Example/routes';
import Button from '../../Common/Button/DefaultButton';

class GoToExampleButton extends PureComponent {
  render() {
    return (
      <Button
        title="Go to Example"
        height={50}
        bold
        onPress={
        () => NavigationService.navigate(exampleStack.exampleList)
      }
      />
    );
  }
}

export default GoToExampleButton;
