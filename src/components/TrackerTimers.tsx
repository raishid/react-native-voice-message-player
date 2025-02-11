import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import secondsToTime from "../helpers/secondsToTime";
import _theme from "../helpers/theme";

import type { TrackerTimersProps, DefaultStatusSources } from "@types";
import type { ImageSourcePropType } from "react-native";

const defaultStatusSources: DefaultStatusSources = {
  loading: require("../assets/imgs/clock-loader.png") as ImageSourcePropType,
  "single-check":
    require("../assets/imgs/single-check.png") as ImageSourcePropType,
  "double-check":
    require("../assets/imgs/double-check.png") as ImageSourcePropType,
  "double-check-viewed":
    require("../assets/imgs/double-check.png") as ImageSourcePropType,
};

/** @typedef {keyof defaultStatusSources} DefaultStatusString*/

/**
 * @typedef {Object} DefaultStatusSources
 * @property {import("react-native").ImageSourcePropType} loading
 * @property {import("react-native").ImageSourcePropType} single-check
 * @property {import("react-native").ImageSourcePropType} double-check
 * @property {import("react-native").ImageSourcePropType} double-check-viewed
 */

/**
 * TrackerTimers component to display timer and timestamp.
 * Allows for custom rendering of both timer and timestamp values.
 *
 * @param {object} props - Properties to configure the component.
 * @param {import("../helpers/theme").Theme} [props.theme=_theme] - Theme for the component.
 * @param {number} props.timer - Timer value in seconds.
 * @param {keyof defaultStatusSources | "none"} props.status - Status icon changed
 * @param {string} props.timestamp - Timestamp value.
 * @param {DefaultStatusSources} props.statusSources - Optional custom status sources for images.
 * @param {({timer:number})=>JSX.Element} [props.renderTimer] - Custom render function for timer.
 *        Receives an object of the form: { timer: number }
 * @param {({timestamp:string})=>JSX.Element} [props.renderTimestamp] - Custom render function for timestamp.
 *        Receives an object of the form: { timestamp: string }
 * @returns {JSX.Element} Rendered TrackerTimers component.
 */
const TrackerTimers = ({
  theme = _theme,
  timer,
  timestamp,
  renderTimer,
  renderTimestamp,
  status,
  statusSources,
}: TrackerTimersProps) => {
  const selectedTheme = { ..._theme, ...theme };
  statusSources = { ...defaultStatusSources, ...statusSources };
  return (
    <View style={styles.container}>
      {renderTimer ? (
        renderTimer({ timer })
      ) : (
        <Text
          style={[
            styles.timerText,
            {
              color: selectedTheme?.colors?.accent,
              fontFamily: selectedTheme?.typography?.family,
            },
          ]}
        >
          {secondsToTime(Math.floor(timer))}
        </Text>
      )}

      <View style={styles.rightContainer}>
        {renderTimestamp ? (
          renderTimestamp({ timestamp })
        ) : (
          <Text
            style={[
              styles.timestampText,
              {
                color: selectedTheme?.colors?.accent,
                fontFamily: selectedTheme?.typography?.family,
              },
            ]}
          >
            {timestamp}
          </Text>
        )}
        {status && statusSources?.[status] && (
          <Image
            source={statusSources?.[status]}
            style={[
              styles.statusIcon,
              {
                tintColor:
                  status === "double-check-viewed"
                    ? selectedTheme?.colors?.primary
                    : selectedTheme?.colors?.secondaryLabel,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
};

// Styles associated with the component.
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  timerText: {
    fontSize: 8,
  },
  timestampText: {
    fontSize: 8,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    height: 8,
    width: 10,
    marginLeft: 4,
    resizeMode: "contain",
  },
});

export default TrackerTimers;
