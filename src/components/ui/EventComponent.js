import { Text, View, TouchableOpacity } from 'react-native';
import StylesMain from '../../../styles/StylesMain';
import LikeIcon from '../ui/LikeIcon';
import { navigate } from '../../core/RootNavigation';
import { getDateString } from '../../core/helpers';

const EventComponent = ({ item }) => {
  let dateString = item.day_item.date_start ? getDateString(new Date(item.day_item.date_start)) : 'tba';

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        width: '100%',
      }}
      key={item.id}
      onPress={() =>
        navigate('Event', {
          id: item.id,
        })
      }
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flex: 8,
          }}
        >
          <Text style={StylesMain.artistListDateText}>{dateString}</Text>
          <Text style={StylesMain.artistListMainText}>{item.name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LikeIcon eventId={item.id} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventComponent;
