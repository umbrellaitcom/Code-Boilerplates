import React, { FC } from 'react';
import { Button } from '@material-ui/core';

import { LogOutButtonProps } from './LogOutButton.types';

export const LogOutButton: FC<LogOutButtonProps> = ({ onLogOut }) => (
  <Button onClick={onLogOut} size="small" variant="outlined">
    Log out
  </Button>
);
