import helloWorld from './hello-world';
import { modelDirective } from './directives/model';

const components = [
    helloWorld
];

const directives = [
    {
        selector: 'fw-model',
        action: modelDirective
    }
];

class Init {
    constructor() {
        components.forEach((component) => this.registerComponent(component));
    }

    registerComponent(component) {
        let element;
        if (component.el) {
            element = document.querySelector(component.el);
            element.innerHTML = component.template;
        }
        if (component.el && component.data) {
            this.bindData(component, element);
        }
        component.afterBind();
    }

    registerDirectives(directive, data) {
        const elements = document.querySelectorAll(`[${directive.selector}]`);
        elements.forEach((element) => {
            directive.action(element, element.getAttribute(directive.selector), data);
        });
    }

    bindData(component, element) {
        const proxySetter = (obj, prop, value) => {
            const data = {};
            data[prop] = value;
            this.bindDataVariables(element, component.template, data)
            return value;
        };

        const proxyTemplate = {
            set: proxySetter
        };

        component.data = new Proxy(component.data, proxyTemplate)
        this.bindDataVariables(element, component.template, component.data)
        directives.forEach((directive) => this.registerDirectives(directive, component.data));
    }

    bindDataVariables(element, template, data) {
        for (let index in data) {
            let regex = new RegExp(`{{ ${index} }}`, 'g')
            template = template.replace(regex, data[index]);
        }
        element.innerHTML = template;
    }
}

new Init();
