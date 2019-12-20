import { ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';

import { styles } from './Modal.styles';

export type ModalProps = WithStyles<typeof styles> & {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};
