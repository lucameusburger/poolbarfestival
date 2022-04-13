import { Animated, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCallenderEvent, deleteCallenderEvent } from '../../redux/callenderThunk';
import { useEffect, useRef } from 'react';

import LottieView from 'lottie-react-native';

import heardfade from '../../../assets/animations/heartfade.json';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const LikeIcon = ({ eventId, style }) => {
    const dispatch = useDispatch();
    const progress = useRef(new Animated.Value(isLiked ? 1 : 0)).current;

    const likeEvent = (id) => {
        dispatch({
            type: 'ADD_TO_LIKED_EVENTS',
            payload: id,
        });
        dispatch(addCallenderEvent(id));

    };

    const unLikeEvent = (id) => {
        dispatch({
            type: 'REMOVE_FROM_LIKED_EVENTS',
            payload: id,
        });
        dispatch(deleteCallenderEvent(id));
    };

    const likedEvents = useSelector((state) => state.favorites.likedEvents);

    const isLiked = likedEvents.includes(eventId);

    const animationDuration = 1000;
    useEffect(() => {
        if (isLiked) {
            Animated.timing(progress, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(progress, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        }
    }, [isLiked]);

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    if (isLiked) {
                        unLikeEvent(eventId);
                    } else {
                        likeEvent(eventId);
                    }
                }}

                style={[
                    {
                        alignSelf: 'flex-end',
                        marginBottom: 'auto',
                        marginTop: 'auto'
                    },
                    style

                ]}
            >
                <LottieView
                    style={{
                        height: 100,
                        width: 100,
                    }}
                    progress={progress}
                    source={heardfade}
                />
            </TouchableOpacity>
        </>
    );
};
/**
 * <FontAwesome
                style={[
                    {
                        alignSelf: 'flex-end',
                        marginBottom: 'auto',
                        marginTop: 'auto'
                    },
                    style
                ]}
                name={isLiked ? 'heart' : 'heart-o'}
                size={32}
                color={color}
                onPress={() => {
                    if (isLiked) {
                        unLikeEvent(eventId);
                    } else {
                        likeEvent(eventId);
                    }
                }}
            />
 */
export default LikeIcon;
