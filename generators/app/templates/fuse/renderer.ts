import { Injectable, Renderer, RenderComponentType, RootRenderer } from '@angular/core';
import { Element } from './element';
import { isPresent, isBlank } from './lang-facade';

@Injectable()
export class FuseRootRenderer implements RootRenderer {
    private _registeredComponent: Map<string, FuseRenderer> = new Map<string, FuseRenderer>();

    renderComponent(componentProto: RenderComponentType): Renderer {
        let renderer = this._registeredComponent.get(componentProto.id);
        if (isBlank(renderer)) {
            renderer = new FuseRenderer(this, componentProto);
            this._registeredComponent.set(componentProto.id, renderer);
        }
        return renderer;
    }
}

@Injectable()
export class FuseRenderer implements Renderer {
    private objectCount: number = 1;

    constructor(private _rootRenderer: FuseRootRenderer, private componentProto: RenderComponentType) { }

    public renderComponent(componentType: RenderComponentType): Renderer {
        //this.consoleLog('renderComponent', arguments);
        return this._rootRenderer.renderComponent(componentType);
    }

    public selectRootElement(selector: string): Element {
        this.consoleLog('selectRootElement ' + selector, arguments);
        let id = '';
        if (window.fusejs) {
            id = window.fusejs.angularRenderer.createElement(selector, true);
            window.fusejs.angularRenderer.renderElement(id, null, null, null, null);
        } else {
            id = selector + '_' + (this.objectCount++).toString();
        }
        this.consoleLog('createElement ' + id + ' of type ' + selector, arguments);
        return new Element(selector, id, null);
    }

    public createElement(parentElement: Element, type: string): Element {
        let id = '';
        if (window.fusejs) {
            id = window.fusejs.angularRenderer.createElement(type, false);
        } else {
            id = type + '_' + this.objectCount++;
        }
        this.consoleLog('createElement ' + id + ' of type ' + type, arguments);
        if (isPresent(parentElement)) {
            let collection = parentElement.getAttribute('collection');
            let scope = parentElement.getAttribute('scope');
            this.consoleLog('renderElement ' + id + ' in ' + parentElement.id, arguments);
            if (window.fusejs) {
                window.fusejs.angularRenderer.renderElement(id, type, parentElement.id, collection, scope);
            }

        }
        //this.consoleLog('Element created : ' + type + ' ' + id);
        return new Element(type, id, parentElement);
    }

    public createViewRoot(hostElement: Element): Element {
        this.consoleLog('createViewRoot', arguments);
        return hostElement;
    }

    public createTemplateAnchor(parentElement: Element): Element {
        this.consoleLog('createTemplateAnchor', arguments);
        return new Element('#comment', null, parentElement);
    }

    public createText(parentElement: Element, value: string): any {
        // this.consoleLog('createText', arguments);
        return new Element(null, null, parentElement);
    }

    public projectNodes(parentElement: Element, nodes: Element[]) {
        this.consoleLog('projectNodes', arguments);
        nodes.forEach((node) => {
            node.parent = parentElement;
            let collection = node.getAttribute('collection'); //.parent
            if (window.fusejs) {
                window.fusejs.angularRenderer.renderElement(node.id, node.type, node.parent.id, collection, null);
            }
        });
    }

    public attachViewAfter(anchorElement: Element, viewRootNodes: Element[]) {
        this.consoleLog('attachViewAfter', arguments);
        for (let i = 0; i < viewRootNodes.length; i++) {
            let node = viewRootNodes[i];
            node.parent = anchorElement.parent;
            let collection = node.getAttribute('collection'); //.parent
            //this.consoleLog(collection);
            this.consoleLog('renderElement ' + node.id + ' in ' + node.parent.id, arguments);
            this.consoleLog('renderElement', arguments);
            if (window.fusejs) {
                window.fusejs.angularRenderer.renderElement(node.id, node.type, node.parent.id, collection, null);
            }
        }
    }

    public detachView(viewRootNodes: Element[]) {
        this.consoleLog('detachView', arguments);

        //this.consoleLog(viewRootNodes[0]);
        for (let i = 0; i < viewRootNodes.length; i++) {
            let node = viewRootNodes[i];
            let collection = node.getAttribute('collection');
            if (window.fusejs && node.id) {
                window.fusejs.angularRenderer.removeElement(node.id, node.type, node.parent ? node.parent.id : null, collection);
            }
        }
    }

    public destroyView(hostElement: Element, viewAllNodes: Element[]) {
        this.consoleLog('destroyView', arguments);
        for (let i = 0; i < viewAllNodes.length; i++) {
            let node = viewAllNodes[i];
            let collection = node.getAttribute('collection');

            if (window.fusejs && node.id) {
                window.fusejs.angularRenderer.removeAllListeners(node.id, node.type);
                window.fusejs.angularRenderer.removeElement(node.id, node.type, node.parent ? node.parent.id : null, collection);
            }
        }
    }

    public listen(renderElement: Element, name: string, callback: Function): Function {
        this.consoleLog('listen', arguments);
        let zonedCallback = (<any>global).Zone.current.wrap(callback);
        //        let zonedCallback = global['zone'].bind(callback);
        if (window.fusejs) {
            window.fusejs.angularRenderer.setEventListener(renderElement.id, renderElement.type, name, zonedCallback);
        }
        return function() {
            //console.log('fuse renderer needs to implement the listen remove function ' + name);
        };
    }

    public listenGlobal(target: string, name: string, callback: Function): Function {
        this.consoleLog('listenGlobal', arguments);
        return null;
    }

    public setElementProperty(renderElement: Element, propertyName: string, propertyValue: any) {
        this.consoleLog('setElementProperty', arguments);
        renderElement.setAttribute(propertyName, propertyValue);
        if (window.fusejs) {
            window.fusejs.angularRenderer.setAttribute(renderElement.id, propertyName, propertyValue);
        }
    }

    public setElementAttribute(renderElement: Element, attributeName: string, attributeValue: string) {
        this.consoleLog('setElementAttribute', arguments);
        renderElement.setAttribute(attributeName, attributeValue);
    }

    /**
     * Used only in debug mode to serialize property changes to comment nodes,
     * such as <template> placeholders.
     */
    public setBindingDebugInfo(renderElement: Element, propertyName: string, propertyValue: string) {
        this.consoleLog('setBindingDebugInfo', arguments);
    }

    public setElementClass(renderElement: Element, className: string, isAdd: boolean) {
        this.consoleLog('setElementClass', arguments);
    }

    public setElementStyle(renderElement: Element, styleName: string, styleValue: string) {
        this.consoleLog('setElementStyle', arguments);
    }

    public invokeElementMethod(renderElement: Element, methodName: string, args: any[]) {
        this.consoleLog('invokeElementMethod', arguments);
    }

    public setText(renderNode: Element, text: string) {
        this.consoleLog('setText', arguments);
    }

    public setElementDebugInfo(renderElement: Element, info: any) {
        //
    }

    public animate(element: any, startingStyles: any, keyframes: any, duration: number, delay: number, easing: string): any {
        return null;
    };

    private consoleLog(text: string, args: any) {
        if (window.fusejs) {
            //console.log(text);
        } else {
            // tslint:disable-next-line:no-console
            window.console.log(text, args);
        }
    }

}
