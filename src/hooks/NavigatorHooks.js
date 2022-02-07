import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WithLocalSvg } from 'react-native-svg';
import TestSvg from '../assets/images/rizonlogo.svg';
import { useNavigation } from '@react-navigation/native';
const NavigatorHooks = () => {
    const navigation = useNavigation();
        navigation.setOptions({
            title: '',
            headerStyle: {
                backgroundColor: '#000', //Set Header color
              },
              headerLeft: () => (
                <WithLocalSvg
                width={100}
                height={40}
                fill={"#000000"}
                asset={TestSvg}
                />
              ),
            headerRight: () => (
                <Icon name = 'cog' size={26} color ='#fff' onPress={() => navigation.navigate('Settings')}/>
              ),
        });
};

export default NavigatorHooks;
