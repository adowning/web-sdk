
import type { ButtonProps } from 'components-pixi';

export type EmitterEventUi =
	| { type: 'hotKeySpace' }
	| { type: 'hotKeyEscape' }
	| { type: 'stopButtonClick' }
	| { type: 'stopButtonEnable' }
	| { type: 'uiShow' }
	| { type: 'uiHide' }
	| { type: 'drawerUnfold' }
	| { type: 'drawerFold' }
	| { type: 'drawerButtonShow' }
	| { type: 'drawerButtonHide' }
	// sound
	| { type: 'soundBetMode'; betModeKey: string }
	| { type: 'soundPressGeneral' }
	| { type: 'soundPressBet' }
	// bet services
	| { type: 'forceResult' }
	| { type: 'resumeBet' }
	| { type: 'autoBet' }
	| { type: 'bet' };

export type ButtonIcon =
	| 'decrease'
	| 'increase'
	| 'menu'
	| 'turbo'
	| 'autoSpin'
	| 'payTable'
	| 'info'
	| 'settings'
	| 'soundOn'
	| 'soundOff'
	| 'menuExit';

export type LayoutUiProps = {
	gameName: unknown;
	logo: unknown;
	amountBalance: { stacked?: boolean };
	amountWin: { stacked?: boolean };
	amountBet: { stacked?: boolean };
	buttonBuyBonus: Partial<ButtonProps>;
	buttonBet: Partial<ButtonProps>;
	buttonTurbo: Partial<ButtonProps>;
	buttonAutoSpin: Partial<ButtonProps>;
	buttonIncrease: Partial<ButtonProps>;
	buttonDecrease: Partial<ButtonProps>;
	buttonMenu: Partial<ButtonProps>;
	buttonMenuClose: Partial<ButtonProps>;
	buttonPayTable: Partial<ButtonProps>;
	buttonGameRules: Partial<ButtonProps>;
	buttonSettings: Partial<ButtonProps>;
	buttonSoundSwitch: Partial<ButtonProps>;
};
