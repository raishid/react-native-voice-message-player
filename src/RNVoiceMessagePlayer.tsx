// ReactNativeVoiceMessagePlayer.jsx

// Default Imports
import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  Ref,
} from "react";
import { View, Text, StyleSheet } from "react-native";
// import Sound from 'react-native-sound';
import { Audio, AVPlaybackStatus } from "expo-av";
// import RNFS from 'react-native-fs';
import * as FileSystem from "expo-file-system";

// Helpers Imports
import theme from "./helpers/theme";

// Components Imports
import PlayPauseButton from "./components/PlayPauseButton";
import DownloadProgressBar from "./components/DownloadProgressBar";
import TrackerTimers from "./components/TrackerTimers";
import TrackerLine from "./components/TrackerLine";
import Profiling from "./components/extraction/Profiling";

import type { VoiceMessagePlayerProps } from "@types";
import { format } from "date-fns";

/**
 * React Native Voice Message Player Component to play and display voice messages.
 *
 * @param {Object} props
 * @param {{uri: string}|import("react-native").ImageRequireSource} props.source - Source of the audio, either an object with uri or a require path.
 * @param {string} props.timestamp - The timestamp of the voice message.
 * @param {boolean} [props.autoDownload=false] - Whether to automatically download audio if given a URL.
 * @param {import("./helpers/theme").Theme} [props.customTheme] - Custom theme to override the default theme.
 * @param {import("react-native").ViewStyle} [props.containerStyle] - Style for the main container.
 * @param {Function} [props.ref] - Reference to the component.
 *
 * @param {Object} props.chatStatusProps
 * @param {boolean} [props.chatStatusProps.isNew=false] - Whether the message is new.
 * @param {boolean} [props.chatStatusProps.isPlayed=false] - Whether the message has been played.
 * @param {import("./components/TrackerTimers").DefaultStatusString} [props.chatStatusProps.status='single-check'] - Status of the chat message.
 *
 * @param {Object} props.profileProps
 * @param {('left'|'right')} [props.profileProps.profilePosition='right'] - Position of the profile.
 * @param {import("react-native").ImageSourcePropType} props.profileProps.profileImageSource - Source for the profile image.
 * @param {import("react-native").ImageSourcePropType} props.profileProps.profileMicSource - Source for the microphone icon.
 * @param {boolean} [props.profileProps.ProfileImagePressDisabled] - Whether the profile image press is disabled.
 * @param {Function} [props.profileProps.onProfileImagePress] - Callback when profile image is pressed.
 * @param {Function} [props.profileProps.renderProfileMic] - Custom render function for the microphone icon.
 * @param {Function} [props.profileProps.renderProfileImage] - Custom render function for the profile image.
 * @param {Function} [props.profileProps.renderProfile] - Custom render function for the whole profile.
 * @param {import("react-native").ViewStyle} [props.profileProps.profileContainerStyle] - Style for the profile container.
 *
 * @param {Object} props.bottomProps
 * @param {Function} [props.bottomProps.renderBottomTimestamp] - Custom render function for the bottom timestamp.
 * @param {Function} [props.bottomProps.renderBottomTimer] - Custom render function for the bottom timer.
 * @param {import("./components/TrackerTimers").DefaultStatusSources} [props.bottomProps.bottomStatusSources] - Sources for the bottom status.
 * @param {import("react-native").ViewStyle} [props.bottomProps.bottomContainerStyle] - Style for the bottom container.
 * @param {Function} [props.bottomProps.renderBottom] - Custom render function for the bottom section.
 *
 * @param {Object} props.leftActionProps
 * @param {import("./components/PlayPauseButton").DefaultActionSources} [props.leftActionProps.leftActionSources] - Sources for the left action buttons.
 * @param {import("react-native").ViewStyle} [props.leftActionProps.leftActionContainerStyle] - Style for the left action container.
 * @param {Function} [props.leftActionProps.renderLeftAction] - Custom render function for the left actions.
 *
 * @param {Function} [props.renderDownloadProgress] - Custom render function for the download progress.
 *
 * @param {Object} props.trackProps
 * @param {Function} [props.trackProps.renderTrack] - Custom render function for the audio track.
 * @param {Function} [props.trackProps.onTrackChange] - Callback when the track changes.
 * @param {Function} [props.trackProps.onTrackChangeComplete] - Callback when track change is complete.
 * @param {Function} [props.trackProps.onTrackChangeStart] - Callback when track change starts.
 *
 * @param {Function} [props.renderText] - Custom render function for the text.
 * @param {string} [props.textNotDownloaded='Download voice message'] - Text to show when the audio is not downloaded.
 * @param {string} [props.textLoading='Loading...'] - Text to show while loading the audio.
 * @param {string} [props.textError='Audio is not playable'] - Text to show when there's an error.
 *
 * @param {Function} [props.onPlay] - Callback when the audio starts playing.
 * @param {Function} [props.onPause] - Callback when the audio is paused.
 * @param {Function} [props.onError] - Callback when there's an error.
 * @param {Function} [props.onLoading] - Callback while the audio is loading.
 * @param {Function} [props.onDownload] - Callback when the audio starts downloading.
 * @param {Function} [props.onDownloadSuccess] - Callback when the audio download is successful.
 * @param {Function} [props.onDownloadSaved] - Callback when the downloaded audio is saved.
 * @param {Function} [props.onDownloadFailed] - Callback when the audio download fails.
 * @param {Function} [props.onLoadStart] - Callback when the audio starts loading.
 * @param {Function} [props.onLoadSuccess] - Callback when the audio loading is successful.
 * @param {Function} [props.onLoadFailed] - Callback when the audio loading fails.
 */
