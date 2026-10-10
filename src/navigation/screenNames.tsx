export const SCREENS = {
  Home: 'Home',
  Video: 'Video',
}

export type ScreenName = (typeof SCREENS)[keyof typeof SCREENS];
