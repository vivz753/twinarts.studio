import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'flmc67dk',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {autoUpdates: true, appId: 'xcgql66d6qi0g6w6kp8wps0s'},
  studioHost: 'expressionbyshue',
})
