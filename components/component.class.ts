import S from '../lib/s';

export default abstract class Component {
	private _s: S;

	constructor(sInstance: S) {
		this._s = sInstance;
	}

	get s(): S {
		return this._s;
	}

	abstract renderFn(s: S, props: any): any;

	async render(props: any) {
		return await this.renderFn(this.s, props);
	}
}
