import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ConstantList from "../../appConfig";
import {
  Icon,
  IconButton,
  Badge,
  MenuItem,
  withStyles,
  MuiThemeProvider
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import { EgretMenu, EgretSearchBox } from "egret";
import { isMdScreen } from "utils";
import NotificationBar from "../SharedCompoents/NotificationBar";
import { Link } from "react-router-dom";
import ShoppingCart from "../SharedCompoents/ShoppingCart";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Select from '@material-ui/core/Select';
import LanguageSelect from '../SharedCompoents/LanguageSelect';
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  }
});
const ViewLanguageSelect = withTranslation()(LanguageSelect);

class LayoutV1Topbar extends Component {
  state = {};

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      LayoutV1Settings: {
        ...settings.LayoutV1Settings,
        leftSidebar: {
          ...settings.LayoutV1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { LayoutV1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = LayoutV1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = LayoutV1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    this.props.logoutUser();
  };

  render() {
    const { t, i18n } = this.props;
    let { theme, settings } = this.props;
    let language= 'en';
    const changeLanguage = lng => {
      alert(lng);
      i18n.changeLanguage(lng);
      //alert('here');
    };    

  
    const topbarTheme =
      settings.themes[settings.LayoutV1Settings.topbar.theme] || theme;
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <div className="topbar">
          <div
            className={`topbar-hold`}
            style={{ backgroundColor: topbarTheme.palette.primary.main }}
          >
            <div className="flex flex-space-between flex-middle h-100">
              <div className="flex">
                <IconButton onClick={this.handleSidebarToggle}>
                  <Icon>menu</Icon>
                </IconButton>

                <div className="hide-on-mobile">
                  <IconButton>
                    <Icon>mail_outline</Icon>
                  </IconButton>

                  <IconButton>
                    <Icon>web_asset</Icon>
                  </IconButton>

                  <IconButton>
                    <Icon>star_outline</Icon>
                  </IconButton>
                </div>
              </div>
              <div className="flex flex-middle">
                <EgretSearchBox />
                <ViewLanguageSelect/>
                <NotificationBar />
                <ShoppingCart></ShoppingCart>
                {/* <select class="form-control language-selector"  onClick={() => changeLanguage('en')}>
                    <option value="de">Deutsch</option>
                    <option value="en">English</option>
                    <option value="fr">Fran??ais</option>
                    <option value="it">Italiano</option>
                </select> */}
                
                <EgretMenu
                  menuButton={
                    <img
                      className="mx-8 text-middle circular-image-small cursor-pointer"
                      src={ConstantList.ROOT_PATH+"assets/images/face-7.jpg"}
                      alt="user"
                    />
                  }
                >
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link className="flex flex-middle" to="/">
                      <Icon> home </Icon>
                      <span className="pl-16"> Home </span>
                    </Link>
                  </MenuItem>
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link
                      className="flex flex-middle"
                      to="/page-layouts/user-profile"
                    >
                      <Icon> person </Icon>
                      <span className="pl-16"> Profile </span>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> settings </Icon>
                    <span className="pl-16"> Settings </span>
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleSignOut}
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> power_settings_new </Icon>
                    <span className="pl-16"> Logout </span>
                  </MenuItem>
                </EgretMenu>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

LayoutV1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      { setLayoutSettings, logoutUser }
    )(LayoutV1Topbar)
  )
);
