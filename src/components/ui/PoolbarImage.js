import { memo, useEffect, useState } from "react";
import { Image } from "react-native";

const BASE_URL = 'https://www.admin.poolbar.at/';
const PARAMS = '?fit=cover&width=800&height=600&quality=80'

function PoolbarImage({ imageId, fallback, style }) {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if (imageId) {
            setUrl({ uri: BASE_URL + 'assets/' + imageId + PARAMS })
        } else if (fallback) {
            setUrl(fallback)
        }
    }, [imageId, fallback])
    return (
        <>
            {url ?
                <Image
                    source={url}
                    loadingIndicatorSource={fallback}
                    resizeMode="cover"
                    style={style}
                    onError={() => setUrl(fallback)}
                /> :
                null
            }
        </>
    )


}

export default memo(PoolbarImage);