import React from 'react';
import pureRender from 'pure-render-decorator';
import StyleSheet from './styles';
import theme from '../theme';

const styles = StyleSheet.create({
  root: {
    fontFamily: theme.fontFamily,
    fontWeight: theme.fontWeight,
    fontSize: '12px',
    lineHeight: '16px',
    [theme.media.fromTablet]: {
      fontSize: '14px',
      lineHeight: '18px',
    },
    [theme.media.fromDesktop]: {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
  foreground: {
    margin: '0 auto',
    minWidth: '320px',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.backgroundColor,
    transform: 'translateZ(0)',
    color: theme.textColor,
    textAlign: 'center',
    paddingTop: '60px',
    transition: 'transform 0.3s ease-in',
    [theme.media.fromTablet]: {
      paddingTop: '100px',
    },
    [theme.media.fromDesktop]: {
      paddingTop: '160px',
    },
  },
  foregroundOpen: {
    position: 'absolute',
    width: '100%',
    transform: 'translateZ(0) scale(0.8, 0.8) translate(0, -110%)',
  },
  background: {
    zIndex: -1,
    display: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'auto',
    padding: '90px 30px',
    textAlign: 'center',
    color: theme.inverseTextColor,
  },
  backgroundContent: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '580px',
  },
  backgroundShown: {
    display: 'block',
  },
  backgroundControls: {
    position: 'fixed',
    top: '50px',
    left: 0,
    width: '100%',
    textAlign: 'center',
  },
  widgets: {
    margin: '0 auto',
    padding: '35px 20px 20px 20px',
    [theme.media.biggerPhones]: {
      maxWidth: '354px',
    },
    [theme.media.fromTablet]: {
      padding: '65px 20px 20px 20px',
    },
  },
  websites: {
    padding: '20px 0',
    marginTop: '40px',
    [theme.media.biggerPhones]: {
      marginTop: '35px',
    },
    [theme.media.fromDesktop]: {
      marginTop: '40px',
    },
  },
  githubIcon: websiteIconShared,
  link: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  controls: {
    display: 'flex',
    padding: '120px 10% 80px 10%',
  },
  control: {
    flex: '1',
    margin: '0 25px',
  },
  controlsSpacer: {
    height: '25px',
  },
  footer: {
    padding: '0 10px',
  },
  mailto: {
    display: 'block',
    textAlign: 'center',
    color: theme.textColor,
    textDecoration: 'none',
    [':hover']: {
      textDecoration: 'underline',
    },
  },
});

export default styles;

@pureRender
export default class TestScreen extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={cx(styles.foreground, { [styles.foregroundOpen]: showBackground })}>
          <Button onClick={actions.showBackground}>Background</Button>

        </div>
        <div className={cx(styles.background, { [styles.backgroundShown]: showBackground })}>
          <div className={styles.backgroundControls}>
            <Button type="inverse" onClick={actions.hideBackground}>Back</Button>
          </div>
          <div className={styles.backgroundContent}>
            <p>
              Hello there
            </p>
          </div>
        </div>
      </div>
    );
  }
}