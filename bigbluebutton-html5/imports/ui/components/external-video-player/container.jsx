import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { getVideoUrl } from './service';
import ExternalVideoComponent from './component';
import { layoutSelectInput, layoutSelectOutput, layoutDispatch } from '../layout/context';
import MediaService, { getSwapLayout } from '/imports/ui/components/media/service';
import getFromUserSettings from '/imports/ui/services/users-settings';

const ExternalVideoContainer = (props) => {
  const externalVideo = layoutSelectOutput((i) => i.externalVideo);
  const cameraDock = layoutSelectInput((i) => i.cameraDock);
  const { isResizing } = cameraDock;
  const layoutContextDispatch = layoutDispatch();

  return (
    <ExternalVideoComponent
      {
      ...{
        layoutContextDispatch,
        ...props,
        ...externalVideo,
        isResizing,
      }
      }
    />
  );
};

const LAYOUT_CONFIG = Meteor.settings.public.layout;

export default withTracker(({ isPresenter }) => {
  const inEchoTest = Session.get('inEchoTest');
  return {
    inEchoTest,
    isPresenter,
    videoUrl: getVideoUrl(),
    getSwapLayout,
    toggleSwapLayout: MediaService.toggleSwapLayout,
    hidePresentation: getFromUserSettings('bbb_hide_presentation', LAYOUT_CONFIG.hidePresentation),
  };
})(ExternalVideoContainer);
