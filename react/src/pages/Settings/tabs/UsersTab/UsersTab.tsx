import React, { Component, Fragment } from 'react';
import { Button, Grid, TableCell, TableRow, TextField, Typography, withStyles } from '@material-ui/core';

import { DataTable } from '~/components/tables/DataTable';
import { Filters, UsersTabProps, UsersTabState } from './UsersTab.types';
import { PAGE_SIZE } from '~/constants';
import { GetUsersRequestData } from '~/store/users/actions';
import { getErrorMessage, hasRows, getCount } from '~/utils/redux';
import { Modal } from '~/components/Modal';
import { CreateUser } from './CreateUser';
import { styles } from './UsersTab.styles';

class UsersTab extends Component<UsersTabProps, UsersTabState> {
  state = {
    isCreationUserModalShown: false,
    page: 1,
    filters: {
      search: {
        value: '',
      },
    },
  };

  componentDidMount() {
    const { onMount } = this.props;

    onMount(this.getParams());
  }

  componentDidUpdate(_: Readonly<UsersTabProps>, prevState: Readonly<UsersTabState>): void {
    const { onParams } = this.props;
    const { filters, page } = this.state;

    if (prevState.filters !== filters || prevState.page !== page) {
      onParams(this.getParams());
    }
  }

  getParams(): GetUsersRequestData {
    const { page } = this.state;

    return {
      page,
      size: PAGE_SIZE,
    };
  }

  showCreationUserModal = () =>
    this.setState({
      isCreationUserModalShown: true,
    });

  handleCloseCreationUserModal = () => {
    this.setState({
      isCreationUserModalShown: false,
    });
  };

  render() {
    const { filters, page, isCreationUserModalShown } = this.state;
    const { getUsersQuery, classes } = this.props;

    return (
      <Fragment>
        <Button
          disabled={getUsersQuery.loading}
          type="button"
          variant="outlined"
          color="primary"
          size="small"
          onClick={this.showCreationUserModal}
        >
          + Add user
        </Button>
        <DataTable<Filters>
          rowsPerPage={PAGE_SIZE}
          filters={filters}
          onChangeFilters={(newFilters) => this.setState({ filters: newFilters })}
          renderFilters={(changeFilters, currentFilters) => (
            <Grid container>
              <Grid item>
                <TextField
                  fullWidth
                  value={currentFilters.search.value}
                  onChange={(event) => changeFilters('search', event.target.value)}
                />
              </Grid>
            </Grid>
          )}
          onChangePage={(_, newPage) => {
            this.setState({
              page: newPage,
            });
          }}
          page={page}
          hasRows={hasRows(getUsersQuery)}
          isLoading={getUsersQuery.loading}
          error={getErrorMessage(getUsersQuery)}
          count={getCount(getUsersQuery)}
          header={<Typography variant="h5">All users</Typography>}
          headerRow={
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          }
        >
          {(hasRows(getUsersQuery) ? getUsersQuery.data.items : []).map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Typography>{user.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{user.email}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </DataTable>
        <Modal
          contentClassName={classes.createUserModal}
          open={isCreationUserModalShown}
          onClose={this.handleCloseCreationUserModal}
        >
          <CreateUser onCancel={this.handleCloseCreationUserModal} onSuccess={this.handleCloseCreationUserModal} />
        </Modal>
      </Fragment>
    );
  }
}

const Styled = withStyles(styles)(UsersTab);

export { Styled as UsersTab };
