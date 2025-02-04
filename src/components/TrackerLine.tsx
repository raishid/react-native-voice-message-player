import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import _theme from "../helpers/theme";

import type { TrackerLineProps } from "../types";

/**
 * TrackerLine component provides a slider-like interface to track progress.
 *
 * @param {object} props - The props of the TrackerLine component.
 * @param {import("../helpers/theme").Theme} [props.theme=_theme] - The theme object with colors.
 * @param {number} [props.thumbSize=16] - Size of the slider thumb.
 * @param {boolean} [props.disabled=false] - Whether the slider is disabled or not.
 * @param {number} [props.totalValue=0] - Total possible value of the slider.
 * @param {number} [props.currentValue=0] - Current value of the slider.
 * @param {function} props.onValuesChange - Callback for value change.
 * @param {function} props.onValuesChangeStart - Callback for value change start.
 * @param {function} props.onValuesChangeFinish - Callback for value change finish.
 * @param {()=>JSX.Element} props.renderComponent - Custom component.
 * @param {string} props.thumbColor - Custom thumb or marker color
 */
const TrackerLine = ({
  theme = _theme,
  thumbSize = 16,
  disabled = false,
  totalValue = 0,
  currentValue = 0,
  onValuesChange,
  onValuesChangeStart,
  onValuesChangeFinish,
  renderComponent,
  thumbColor,
}: TrackerLineProps) => {
  if (!totalValue) return null;
  const selectedTheme = { ..._theme, ...theme };

  const [containerWidth, setContainerWidth] = useState(0);
  const [sliderLength, setSliderSlength] = useState(0);
  useEffect(() => {
    setSliderSlength(containerWidth);
  }, [containerWidth]);

  if (renderComponent) {
    return renderComponent();
  }

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        const width = e.nativeEvent.layout.width;
        const calculatedWidth = width - (width / 100) * 10;
        setContainerWidth(calculatedWidth);
      }}
    >
      <MultiSlider
        min={0}
        max={totalValue}
        values={[currentValue]}
        sliderLength={sliderLength}
        onValuesChange={(val) =>
          onValuesChange(disabled ? currentValue : val[0])
        }
        onValuesChangeStart={onValuesChangeStart}
        onValuesChangeFinish={(val) =>
          onValuesChangeFinish(disabled ? currentValue : val[0])
        }
        selectedStyle={{
          borderColor: disabled
            ? selectedTheme?.colors?.disabled
            : selectedTheme?.colors?.label,
          height: 0,
          borderTopWidth: 1.5,
        }}
        step={1}
        snapped
        unselectedStyle={{
          borderColor: selectedTheme?.colors?.secondary,
          height: 0,
          borderTopWidth: 1.5,
        }}
        markerStyle={{
          ...styles.marker,
          backgroundColor: disabled
            ? selectedTheme?.colors?.disabled
            : thumbColor || selectedTheme?.colors?.secondaryLabel,
          height: thumbSize,
          width: thumbSize,
          borderColor: selectedTheme?.colors?.primaryBackground,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  marker: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 2,
  },
});

export default TrackerLine;
