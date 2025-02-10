import React from "react";
import Avatar from "../Avatar";

import type { ProfillingProps } from "@types";

// Extracted Profiling outside of the main component
const Profiling = React.memo<ProfillingProps>((props) => {
  const {
    micSource,
    imageSource,
    theme,
    isPlayed,
    onImagePress,
    ProfileImagePressDisabled,
    renderProfileImage,
    renderProfileMic,
    profilePosition,
  } = props;

  if (props.renderProfile && typeof props.renderProfile === "function") {
    if (micSource && imageSource) {
      return props.renderProfile({
        micSource,
        imageSource,
      });
    }
  }

  return (
    <Avatar
      micColor={
        isPlayed ? theme?.colors?.primary : theme?.colors?.secondaryLabel
      }
      micPosition={profilePosition === "right" ? "left" : "right"}
      renderImage={renderProfileImage}
      renderMic={renderProfileMic}
      imageSource={imageSource}
      micSource={micSource}
      onImagePress={onImagePress}
      disabled={ProfileImagePressDisabled}
    />
  );
});

export default React.memo(Profiling);
