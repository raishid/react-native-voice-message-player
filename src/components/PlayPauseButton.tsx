import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import _theme from "../helpers/theme";

import type { PlayPauseButtonProps, DefaultActionSources } from "@types";
import type { ImageSourcePropType } from "react-native";

const defaultSources: DefaultActionSources = {
  playing: require("../assets/imgs/playing.png") as ImageSourcePropType,
  pause: require("../assets/imgs/pause.png") as ImageSourcePropType,
  download: require("../assets/imgs/download.png") as ImageSourcePropType,
  loading: require("../assets/imgs/loading.png") as ImageSourcePropType,
  error: require("../assets/imgs/error.png") as ImageSourcePropType,
};

/**
 * PlayPauseButton component that serves as a button for play, pause, downloading, etc.
 *
 * @param {object} props - The props of the PlayPauseButton component.
 * @param {boolean} [props.isPlaying=false] - If the audio is currently playing.
 * @param {boolean} [props.isDownloadable=false] - If the audio is downloadable.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @param {function} props.onDownload - The function to call when the download button is pressed.
 * @param {boolean} [props.disabled=false] - If the button should be disabled.
 * @param {boolean} [props.isLoading=true] - If the audio is currently loading.
 * @param {boolean} [props.isError=false] - If there is an error with the audio.
 * @param {import("../helpers/theme").Theme} [props.theme=_theme] - The theme object with colors.
 * @param {DefaultActionSources} [props.configSources=defaultSources] - Optional custom sources for images.
 * @param {import("react-native").ViewStyle} [props.style] - Container Style.
 */
const PlayPauseButton = ({
  isPlaying = false,
  isDownloadable = false,
  onPress,
  onDownload,
  disabled = false,
  isLoading = true,
  isError = false,
  theme = _theme,
  style,
  configSources = {},
  leftActionImgStyle,
}: PlayPauseButtonProps) => {
  disabled = disabled || isLoading;
  const buttonAction = isDownloadable || isError ? onDownload : onPress;
  const sources = { ...defaultSources, ...configSources };
  const selectedTheme = { ..._theme, ...theme };

  const [icon, setIcon] = useState(sources.pause);

  useEffect(() => {
    setIcon(sources.pause);

    if (isLoading) setIcon(sources.loading);
    if (isError) setIcon(sources.error);
    if (isDownloadable) setIcon(sources.download);
    if (isPlaying) setIcon(sources.playing);
  }, [isPlaying, isDownloadable, isError, isLoading, isPlaying]);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      onPress={buttonAction}
      style={[styles.container, style]}
    >
      <Image
        source={icon}
        style={[
          styles.image,
          {
            tintColor: disabled
              ? selectedTheme?.colors?.disabled
              : selectedTheme?.colors?.accent,
          },
          leftActionImgStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 18,
    tintColor: "black",
    width: 18,
    marginRight: 16,
    marginLeft: 8,
    marginVertical: 8,
    resizeMode: "contain",
  },
});

export default React.memo(PlayPauseButton);
