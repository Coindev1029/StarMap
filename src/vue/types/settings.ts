export type GuiScreen = 'preloader' | 'welcome' | 'interface';
export type GuiModeName = 'phantom' | 'real' | 'season';
export type GuiViewName = 'galaxy' | 'star' | 'planet';

export type GuiView = {
  name: GuiViewName;
  label: string;
  enabled: boolean;
};

export type GuiMode<T extends GuiModeName = GuiModeName> = {
  name: T;
  label: string;
  views: GuiView[];
  enabled: boolean;
};

export type GuiLevel = {
  id: number;
  value: number;
  label: string;
};
