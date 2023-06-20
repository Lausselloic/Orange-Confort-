const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<style>
    .c-reading-guide {
        background: rgba(0, 0, 0, .5);
        position: fixed;
        left: 0;
        right: 0;
        z-index: 99999;
    }
    .c-reading-guide--top {
        top: 0;
    }
    .c-reading-guide--bottom {
        bottom: 0;
    }
    .c-reading-guide__close-msg {
        color: white;
        font-weight: 700;
        padding: 1rem;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .c-reading-guide__close-btn {
        width: 80px;
        height: 80px;
        position: absolute;
        right: 0;
        bottom: -80px;
    }
</style>
<button id="reading-guide-btn">Guide de lecture</button>
<div id="top-guide-elt" class="c-reading-guide c-reading-guide--top">
    <span class="c-reading-guide__close-msg">Fermeture du masque: touche Echape</span>
    <button id="close-btn" class="c-reading-guide__close-btn">Close</button>
</div>
<div id="bottom-guide-elt" class="c-reading-guide c-reading-guide--bottom"></div>
`;

class ReadingGuideComponent extends HTMLElement {
    open: boolean = false;
    sizeGuide: number = 40;

    shadow: ShadowRoot = this.attachShadow({mode: 'open'});
    topGuideElt: HTMLElement | null = null;
    bottomGuideElt: HTMLElement | null = null;
    closeBtn: HTMLElement | null = null;

    constructor() {
        super();

        this.shadow.appendChild(tmplReadingGuide.content.cloneNode(true));

        const activeGuideBtn: HTMLElement | null = this.shadow.getElementById('reading-guide-btn');
        this.topGuideElt = this.shadow.getElementById('top-guide-elt');
        this.bottomGuideElt = this.shadow.getElementById('bottom-guide-elt');
        this.closeBtn = this.shadow.getElementById('close-btn');

        if (this.topGuideElt && this.bottomGuideElt) {
            this.topGuideElt.style.display = 'none';
            this.bottomGuideElt.style.display = 'none';
        }

        activeGuideBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (!this.open) {
                this.resetReadingGuide();
                return;
            }

            if (this.topGuideElt && this.bottomGuideElt) {
                this.topGuideElt.style.removeProperty('display');
                this.bottomGuideElt.style.removeProperty('display');
            }
        });

        this.closeBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (!this.open) {
                this.resetReadingGuide();
            }
        });

        document.onkeydown = (event) => {
            if (event.code === 'Escape') {
                this.open = !this.open;
                this.resetReadingGuide();
            }
        }

        document.addEventListener('mousemove', (event: MouseEvent) => {
            if (this.open && this.topGuideElt && this.bottomGuideElt) {
                this.topGuideElt.style.height = `${ event.y - this.sizeGuide }px`;
                this.bottomGuideElt.style.height = `${ window.innerHeight - event.y - this.sizeGuide }px`;
            }
            event.stopPropagation();
        });
    }

    private resetReadingGuide(): void {
        if (this.topGuideElt && this.bottomGuideElt) {
            this.topGuideElt.style.display = 'none';
            this.bottomGuideElt.style.display = 'none';

            this.topGuideElt.style.removeProperty('height');
            this.bottomGuideElt.style.removeProperty('height');
        }
    }
}
customElements.define('app-reading-guide', ReadingGuideComponent);
