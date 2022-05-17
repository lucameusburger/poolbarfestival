import { memo, useEffect, useState } from 'react';
import { Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PARAMS = '?fit=cover&width=' + SCREEN_WIDTH * 2 + '&quality=80';
const imageHeight = SCREEN_WIDTH * 0.66 < 280 ? 280 : SCREEN_WIDTH * 0.66;
const BASE_URL = 'https://www.admin.poolbar.at/';

function PoolbarImage({ imageId, fallback, style, params = PARAMS }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (imageId) {
      setUrl({ uri: BASE_URL + 'assets/' + imageId + params });
    } else if (fallback) {
      setUrl(fallback);
    }
    console.log('?fit=cover&width=' + SCREEN_WIDTH + '&quality=80');
  }, [imageId, fallback]);
  return <>{url ? <Image source={url} resizeMode="cover" style={[{ backgroundColor: '#fff', height: imageHeight }, style]} onError={() => setUrl(fallback)} /> : null}</>;
}

export default memo(PoolbarImage);
