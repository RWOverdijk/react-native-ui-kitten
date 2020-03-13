/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type TopNavigationStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | 'control' | string;
}>;

export interface TopNavigationProps extends ViewProps, TopNavigationStyledProps {
  title?: RenderProp<TextProps> | React.ReactText;
  subtitle?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp;
  accessoryRight?: RenderProp;
  alignment?: AlignmentProp;
}

export type TopNavigationElement = React.ReactElement<TopNavigationProps>;

type AlignmentProp = 'start' | 'center';

/**
 * TopNavigation provides a heading component for the entire page.
 *
 * @extends React.Component
 *
 * @property {ReactText | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the top navigation.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | (TextProps) => ReactElement} subtitle - String, number or a function component
 * to render within the top navigation.
 * If it is a function, expected to return a Text.
 *
 * @property {() => ReactElement} accessoryLeft - Function component
 * to render to the left edge the top navigation.
 *
 * @property {() => ReactElement} accessoryLeft - Function component
 * to render to the right edge the top navigation.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `default`, `control`.
 * Use *control* appearance when needed to display within a contrast container.
 *
 * @property {string} alignment - Alignment of nested components.
 * Can be `center` or `start`.
 * Defaults to *start*.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example TopNavigationSimpleUsage
 * In basic example TopNavigation contains a title and actions.
 *
 * @overview-example TopNavigationAccessories
 * TopNavigation may contain a single action on the left,
 * and as many actions as needed on the right. In common practices, actions may be wrapped in menus.
 *
 * @overview-example TopNavigationDivider
 * It is a good idea to separate TopNavigation and screen contents with `Divider` component.
 *
 * @overview-example TopNavigationImageTitle
 * Sometimes it is needed to have an image as title.
 * In this case, a function component can be provided to `title` property.
 *
 * @overview-example TopNavigationStyling
 * TopNavigation and it's inner views can be styled by passing them as function components.
 *
 * In most cases, this is redundant, if [custom theme is configured](guides/branding).
 * ```
 * import { TopNavigation, Text } from '@ui-kitten/components';
 *
 * <TopNavigation
 *   title={evaProps => <Text {...evaProps}>Title</Text>}
 *   subtitle={evaProps => <Text {...evaProps}>Subtitle</Text>}
 * />
 * ```
 */
export class TopNavigationComponent extends React.Component<TopNavigationProps> {

  static styledComponentName: string = 'TopNavigation';

  private getAlignmentDependentStyles = (alignment: AlignmentProp) => {
    if (alignment === 'center') {
      return {
        container: styles.containerCentered,
        titleContainer: styles.titleContainerCentered,
      };
    }

    return {
      rightControlsContainer: styles.rightControlsContainerStart,
    };
  };

  private getComponentStyle = (source: StyleType) => {
    const {
      titleTextAlign,
      titleFontFamily,
      titleFontSize,
      titleFontWeight,
      titleColor,
      subtitleTextAlign,
      subtitleFontFamily,
      subtitleFontSize,
      subtitleFontWeight,
      subtitleColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      title: {
        textAlign: titleTextAlign,
        fontFamily: titleFontFamily,
        fontSize: titleFontSize,
        fontWeight: titleFontWeight,
        color: titleColor,
      },
      subtitle: {
        textAlign: subtitleTextAlign,
        fontFamily: subtitleFontFamily,
        fontSize: subtitleFontSize,
        color: subtitleColor,
        fontWeight: subtitleFontWeight,
      },
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, title, subtitle, alignment, accessoryLeft, accessoryRight, ...viewProps } = this.props;

    const evaStyles = this.getComponentStyle(eva.style);
    const alignmentStyles = this.getAlignmentDependentStyles(alignment);

    return (
      <View
        style={[evaStyles.container, styles.container, alignmentStyles.container, style]}
        {...viewProps}>
        <View style={styles.leftControlContainer}>
          <FalsyFC component={accessoryLeft}/>
        </View>
        <View style={alignmentStyles.titleContainer}>
          <FalsyText
            style={evaStyles.title}
            component={title}
          />
          <FalsyText
            style={evaStyles.subtitle}
            component={subtitle}
          />
        </View>
        <View style={[styles.rightControlsContainer, alignmentStyles.rightControlsContainer]}>
          <FalsyFC component={accessoryRight}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCentered: {
    justifyContent: 'space-between',
  },
  titleContainerCentered: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftControlContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  rightControlsContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  rightControlsContainerStart: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const TopNavigation = styled<TopNavigationProps>(TopNavigationComponent);
