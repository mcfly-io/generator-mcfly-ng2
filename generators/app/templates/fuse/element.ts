export class Element {

    private _attributes: Map<string, any> = new Map<string, any>();

    constructor(public type: string, public id: string, public parent: Element) {
        //
    }

    public setAttribute(name: string, value: any) {
        this._attributes[name] = value;
    }

    public getAttribute(name: string): any {
        return this._attributes[name];
    }
}
