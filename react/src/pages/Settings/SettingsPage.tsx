import React, { FC, Fragment } from 'react';
import { Tab, Tabs, withStyles } from '@material-ui/core';
import { Link, Redirect, Switch, Route, withRouter } from 'react-router-dom';
import path from 'path';

import { SettingsPageProps } from './SettingsPage.types';
import { UsersTab } from './tabs/UsersTab';
import { styles } from './SettingsPage.styles';
import { CategoriesTab } from './tabs/CategoriesTab';

const SettingsPage: FC<SettingsPageProps> = ({ location: { pathname }, match: { url }, classes }) => {
  const tab = pathname.replace(new RegExp(`^${url}`), '');

  return (
    <Fragment>
      <Tabs
        classes={{
          root: classes.tabsRoot,
          indicator: classes.tabsIndicator,
        }}
        value={tab}
      >
        <Tab
          classes={{
            root: classes.tabRoot,
          }}
          component={Link}
          value="/users"
          label="Users"
          to={path.join(url, '/users')}
        />
        <Tab
          classes={{
            root: classes.tabRoot,
          }}
          component={Link}
          value="/categories"
          label="Categories"
          to={path.join(url, '/categories')}
        />
      </Tabs>
      <div className={classes.tabContainer}>
        <Switch>
          <Route exact path={path.join(url, '/users')} component={UsersTab} />
          <Route exact path={path.join(url, '/categories')} component={CategoriesTab} />
          <Redirect to={path.join(url, '/users')} />
        </Switch>
      </div>
    </Fragment>
  );
};

const WithRouter = withRouter(SettingsPage);
const Styled = withStyles(styles)(WithRouter);

export { Styled as SettingsPage };
