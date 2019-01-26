import { Injectable, Inject } from "@angular/core";
import { Title, DOCUMENT } from "@angular/platform-browser";
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { StringUtils } from '../utils/string.utils';


// O decorator Injectable faz com que esta classe se torne injetável
@Injectable()
export class SeoService {
    private titleService: Title;
    private headElement: HTMLElement;
    private metaDescription: HTMLElement;
    private metaKeywords: HTMLElement;
    private robots: HTMLElement;
    private DOM: any;

    public constructor(titleService: Title, @Inject(DOCUMENT) private document) {
        this.titleService = titleService;
        this.DOM = getDOM();
        this.headElement = this.document.querySelector('head');
        this.setTitle('');
    }

    public setSeoData(seoModel: SeoModel) {
        this.setTitle(seoModel.title);
        this.setMetaRobots(seoModel.robots);
        this.setMetaDescription(seoModel.description);
        this.setMetaKeywords(seoModel.keywords);
    }
    
    private setTitle(newTitle: string) {
        if(StringUtils.isNullOrEmpty(newTitle)) {newTitle = "Defina um Título"}
        this.titleService.setTitle(newTitle + " - Eventos.IO");
    }

    private setMetaDescription(description: string) {
        if(StringUtils.isNullOrEmpty(description)) {description = "Aqui vc encontra um evento técnico próximo de você"}
        this.metaDescription = this.getOrCreateMetaElement('description');
        this.metaDescription.setAttribute('content', description);
    }

    private setMetaKeywords(keywords: string) {
        if(StringUtils.isNullOrEmpty(keywords)) {keywords = "eventos,workshops,encontros,congressos,comunidades,tecnologia"}
        this.metaKeywords = this.getOrCreateMetaElement('keywords');
        this.metaKeywords.setAttribute('content', keywords);
    }

    private setMetaRobots(robots: string) {
        // all = informação padrão, não define que quero ou que não quero
        if(StringUtils.isNullOrEmpty(robots)) {robots = "all"}
        this.robots = this.getOrCreateMetaElement('robots');
        this.robots.setAttribute('content', robots);
        this.robots.setAttribute('content', robots);
    }

    private getOrCreateMetaElement(name: string): HTMLElement {
        let el: HTMLElement;
        el = this.document.querySelector('meta[name=' + name + ']');
        if (el === null) {
            el = this.DOM.createElement('meta');
            el.setAttribute('name',name);
            this.headElement.appendChild(el);
        }
        return el;
    }

}



export class SeoModel {
    public title: string = '';
    public robots: string = '';
    public keywords: string = '';
    public description: string = '';
}