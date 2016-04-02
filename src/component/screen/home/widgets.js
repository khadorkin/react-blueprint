import React from 'react';
import range from 'lodash/range';
import { List } from 'immutable';
import pureRender from '../../pure-render';
import Slider, { SliderGrippy } from '../../slider';
import BarMeter, { BarMeterItem } from '../../bar-meter';
import ItemList from '../../item-list';
import ResizableContent from '../../resizable-content';
import StyleSheet, { em, resolveMedia } from '../../styles';
import theme from '../../theme';
import { listType } from '../../types';

const { object } = React.PropTypes;

const styles = StyleSheet.create({
  fontSizeContainer: {
    fontSize: '40px',
    [theme.media.biggerPhones]: {
      fontSize: '60px',
    },
    [theme.media.fromDesktop]: {
      fontSize: '60px',
    },
  },
});

export default class HomeScreenWidgets extends React.Component {

  static propTypes = {
    actions: object,
    list: listType,
  }

  onStartChange = (value) => {
    const { actions, list } = this.props;
    actions.setListStart(value * list.length);
  }

  onEndChange = (value) => {
    const { actions, list } = this.props;
    actions.setListEnd(value * list.length);
  }

  onListResize = (height) => {
    const { actions, list } = this.props;
    actions.setListEnd(list.start + height);
  }

  onListScroll = (scrollTop) => {
    const { actions, list } = this.props;
    const items = list.end - list.start;
    const start = scrollTop;
    const end = start + items;
    actions.setListRange(start, end);
  }

  getFontSizeContainerPx() {
    const resolved = resolveMedia(styles.getStyles().fontSizeContainer);
    return parseInt(resolved.fontSize, 10);
  }

  fromPx = px => px / this.getFontSizeContainerPx();
  toPx = val => val * this.getFontSizeContainerPx();

  render() {
    const { list } = this.props;
    const length = list.length;
    const startRatio = list.start / list.length;
    const endRatio = list.end / list.length;

    const listItems = new List(range(length).map(num => String(num)));
    const listHeight = (endRatio - startRatio) * length;
    const scrollTop = list.start;

    return (
      <div>
        <BarMeter>
          <BarMeterItem value={startRatio} onChange={this.onStartChange} />
          <BarMeterItem value={endRatio} onChange={this.onEndChange} />
        </BarMeter>
        <Slider>
          <SliderGrippy value={startRatio} onChange={this.onStartChange} />
          <SliderGrippy value={endRatio} onChange={this.onEndChange} />
        </Slider>
        <div className={styles.fontSizeContainer}>
          <ResizableContent
            height={listHeight}
            scrollTop={scrollTop}
            onResize={this.onListResize}
            onScroll={this.onListScroll}
            toUnit={em}
            fromPx={this.fromPx}
            toPx={this.toPx}
          >
            <ItemList items={listItems} />
          </ResizableContent>
        </div>
      </div>
    );
  }
}

pureRender(HomeScreenWidgets);
