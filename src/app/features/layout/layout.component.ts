const tmplLayout: HTMLTemplateElement = document.createElement('template');
tmplLayout.innerHTML = `
		<style>
				app-layout {
						font-size: 1rem;
						display: flex;
						flex-direction: column;
						margin-bottom: .75rem;
				}
		</style>
		<button class="c-btn-tool" id="sc-layout__tool-btn">
				<div class="c-btn-tool__picto"></div>
				<span class="c-btn-tool__label" data-i18n="layout"></span>
				<div class="c-btn-tool__picto"></div>
		</button>
		<div class="c-tool__content hidden" id="sc-layout__tool-content" data-i18n="wip">
		</div>
`;

class LayoutComponent extends HTMLElement {
	toolBtn: HTMLElement = null;

	open: boolean = false;

	constructor() {
		super();

		this.appendChild(tmplLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.toolBtn = this.querySelector('#sc-layout__tool-btn');
		const contentElt = this.querySelector('#sc-layout__tool-content');

		this.toolBtn?.addEventListener('click', () => {
			this.open = !this.open;

			if (this.open) {
				contentElt?.classList.remove('hidden');
			} else {
				contentElt?.classList.add('hidden');
			}
		});
	}

	disconnectedCallback(): void {
		this.toolBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-layout', LayoutComponent);
