import { Text, View, TouchableOpacity } from 'react-native';
import StylesMain from '../../../styles/StylesMain';
import LikeIcon from '../ui/LikeIcon';
import { navigate } from '../../core/RootNavigation';
import { getDateString } from '../../core/helpers';

const EventComponent = ({ item }) => {
  let dateString = item.day_item.date_start ? getDateString(new Date(item.day_item.date_start)) : 'tba';

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Event', {
          id: item.id,
        })
      }
      style={{ borderWidth: 2, borderColor: 'black', borderRadius: 10, margin: 5, padding: 10 }}
    >
      <View key={item.id} style={{ flex: 1, flexWrap: 'wrap' }}>
        <View style={{ width: '100%', marginTop: 'auto', flexDirection: 'row', height: '100%' }}>
          <View style={{ padding: 10, width: '100%' }}>
            <Text style={StylesMain.eventListDateText}>{dateString}</Text>
            <Text style={StylesMain.eventListMainText}>{item.name}</Text>
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              width: '10%',
              height: '100%',
              justifyContent: 'flex-end',
              marginLeft: 'auto',
            }}
          >
            <LikeIcon eventId={item.id} color={'#00ff00'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventComponent;
