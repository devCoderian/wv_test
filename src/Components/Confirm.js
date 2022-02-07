import React, {useState} from 'react';
import { Paragraph, Dialog, Portal, PaperProvider } from 'react-native-paper';
import { View, Button} from 'react-native';
const Confirm = ({visible}) => {

  console.log(visible);

  // const [visible, setVisible] = useState('');
    const hideDialog = () => setVisible(false);
  
    return (
      <PaperProvider>
        <View style={{justifyContent: 'center'}}>
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
        </View>
      </PaperProvider>
  );
};

export default Confirm;