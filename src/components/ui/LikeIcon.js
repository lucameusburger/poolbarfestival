import { useDispatch, useSelector } from 'react-redux';
import { addCallenderEvent, deleteCallenderEvent } from '../../redux/callenderThunk';
import { memo, useEffect, useRef, useState } from 'react';
import AppButton from './AppButton';

import { CLR_PRIMARY } from '../../core/Theme';
import { FontAwesome } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const LikeIcon = ({ eventId, size = 32, style, onLike = () => {}, mode = 'icon' }) => {
  const dispatch = useDispatch();

  const likedEvents = useSelector((state) => state.favorites.likedEvents);

  const isLiked = likedEvents.includes(eventId);

  const likeEvent = (id) => {
    onLike();
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

  const [likeInited, setLikeInited] = useState(false);

  useEffect(() => {
    if (!likeInited && typeof isLiked === 'boolean') {
      setLikeInited(true);
    }
  }, [isLiked]);

  return mode === 'icon' ? (
    <Pressable
      onPress={() => {
        if (isLiked) {
          unLikeEvent(eventId);
        } else {
          likeEvent(eventId);
        }
      }}
      style={[
        style,
        {
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
          marginBottom: 'auto',
          marginTop: 'auto',
          width: size * 2,
          height: size,
        },
      ]}
    >
      <FontAwesome style={{ alignSelf: 'flex-end' }} name={isLiked ? 'heart' : 'heart-o'} size={size} color={isLiked ? CLR_PRIMARY : '#000000'} />
    </Pressable>
  ) : (
    <AppButton
      title="merken"
      style={[
        style,
        {
          backgroundColor: isLiked ? CLR_PRIMARY : '#ffffff',
        },
      ]}
      onPress={() => {
        if (isLiked) {
          unLikeEvent(eventId);
        } else {
          likeEvent(eventId);
        }
      }}
    />
  );
};

export default memo(LikeIcon);
