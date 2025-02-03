
import type { ImageSourcePropType, ViewStyle, ImageRequireSource, ImageSourcePropType, ViewStyle  } from 'react-native';
import { DefaultStatusString, DefaultStatusSources } from "./components/TrackerTimers";
import { DefaultActionSources } from "./components/PlayPauseButton";
import { Ref } from 'react';

export interface Itheme {
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    primaryBackground?: string;
    secondaryBackground?: string;
    disabled?: string;
    accent?: string
    label?: string;
    secondaryLabel?: string;
  },
  typography?: {
    family?: string
  },
  roundness?: number,
}

export interface TrackerTimersProps {
  theme: Itheme;
  timer: number;
  timestamp: string;
  renderTimer?: (props: { timer: number }) => JSX.Element;
  renderTimestamp?: (props: { timestamp: string }) => JSX.Element;
  status?: string;
  statusSources?: Record<string, any>;
}

export interface ProfillingProps {
  micSource?: ImageSourcePropType
  imageSource?: ImageSourcePropType
  theme: Itheme
  isPlayed: boolean
  onImagePress?: () => void
  ProfileImagePressDisabled?: boolean
  renderProfileImage?: () => JSX.Element
  renderProfileMic?: () => JSX.Element
  profilePosition: string
  renderProfile?: (props: { micSource?: ImageSourcePropType, imageSource?: ImageSourcePropType }) => JSX.Element
}


export interface AvatarProps {
  renderMic?: (props: { micSource: ImageSourcePropType }) => JSX.Element;
  renderImage?: (props: { imageSource: ImageSourcePropType }) => JSX.Element;
  theme?: Itheme;
  disabled?: boolean;
  micPosition?: 'left' | 'right';
  onImagePress?: () => void;
  imageSource?: ImageSourcePropType;
  micSource?: ImageSourcePropType;
  micColor?: string;
}

export interface DownloadProgressBarProps {
  percentage?: number;
  theme?: Itheme;
  renderComponent?: (props: { percentage: number | string, theme: Itheme}) => JSX.Element;
}

export interface PlayPauseButtonProps {
  isPlaying?: boolean;
  isDownloadable?: boolean;
  onPress: () => void;
  onDownload: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  theme?: Itheme;
  configSources?: Record<string, any>;
  style?: ViewStyle;
}

export interface TrackerLineProps {
  theme?: Itheme;
  thumbSize?: number;
  disabled?: boolean;
  totalValue?: number;
  currentValue?: number;
  onValuesChange: (value: number) => void;
  onValuesChangeStart: () => void;
  onValuesChangeFinish: (value?: number) => void;
  renderComponent?: () => JSX.Element;
  thumbColor?: string;
}

export interface VoiceMessagePlayerProps {
  source: { uri: string } | ImageRequireSource;
  timestamp: string;
  autoDownload?: boolean;
  customTheme?: Itheme;
  containerStyle?: ViewStyle;
  ref?: Ref<any>;

  chatStatusProps?: {
    isNew?: boolean;
    isPlayed?: boolean;
    status?: DefaultStatusString;
  };

  profileProps?: {
    profilePosition?: "left" | "right";
    profileImageSource: ImageSourcePropType;
    profileMicSource: ImageSourcePropType;
    ProfileImagePressDisabled?: boolean;
    onProfileImagePress?: () => void;
    renderProfileMic?: () => JSX.Element;
    renderProfileImage?: () => JSX.Element;
    renderProfile?: () => JSX.Element;
    profileContainerStyle?: ViewStyle;
  };

  bottomProps?: {
    renderBottomTimestamp?: () => JSX.Element;
    renderBottomTimer?: () => JSX.Element;
    bottomStatusSources?: DefaultStatusSources;
    bottomContainerStyle?: ViewStyle;
    renderBottom?: (props: {theme: Itheme; timer?: number; timestamp: string}) => JSX.Element;
  };

  leftActionProps?: {
    leftActionSources?: DefaultActionSources;
    leftActionContainerStyle?: ViewStyle;
    renderLeftAction?: (props: { isLoading?: boolean; isError?: boolean; isDownloaded?: boolean; isDownloading?: boolean; isPlayin?: boolean; }) => JSX.Element;
  };

  renderDownloadProgress?: (props: {progress: number, theme: Itheme}) => JSX.Element;

  trackProps?: {
    renderTrack?: (props: {
      error: boolean;
      theme: Itheme;
      duration: number;
      currentTime: number;
      setCurrentTime: (time: number) => void;
      soundRef: Ref<any>;
    }) => JSX.Element;
    onTrackChange?: (value: number) => void;
    onTrackChangeComplete?: (value: number) => void;
    onTrackChangeStart?: () => void;
  };

  renderText?: (props: {
    theme: Itheme;
    initializing: boolean;
    error: boolean;
    isDownloading: boolean;
    isURL: boolean;
    isDownloaded: boolean;
    autoDownload?: boolean;
    text: string;
  }) => JSX.Element;
  textNotDownloaded?: string;
  textLoading?: string;
  textError?: string;

  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: Error) => void;
  onLoading?: () => void;
  onDownload?: () => void;
  onDownloadSuccess?: (localPath: string) => void;
  onDownloadSaved?: (localPath: string) => void;
  onDownloadFailed?: (error: Error) => void;
  onLoadStart?: () => void;
  onLoadSuccess?: (ref: Ref<any>) => void;
  onLoadFailed?: (error: Error) => void;
}