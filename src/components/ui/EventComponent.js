import { Text, View, TouchableOpacity } from 'react-native';
import StylesMain from '../../../styles/StylesMain';
import LikeIcon from '../ui/LikeIcon';
import { navigate } from '../../core/RootNavigation';

const EventComponent = ({ item }) => {
  let dateString = 'tba';
  if (item.day_item && item.day_item.date_start) {
    let dateOptions = { day: 'numeric', month: 'long' };
    let date = new Date(item.day_item.date_start);
    dateString = date.toLocaleDateString('en-US', dateOptions);
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Event', {
          id: item.id,
        })
      }
    >
      <View key={item.id} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        <View style={{ width: '100%', marginTop: 'auto', flexDirection: 'row' }}>
          <View style={{ width: '80%' }}>
            <Text style={StylesMain.eventListDateText}>{dateString}</Text>
            <Text style={StylesMain.eventListMainText}>{item.name}</Text>
          </View>
          <View style={{ width: '20%' }}>
            <LikeIcon eventId={item.id} colorOn="#c6c300" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventComponent;
