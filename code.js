/**
 * This is the class that controls each instance of your custom element.
 */
class IconCode extends HTMLElement {
    /**
     * The template that is used for the shadow root for every copy of your element,
     * which houses the styles and layout for the element.
     */
    static get template() {
        if(IconCode.__template) {
            return IconCode.__template;
        }

        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: 1.5em;
                    height: 1.5em;
                }

                svg:not(.animate) polyline:nth-of-type(1),
                svg:not(.animate) polyline:nth-of-type(2),
                svg:not(.animate) line:nth-of-type(2) {
                    opacity: 0;
                }

                /* left carrot */
                svg:not(.animate) polyline:nth-of-type(1) {
                    transform: translateX(50%);
                }

                .animate polyline:nth-of-type(1) {
                    animation: leftCarrot 600ms ease forwards;
                }

                /* right carrot */
                polyline:nth-of-type(2) {
                    transform: translateX(-50%);
                }

                .animate polyline:nth-of-type(2) {
                    animation: rightCarrot 600ms ease forwards;
                }

                /* dividing line/forwardslash */
                line:nth-of-type(2) {
                    transition: opacity 300ms ease,
                        transform 300ms ease;
                    transition-delay: 300ms;
                    transform-origin: center;
                }

                svg:not(.animate) line:nth-of-type(2) {
                    transform: rotateZ(-16deg);
                }

                @keyframes leftCarrot {
                    0% {
                        opacity: 0;
                        transform: translateX(50%);
                    }

                    50% {
                        opacity: 1;
                        transform: translateX(50%);
                    }

                    100% {
                        transform: translateX(0%);
                    }
                }

                @keyframes rightCarrot {
                    0% {
                        opacity: 0;
                        transform: translateX(-50%);
                    }

                    50% {
                        opacity: 1;
                        transform: translateX(-50%);
                    }

                    100% {
                        transform: translateX(0%);
                    }
                }
            </style>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131 114.56"><defs><style>.cls-1{fill:#282d33;}.cls-1,.cls-2{stroke:#282d33;stroke-width:5px;}.cls-2{fill:none;}</style></defs><title>icon-website</title><g id="Layer_2" data-name="Layer 2"><g id="Icons"><path class="cls-1" d="M125,2.5H6A3.47,3.47,0,0,0,2.5,6V80.54h126V6A3.48,3.48,0,0,0,125,2.5Zm-6.53,67.84H12.35V12.63H118.48Z"/><path class="cls-2" d="M2.51,80.47V91.22c0,2.06,2.08,4.36,4.12,4.36H125.25c2,0,3.25-2.12,3.25-4.18V80.47Z"/><path class="cls-2" d="M51.49,95.66c-.22,2.67.25,8.62-.32,11.52-.52,2.66-.88,2.75-2.28,3.53-.79.44-2.12,1-3.23,1.53h0"/><path class="cls-2" d="M85.21,112.27c-1.12-.49-2.47-1.11-3.27-1.55-1.39-.78-1.67-.87-2.19-3.53-.57-2.91-.1-8.7-.32-11.38"/><line class="cls-2" x1="42.21" y1="112.04" x2="88.81" y2="112.04"/><polyline class="cls-2" points="52.09 55.38 44.22 49.07 36.34 42.77 44.22 36.46 52.09 30.15"/><polyline class="cls-2" points="78.91 55.38 86.78 49.07 94.66 42.77 86.78 36.46 78.91 30.16"/><line class="cls-2" x1="71.69" y1="23.07" x2="60.33" y2="62.46"/></g></g></svg>
        `;

        IconCode.__template = template;

        return template;
    }

    /**
     * Part of the custom element spec. Returns an array of strings that are 
     * the names of attributes that this element observes/listens to.
     * 
     * @returns {Array} an array of strings, each of which representing an 
     *  attribute.
     */
    static get observedAttributes() {
        return ["animate"];
    };

    constructor() {
        super();

        // create shadow root for any children context
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(IconCode.template.content.cloneNode(true));

        // add any initial variables here
        this.finishedAnimating = false;
    }

    /**
     * Animates the icon to its final position.
     */
    animate() {
        if(this.finishedAnimating) {
            return false;
        }

        const svg = this.shadowRoot.querySelector("svg");

        svg.classList.add("animate");

        this.finishedAnimating = true;
        return true;
    }

    /**
     * Resets the animation on the icon
     */
    reset() {
        if(!this.finishedAnimating) {
            return false;
        }

        const svg = this.shadowRoot.querySelector("svg");

        svg.classList.remove("animate");

        this.finishedAnimating = false;
        return true;
    }

    /**
     * Part of the custom element spec. Called after your element is attached to
     * the DOM. Do anything related to the element or its children here in most
     * cases.
     */
    connectedCallback() {
        
    }

    /**
     * Part of the custom element spec. Called after your element is remove from
     * the DOM. Disconnect any listeners or anything else here.
     */
    disconnectedCallback() {

    }

    /**
     * Part of the custom element spec. Called when one of the observed
     * attributes changes, either via setAttribute() or with the attribute being
     * manually set in the HTML.
     * 
     * @param {String} name the name of the attribute that changed
     * @param {Mixed} oldValue the previous value of the attribute
     * @param {Mixed} newValue the new value of the attribute
     */
    attributeChangedCallback(name, oldValue, newValue) {
        const hasValue = newValue != null;
        
        if(hasValue) {
            this.animate();
        } else {
            this.reset();
        }
    }
}

customElements.define("icon-code", IconCode);
