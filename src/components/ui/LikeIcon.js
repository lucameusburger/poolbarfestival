import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCallenderEvent, deleteCallenderEvent } from '../../redux/callenderThunk';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const LikeIcon = ({ eventId, color = '#FFC23B', style }) => {
  const dispatch = useDispatch();
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

  return (
    <FontAwesome
      style={[
        {
          alignSelf: 'flex-end',
          marginBottom: 'auto',
          marginTop: 'auto',
        },
        style,
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
  );
};

export default LikeIcon;