const VoicePlayerComponent = (
  props: VoiceMessagePlayerProps,
  ref: Ref<any>,
) => {
  const {
    bottomProps: {
      bottomContainerStyle = {},
      bottomStatusSources = {},
      renderBottom,
      renderBottomTimer,
      renderBottomTimestamp,
    } = {},
    leftActionProps: {
      leftActionContainerStyle = {},
      leftActionSources = {},
      leftActionImgStyle,
      renderLeftAction,
    } = {},
    profileProps: {
      profileImageSource = {},
      profileMicSource = {},
      ProfileImagePressDisabled = false,
      onProfileImagePress,
      profileContainerStyle = {},
      profilePosition = "right",
      renderProfile,
      renderProfileImage,
      renderProfileMic,
    } = {},
    trackProps: {
      onTrackChange,
      onTrackChangeComplete,
      onTrackChangeStart,
      renderTrack,
    } = {},
    chatStatusProps: {
      isNew = false,
      isPlayed = false,
      status = "single-check",
    } = {},
    timestamp,
    autoDownload,
    containerStyle,
    customTheme,
    onDownload,
    onDownloadFailed,
    onDownloadSaved,
    onDownloadSuccess,
    onError,
    onLoadFailed,
    onLoadStart,
    onLoadSuccess,
    onLoading,
    onPause,
    onPlay,
    renderDownloadProgress,
    renderText,
    textError = "Audio is not playable",
    textLoading = "Loading...",
    textNotDownloaded = "Download voice message",
    source,
    showProfileAvatar = false,
    trackContainerStyle,
  } = props || {};

  const audioSrc = typeof source === "object" ? source.uri : source;

  const [isPlaying, setIsPlaying] = useState(false);
  const [tempPause, setTempPause] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);

  const [time] = useState(timestamp ? timestamp : format(new Date(), "hh:mm"));

  const selectedTheme = { ...theme, ...customTheme };

  const isURL = typeof audioSrc === "string" && audioSrc?.startsWith("http");

  const timerValue =
    duration - currentTime >= 0 ? duration - currentTime : duration;

  const playSound = () => {
    if (soundRef.current === null) return;
    setIsPlaying(true);
    soundRef.current.playAsync().then((res) => {
      if (res.isLoaded && res.isPlaying) {
        typeof onPlay === "function" && onPlay();
      } else {
        const errorMsg = "Playback failed due to audio decoding error";
        typeof onError === "function" && onError(new Error(errorMsg));
        console.error(errorMsg);
        return;
      }
    });
  };
  const pauseSound = () => {
    if (soundRef.current === null) return;

    soundRef.current.pauseAsync().then(() => {
      setIsPlaying(false);
      typeof onPause === "function" && onPause();
    });
  };
  const downloadAndPlayAudio = async () => {
    if (isURL) {
      setIsDownloaded(false);
      console.log("Received URL based sound.");
      setIsDownloading(true);
      console.log("Downloading started...");
      typeof onDownload === "function" && onDownload();

      // Define the local file path
      // Generate a unique filename
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000); // random number between 0 and 999
      const uniqueFileName = `audio_${timestamp}_${randomNum}.mp3`;
      const localPath = `${FileSystem.cacheDirectory}/${uniqueFileName}`;
      console.log("Saving to: ", localPath);

      const resumableD = FileSystem.createDownloadResumable(
        audioSrc,
        localPath,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        },
      );
      resumableD
        .downloadAsync()
        .then((_uri) => {
          setIsDownloading(false);
          console.info("Received URL downloaded successfully!");
          typeof onDownloadSuccess === "function" &&
            onDownloadSuccess(localPath);

          FileSystem.getInfoAsync(localPath).then(({ exists }) => {
            if (exists) {
              typeof onDownloadSaved === "function" &&
                onDownloadSaved(localPath);
              console.info("Downloaded sound saved successfully!");
              loadSound(localPath);
            }
          });
        })
        .catch((err) => {
          const errorMsg = "Received URL threw error while downloading: " + err;
          console.error(errorMsg);
          setError(true);
          setIsDownloading(false);
          typeof onDownloadFailed === "function" &&
            onDownloadFailed(new Error(errorMsg));
        });
    } else {
      setIsDownloaded(true);
      console.log("Received Local URL based sound.");
      loadSound(audioSrc);
    }
  };
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSound();
    } else {
      playSound();
    }
  };

  const playBackOnStatus = async (res: AVPlaybackStatus) => {
    if (res.isLoaded && res.isPlaying) {
      const seg = res.positionMillis / 1000;
      setCurrentTime(seg);
    }
    if (res.isLoaded && !res.isPlaying) {
      if (res.durationMillis && res.durationMillis <= res.positionMillis) {
        setCurrentTime(0);
        setIsPlaying(false);
        await soundRef.current?.pauseAsync();
        await soundRef.current?.setPositionAsync(0);
      }
    }
  };

  const loadSound = async (filePath: string | number) => {
    setInitializing(true);
    setIsDownloaded(true);

    typeof onLoadStart === "function" && onLoadStart();

    console.log("Initializing Sound...");

    let soudSource: number | { uri: string };

    if (typeof filePath === "string") {
      soudSource = { uri: filePath };
    } else {
      soudSource = filePath;
    }
    try {
      const _sound = await Audio.Sound.createAsync(
        soudSource,
        {
          positionMillis: 0,
        },
        playBackOnStatus,
      );

      soundRef.current = _sound.sound;

      const soundstatus = await _sound.sound.getStatusAsync();

      if (soundstatus.isLoaded && soundstatus.durationMillis) {
        setDuration(soundstatus.durationMillis / 1000);
      }

      typeof onLoadSuccess === "function" && onLoadSuccess(soundRef.current);

      console.info("Sound Initialized Successfully!");

      setInitializing(false);
    } catch (err) {
      setInitializing(false);
      const errorMsg = "Sound Initialized Failed: " + err;
      typeof onLoadFailed === "function" && onLoadFailed(new Error(errorMsg));
      typeof onError === "function" && onError(new Error(errorMsg));
      console.error(errorMsg);
      setError(error);
      return;
    }
  };

  const unMount = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof onLoading === "function") {
      if (initializing || isDownloading) {
        onLoading();
      }
    }
  }, [initializing, isDownloading, onLoading]);

  useEffect(() => {
    downloadAndPlayAudio();
    return () => {
      unMount();
    };
  }, [audioSrc, autoDownload]);

  useImperativeHandle(ref, () => ({
    play: playSound,
    pause: pauseSound,
    load: loadSound,
    loadWithDownload: downloadAndPlayAudio,
    getSoundRef: () => soundRef.current,
    getDuration: () => duration,
    getIsDownloading: () => isDownloading,
    getIsDownloaded: () => isDownloaded,
    getDownloadProgress: () => downloadProgress,
    getPlayingStatus: () => isPlaying,
    getTimerInSeconds: () => timerValue,
    togglePlayingStatus: () => togglePlayPause,
  }));

  // Main return
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: selectedTheme?.colors?.primaryBackground,
          borderRadius: selectedTheme?.roundness,
        },
        containerStyle,
      ]}
    >
      {showProfileAvatar && profilePosition === "left" && (
        <View style={[styles.profileContainerStyle, profileContainerStyle]}>
          <Profiling
            micSource={profileMicSource}
            imageSource={profileImageSource}
            theme={selectedTheme}
            isPlayed={isPlayed}
            onImagePress={onProfileImagePress}
            ProfileImagePressDisabled={ProfileImagePressDisabled}
            renderProfileImage={renderProfileImage}
            renderProfileMic={renderProfileMic}
            profilePosition={profilePosition}
            renderProfile={renderProfile}
          />
        </View>
      )}
      {typeof renderLeftAction === "function" ? (
        renderLeftAction({
          isLoading: initializing || isDownloading,
          isError: error,
          isDownloaded,
          isDownloading,
          isPlaying,
        })
      ) : (
        <PlayPauseButton
          style={leftActionContainerStyle}
          theme={selectedTheme}
          configSources={leftActionSources}
          disabled={isDownloading}
          onDownload={downloadAndPlayAudio}
          isPlaying={isPlaying}
          onPress={togglePlayPause}
          isDownloadable={!isDownloaded}
          isLoading={initializing || isDownloading}
          isError={error}
          leftActionImgStyle={leftActionImgStyle}
        />
      )}

      <View style={[styles.centerView, trackContainerStyle]}>
        {typeof renderText === "function" ? (
          renderText({
            theme: selectedTheme,
            initializing,
            error,
            isDownloading,
            isURL,
            isDownloaded,
            autoDownload,
            text: textNotDownloaded,
          })
        ) : (
          <React.Fragment>
            {!autoDownload &&
              isURL &&
              !isDownloaded &&
              !isDownloading &&
              textNotDownloaded && (
                <Text
                  style={[
                    styles.text,
                    {
                      color: selectedTheme?.colors?.label,
                      fontFamily: selectedTheme?.typography?.family,
                    },
                  ]}
                >
                  {textNotDownloaded}
                </Text>
              )}
          </React.Fragment>
        )}

        {(initializing || error) && !isDownloading ? (
          typeof renderText === "function" ? (
            renderText({
              theme: selectedTheme,
              initializing,
              error,
              isDownloading,
              isURL,
              isDownloaded,
              autoDownload,
              text: textNotDownloaded,
            })
          ) : (
            <Text
              style={[
                styles.text,
                {
                  color: selectedTheme?.colors?.label,
                  fontFamily: selectedTheme?.typography?.family,
                },
              ]}
            >
              {initializing ? textLoading : error ? textError : null}
            </Text>
          )
        ) : (
          <React.Fragment>
            {isDownloading &&
              (typeof renderDownloadProgress === "function" ? (
                renderDownloadProgress({
                  progress: downloadProgress,
                  theme: selectedTheme,
                })
              ) : (
                <DownloadProgressBar
                  theme={selectedTheme}
                  percentage={downloadProgress}
                />
              ))}
            {!isDownloading &&
              (typeof renderTrack === "function" ? (
                renderTrack({
                  error,
                  theme: selectedTheme,
                  duration,
                  currentTime,
                  setCurrentTime,
                  soundRef: soundRef.current,
                })
              ) : (
                <TrackerLine
                  disabled={error}
                  theme={selectedTheme}
                  totalValue={duration}
                  currentValue={currentTime}
                  thumbColor={
                    isNew
                      ? selectedTheme?.colors?.primary
                      : selectedTheme?.colors?.secondaryLabel
                  }
                  onValuesChange={async (value) => {
                    await soundRef.current?.setPositionAsync(value * 1000);
                    setCurrentTime(value);
                    typeof onTrackChange === "function" && onTrackChange(value);
                  }}
                  onValuesChangeStart={() => {
                    pauseSound();
                    if (isPlaying) {
                      setTempPause(true);
                    }
                    typeof onTrackChangeStart === "function" &&
                      onTrackChangeStart();
                  }}
                  onValuesChangeFinish={(value) => {
                    if (soundRef.current) {
                      if (value) {
                        setCurrentTime(value);
                      }
                      if (tempPause) {
                        playSound();
                        setTempPause(false);
                      }
                      if (
                        typeof onTrackChangeComplete === "function" &&
                        value
                      ) {
                        onTrackChangeComplete(value);
                      }
                    }
                  }}
                />
              ))}
          </React.Fragment>
        )}

        <View style={[styles.timeContainer, bottomContainerStyle]}>
          {typeof renderBottom === "function" ? (
            renderBottom({
              theme: selectedTheme,
              timer: timerValue,
              timestamp: time,
            })
          ) : (
            <TrackerTimers
              status={status}
              statusSources={bottomStatusSources}
              theme={selectedTheme}
              timer={timerValue}
              timestamp={time}
              renderTimer={renderBottomTimer}
              renderTimestamp={renderBottomTimestamp}
            />
          )}
        </View>
      </View>
      {showProfileAvatar && profilePosition === "right" && (
        <Profiling
          micSource={profileMicSource}
          imageSource={profileImageSource}
          theme={selectedTheme}
          isPlayed={isPlayed}
          onImagePress={onProfileImagePress}
          ProfileImagePressDisabled={ProfileImagePressDisabled}
          renderProfileImage={renderProfileImage}
          renderProfileMic={renderProfileMic}
          profilePosition={profilePosition}
          renderProfile={renderProfile}
        />
      )}
    </View>
  );
};

// Custom Stylesheet
const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 60,
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  profileContainerStyle: {
    position: "relative",
    marginHorizontal: 8,
  },
  centerView: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    height: 20,
    marginRight: 16,
  },
  sliderContainer: {
    flex: 1,
  },
  timeContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -10,
  },
  text: {
    fontSize: 12,
  },
});

// Forward Ref
const RNVoiceMessagePlayer = React.forwardRef(VoicePlayerComponent);

// Default export
export default RNVoiceMessagePlayer;
