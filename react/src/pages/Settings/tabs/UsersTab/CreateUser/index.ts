import { connect } from 'react-redux';
import { Dispatch } from 'redux-act';

import { CreateUserProps } from './CreateUser.types';
import { RootState } from '~/store/rootReducer';
import { CreateUser } from './CreateUser';
import { createUserQuerySelector } from '~/store/network/selectors';
import { createUserAction, CreateUserRequestData } from '~/store/users/actions';

const mapStateToProps = (state: RootState): Pick<CreateUserProps, 'createUserQuery'> => ({
  createUserQuery: createUserQuerySelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<CreateUserProps, 'onSubmit'> => ({
  onSubmit: (data: CreateUserRequestData): unknown => dispatch(createUserAction(data)),
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(CreateUser);

export { Connected as CreateUser };
