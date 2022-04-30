import { Animated, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addCallenderEvent,
  deleteCallenderEvent,
} from "../../redux/callenderThunk";
import { memo, useEffect, useRef } from "react";

import LottieView from "lottie-react-native";

import checkerherz from "../../../assets/animations/checkerherz.json";
import { CLR_PRIMARY } from "../../core/Theme";

const hexToRgb = (hex) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

const LikeIcon = ({
  eventId,
  size = 32,
  style,
  colorOff = "#000",
  colorOn = CLR_PRIMARY,
  onLike = () => {},
}) => {
  const dispatch = useDispatch();
  const progress = useRef(new Animated.Value(isLiked ? 1 : 0)).current;

  const rgbOff = hexToRgb(colorOff);
  const rgbOn = hexToRgb(colorOn);
  /*
  heardfade.layers[0].shapes[0].it[1].c.k[1].s[0] = rgbOn[0] / 255;
  heardfade.layers[0].shapes[0].it[1].c.k[1].s[1] = rgbOn[1] / 255;
  heardfade.layers[0].shapes[0].it[1].c.k[1].s[2] = rgbOn[2] / 255;

  heardfade.layers[0].shapes[0].it[1].c.k[0].s[0] = rgbOff[0] / 255;
  heardfade.layers[0].shapes[0].it[1].c.k[0].s[1] = rgbOff[1] / 255;
  heardfade.layers[0].shapes[0].it[1].c.k[0].s[2] = rgbOff[2] / 255;
*/
  const likeEvent = (id) => {
    onLike();

    dispatch({
      type: "ADD_TO_LIKED_EVENTS",
      payload: id,
    });
    dispatch(addCallenderEvent(id));
  };

  const unLikeEvent = (id) => {
    dispatch({
      type: "REMOVE_FROM_LIKED_EVENTS",
      payload: id,
    });
    dispatch(deleteCallenderEvent(id));
  };

  const likedEvents = useSelector((state) => state.favorites.likedEvents);

  const isLiked = likedEvents.includes(eventId);

  const animationDuration = 300;
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
            alignSelf: "flex-end",
            marginBottom: "auto",
            marginTop: "auto",
            width: size,
          },
          style,
        ]}
      >
        <LottieView
          style={{
            height: size,
            width: size,
          }}
          progress={progress}
          source={checkerherz}
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
export default memo(LikeIcon);
