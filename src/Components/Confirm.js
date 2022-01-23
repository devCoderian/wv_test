import * as React from 'react';
import { Paragraph, Dialog, Portal } from 'react-native-paper';

const Confirm = () => {
  const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);
  
    return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => console.log('Cancel')}>Cancel</Button>
          <Button onPress={() => console.log('Ok')}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Confirm;