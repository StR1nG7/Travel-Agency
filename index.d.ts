declare module '*.svg';
declare module '*.png';
declare module '*.jpg' {
	const value: any;
	export = value;
}
