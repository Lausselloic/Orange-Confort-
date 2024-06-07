const selectModeLayout: HTMLTemplateElement = document.createElement('template');
selectModeLayout.innerHTML = `
	<input type="radio" name="modes" class="sc-select-mode__input">
	<label class="d-flex flex-column align-items-start gap-1 p-1 sc-select-mode__label btn btn-tertiary">
		<div class="d-flex align-items-center gap-2">
			<app-icon data-size="2em"></app-icon>
			<span class="fs-5 text"></span>
		</div>
		<span class="fs-6 fw-normal m-0 mb-3"></span>
		<button class="btn btn-primary" type="submit"></button>
	</label>
`;

class SelectModeComponent extends HTMLElement {
	inputElement: HTMLInputElement = null;
	submitBtnElement: HTMLButtonElement = null;
	iconElement: HTMLElement = null;
	labelElement: HTMLLabelElement = null;
	textElement: HTMLElement = null;
	descriptionElement: HTMLParagraphElement = null;
	label = '';
	checked = false;
	disabled = false;

	constructor() {
		super();

		this.label = this.dataset?.label || this.label;
		this.checked = (this.dataset?.checked === 'true') || this.checked;
		this.disabled = (this.dataset?.disabled === 'true') || this.disabled;

		this.appendChild(selectModeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.inputElement = this.querySelector('input');
		this.submitBtnElement = this.querySelector('button');
		this.labelElement = this.querySelector('label');
		this.iconElement = this.querySelector('app-icon');
		this.textElement = this.querySelector('div span');
		this.descriptionElement = this.querySelector('label > span');

		this.inputElement!.id = stringServiceInstance.normalizeID(this.label);
		this.inputElement!.value = this.label;
		this.inputElement!.checked = this.checked;
		this.inputElement!.disabled = this.disabled;
		this.submitBtnElement.innerText = i18nServiceInstance.getMessage('validateThisMode');
		this.labelElement?.setAttribute('for', stringServiceInstance.normalizeID(this.label));
		this.iconElement?.setAttribute('data-name', `${this.label}_border`);
		this.textElement!.innerText = i18nServiceInstance.getMessage(`${this.label}Name`);
		this.descriptionElement!.innerText = i18nServiceInstance.getMessage(`${this.label}Description`);
	}
}

customElements.define('app-select-mode', SelectModeComponent);
