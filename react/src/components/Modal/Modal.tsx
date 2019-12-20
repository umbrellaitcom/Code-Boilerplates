/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { FC } from 'react';
import { Backdrop, Fade, Modal as MuiModal, withStyles } from '@material-ui/core';
import clsx from 'clsx';

import { ModalProps } from './Modal.types';
import { styles } from './Modal.styles';

const Modal: FC<ModalProps> = ({ open, onClose, children, classes, className, contentClassName }) => (
  <MuiModal
    className={clsx(classes.modal, className)}
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <div className={clsx(classes.container, contentClassName)}>
        <div className={classes.close} onClick={onClose}>
          +
        </div>
        <div className={classes.contentContainer}>{children}</div>
      </div>
    </Fade>
  </MuiModal>
);

const Styled = withStyles(styles)(Modal);

export { Styled as Modal };
