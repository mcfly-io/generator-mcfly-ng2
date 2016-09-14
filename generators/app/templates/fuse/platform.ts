import { ElementSchemaRegistry, COMPILER_PROVIDERS, platformCoreDynamic } from '@angular/compiler';
//import { XHR } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { ErrorHandler, Injector, ApplicationModule, CompilerOptions, COMPILER_OPTIONS, Renderer, RootRenderer, Sanitizer, PlatformRef, NgModule, NgModuleFactory, NgModuleRef, createPlatformFactory } from '@angular/core';
import { FuseRenderer, FuseRootRenderer } from './renderer';
import { FuseSanitizationService, FuseElementSchemaRegistry, FuseDomAdapter } from './dom_adapter'; //FuseDomAdapter,
import { FUSE_ROUTER_PROVIDERS } from './fuse_location_strategy';
//import { FUSE_HTTP_PROVIDERS } from './xhr';

@NgModule({
    declarations: [],
    providers: [
        { provide: ErrorHandler, useFactory: () => new ErrorHandler(true), deps: [] },
        FuseRootRenderer,
        { provide: RootRenderer, useClass: FuseRootRenderer },
        FuseRenderer,
        { provide: Renderer, useClass: FuseRenderer },
        { provide: Sanitizer, useClass: FuseSanitizationService },
        FUSE_ROUTER_PROVIDERS
    ],
    imports: [
        CommonModule,
        ApplicationModule
    ],
    exports: [
        CommonModule,
        ApplicationModule
    ]
})
export class FuseModule { }

export const FUSE_COMPILER_PROVIDERS = [
    COMPILER_PROVIDERS, {
        provide: COMPILER_OPTIONS,
        useValue: {
            providers: [
                { provide: ElementSchemaRegistry, useClass: FuseElementSchemaRegistry }
            ]
        },
        multi: true
    }
];
type BootstrapperAction = () => Promise<NgModuleRef<any>>;

class FusePlatformRef extends PlatformRef {

    constructor(private platform: PlatformRef) {
        super();
        FuseDomAdapter.makeCurrent();
    }

    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>): Promise<NgModuleRef<M>> {
        throw new Error('Not implemented.');
    }

    bootstrapModule<M>(moduleType: any, compilerOptions: CompilerOptions | CompilerOptions[] = []): Promise<NgModuleRef<M>> {
        return this.platform.bootstrapModule(moduleType, compilerOptions);
    }

    onDestroy(callback: () => void): void {
        this.platform.onDestroy(callback);
    }

    get injector(): Injector {
        return this.platform.injector;
    };

    destroy(): void {
        this.platform.destroy();
    }

    get destroyed(): boolean {
        return this.platform.destroyed;
    }
}

let _platformFuseDynamic = createPlatformFactory(platformCoreDynamic, 'FuseDynamic', FUSE_COMPILER_PROVIDERS);

export function platformFuseDynamic(extraProviders?: any[]): PlatformRef {
    // extraProviders = extraProviders || [];
    // extraProviders.push(FUSE_HTTP_PROVIDERS);
    return new FusePlatformRef(_platformFuseDynamic(extraProviders));
}
