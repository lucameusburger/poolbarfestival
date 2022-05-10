import { Text, View, TouchableOpacity } from 'react-native';
import StylesMain from '../../../styles/StylesMain';
import LikeIcon from '../ui/LikeIcon';
import { navigate } from '../../core/RootNavigation';
import { getDateString } from '../../core/helpers';

const EventComponent = ({ item, onLike }) => {
  let dateString = item.day_item.date_start ? getDateString(new Date(item.day_item.date_start)) : 'tba';

  const today = new Date();
  const date = new Date(item.day_item.date_start);
  const isToday = date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
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
          <Text style={StylesMain.artistListMainText}>{item.name}</Text>
          <Text
            style={[
              StylesMain.textSmallBold,
              {
                backgroundColor: isToday ? '#00ff00' : '#ffffff',
                alignSelf: 'flex-start',
              },
            ]}
          >
            {isToday ? 'HEUTE' : dateString}
          </Text>
          {item.soldout && <Text style={[StylesMain.textSmallBold, { backgroundColor: '#00ff00', alignSelf: 'flex-start' }]}>SOLD OUT</Text>}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LikeIcon eventId={item.id} onLike={onLike} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventComponent;
