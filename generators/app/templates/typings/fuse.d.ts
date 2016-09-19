interface AngularRenderer {
    createElement(type: string, isRoot: boolean): string;
    setAttribute(id: string, attribute: string, value: any): void;
    renderElement(id: string, type: string, parentId: string, collection: string, scope: string): void;
    removeElement(id: string, type: string, parentId: string, collection: string): void;
    setEventListener(id: string, type: string, eventName: string, callback: Function): void;
    removeAllListeners(id: string, type: string): void;
    navigateTo(page: string, id: string): void;
    print(): void;
}

interface Location {
    latitude: number;
    longitude: number;
    accuracy: number;
}

interface FuseJS {
    angularRenderer: AngularRenderer;
    applicationRef: any;
    rootComponent: any;
    platformProviders: Array<any>;
    routerProviders: Array<any>;
    bootstraper: any;
    geoLocation: {
        location: Location,
        getLocation(timeout: number): Promise<Location>,
        onChanged(location: Location)
        startListening(minimumReportInterval: number, desiredAccuracyInMeters: number)
    };
    camera: {
        takePicture(options: { targetWidth: number, targetHeight: number, correctOrientation: boolean })
    };
}

interface Zone { }

interface Window {
    Zone: any;
    zone: any;
    JSON: any;
    RegExp: any;
    Map: any;
    Set: any;
    Reflect: any;
    Promise: any;
    Math: any;
    EventTarget: any;
    requireCache: any;
    clearWebpackCache: any;
    fusejs: FuseJS;
    cordova: any;
    Storage: Function;
    sessionStorage: any;
    IonicNative: any;
}