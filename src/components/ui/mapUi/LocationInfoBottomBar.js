import { Text, View } from 'react-native';

import { openGoogleMaps } from '../../../core/helpers';
import { navigate } from '../../../core/RootNavigation';
import AppButton from '../AppButton';

const LocationInfoBottomBar = ({ location }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
        }}
      >
        <AppButton
          title="navigieren"
          textProps={{
            numberOfLines: 1,
          }}
          style={{
            flex: 1,
            marginRight: 10,
          }}
          onPress={() => {
            openGoogleMaps(
              {
                latitude: location.location.coordinates[1],
                longitude: location.location.coordinates[0],
              },
              location?.name
            );
          }}
        />
        {location?.id && false && (
          <AppButton
            title="details"
            textProps={{
              numberOfLines: 1,
            }}
            style={{
              flex: 1,
              marginLeft: 10,
            }}
            onPress={() =>
              navigate('Raumfahrtprogramm', {
                id: location.id,
              })
            }
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          borderTopWidth: 2,
          borderColor: 'black',
          width: '100%',
          marginTop: 10,
          height: '100%',
          padding: 10,
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            margin: 'auto',
            fontFamily: 'Helviotopia',
            alignSelf: 'center',
          }}
        >
          {location?.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            margin: 'auto',
            fontFamily: 'Helviotopia',
            alignSelf: 'center',
          }}
        >
          {location?.description}
        </Text>
      </View>
    </View>
  );
};

export default LocationInfoBottomBar;
