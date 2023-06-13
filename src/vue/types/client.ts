import { Race } from '~/blockchain/types';
import { FrontEvents } from '~/events/FrontEvents';

type ClientEventName =
  | 'GAME_LOADING'
  | 'GAME_LOADED'
  | 'GAME_CREATED'
  | 'GAME_FULLSCREEN'
  | 'HIDE_STAR_PREVIEW'
  | 'SHOW_STAR_PREVIEW'
  | 'SHOW_STAR_GUI'
  | 'PHANTOM_STAR_PREVIEW';

interface BaseEvent {
  eventName: ClientEventName;
}

export interface GameLoadingEvent extends BaseEvent {
  eventName: 'GAME_LOADING';
  percent: number;
}

export interface GameLoadedEvent extends BaseEvent {
  eventName: 'GAME_LOADED';
  frontEvents: typeof FrontEvents;
}

export interface GameCreatedEvent extends BaseEvent {
  eventName: 'GAME_CREATED';
}

export interface GameFullscreenEvent extends BaseEvent {
  eventName: 'GAME_FULLSCREEN';
  v: boolean;
}

export interface GameHideStarPreviewEvent extends BaseEvent {
  eventName: 'HIDE_STAR_PREVIEW';
}

export interface ShowStarPreviewEvent extends BaseEvent {
  eventName: 'SHOW_STAR_PREVIEW';
  starId: number;
  name: string;
  description: string;
  level: number;
  race: Race;
  pos2d: { x: number; y: number };
}

export interface ShowStarGuiEvent extends BaseEvent {
  eventName: 'SHOW_STAR_GUI';
  name: string;
  description: string;
  level: number;
  race: Race;
  planetSlots: number;
  energy: number;
  life: number;
  scale: number;
}

export interface PhantomStarPreviewEvent extends BaseEvent {
  eventName: 'PHANTOM_STAR_PREVIEW';
  pos3d: { x: number; y: number; z: number };
  pos2d: { x: number; y: number };
}

export type ClientEvent =
  | GameLoadingEvent
  | GameLoadedEvent
  | GameCreatedEvent
  | GameFullscreenEvent
  | GameHideStarPreviewEvent
  | ShowStarPreviewEvent
  | ShowStarGuiEvent
  | PhantomStarPreviewEvent;
