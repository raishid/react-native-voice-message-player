import type {
  ImageSourcePropType,
  ViewStyle,
  ImageRequireSource,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { Ref } from "react";
import type { Audio } from "expo-av";

type DefaultActionSources = {
  playing: ImageSourcePropType;
  pause: ImageSourcePropType;
  download: ImageSourcePropType;
  loading: ImageSourcePropType;
  error: ImageSourcePropType;
};

type DefaultStatusString =
  | "loading"
  | "single-check"
  | "double-check"
  | "double-check-viewed";

type DefaultStatusSources = {
  loading: ImageSourcePropType;
  "single-check": ImageSourcePropType;
  "double-check": ImageSourcePropType;
  "double-check-viewed": ImageSourcePropType;
};

export interface Itheme {
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    primaryBackground?: string;
    secondaryBackground?: string;
    disabled?: string;
    accent?: string;
    label?: string;
    secondaryLabel?: string;
  };
  typography?: {
    family?: string;
  };
  roundness?: number;
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
  micSource?: ImageSourcePropType;
  imageSource?: ImageSourcePropType;
  theme: Itheme;
  isPlayed: boolean;
  onImagePress?: () => void;
  ProfileImagePressDisabled?: boolean;
  renderProfileImage?: () => JSX.Element | null;
  renderProfileMic?: () => JSX.Element | null;
  profilePosition: string;
  renderProfile?: (props: {
    micSource?: ImageSourcePropType;
    imageSource?: ImageSourcePropType;
  }) => JSX.Element | null;
}

export interface AvatarProps {
  renderMic?: (props: { micSource: ImageSourcePropType }) => JSX.Element | null;
  renderImage?: (props: {
    imageSource: ImageSourcePropType;
  }) => JSX.Element | null;
  theme?: Itheme;
  disabled?: boolean;
  micPosition?: "left" | "right";
  onImagePress?: () => void;
  imageSource?: ImageSourcePropType;
  micSource?: ImageSourcePropType;
  micColor?: string;
}

export interface DownloadProgressBarProps {
  percentage?: number;
  theme?: Itheme;
  renderComponent?: (props: {
    percentage: number | string;
    theme: Itheme;
  }) => JSX.Element;
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
  leftActionImgStyle?: ImageStyle;
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
  timestamp?: string;
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
    renderProfileMic?: () => JSX.Element | null;
    renderProfileImage?: () => JSX.Element | null;
    renderProfile?: () => JSX.Element | null;
    profileContainerStyle?: ViewStyle;
  };

  bottomProps?: {
    renderBottomTimestamp?: () => JSX.Element | null;
    renderBottomTimer?: () => JSX.Element | null;
    bottomStatusSources?: DefaultStatusSources;
    bottomContainerStyle?: ViewStyle;
    renderBottom?: (props: {
      theme: Itheme;
      timer?: number;
      timestamp: string;
    }) => JSX.Element | null;
  };

  leftActionProps?: {
    leftActionSources?: DefaultActionSources;
    leftActionContainerStyle?: ViewStyle;
    leftActionImgStyle: ImageStyle;
    renderLeftAction?: (props: {
      isLoading?: boolean;
      isError?: boolean;
      isDownloaded?: boolean;
      isDownloading?: boolean;
      isPlaying?: boolean;
    }) => JSX.Element;
  };

  renderDownloadProgress?: (props: {
    progress: number;
    theme: Itheme;
  }) => JSX.Element;

  trackProps?: {
    renderTrack?: (props: {
      error: boolean;
      theme: Itheme;
      duration: number;
      currentTime: number;
      setCurrentTime: (time: number) => void;
      soundRef: Audio.Sound | null;
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
  }) => JSX.Element | null;
  textNotDownloaded?: string;
  textLoading?: string;
  textError?: string;
  showProfileAvatar?: boolean;
  trackContainerStyle?: ViewStyle;

  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: Error) => void;
  onLoading?: () => void;
  onDownload?: () => void;
  onDownloadSuccess?: (localPath: string) => void;
  onDownloadSaved?: (localPath: string) => void;
  onDownloadFailed?: (error: Error) => void;
  onLoadStart?: () => void;
  onLoadSuccess?: (ref: Audio.Sound) => void;
  onLoadFailed?: (error: Error) => void;
}
