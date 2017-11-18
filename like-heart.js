/**
 * The template that is used for the shadow root for every copy of your element,
 * which houses the styles and layout for the element.
 */
const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            width: 1.5em;
            height: 1.5em;
        }

        line {
            transition: transform var(--like-heart-click-speed, 300ms) ease-out;
            transition-delay: calc(var(--like-heart-anim-offset, 700ms) + (var(--like-heart-click-speed, 300ms) / 2));
        }

        line.cls-2 {
            stroke: var(--like-heart-line-color, #000);
        }

        path {
            transform-origin: center;
        }

        polygon.cls-2 {
            fill: #fff;
        }

        /* mouse pointer */
        .animate polygon {
            animation: iconMouseClick var(--like-heart-click-speed, 300ms) ease var(--like-heart-anim-offset, 700ms) forwards;
        }

        /* heart */
        .animate path {
            animation: iconHeartBeat var(--like-heart-click-speed, 300ms) ease var(--like-heart-anim-offset, 700ms) forwards;
        }

        svg:not(.animate) line:nth-of-type(1) {
            transform: translateY(450%);
        }

        svg:not(.animate) line:nth-of-type(2) {
            transform: translateY(400%) translateX(350%);
        }

        svg:not(.animate) line:nth-of-type(3) {
            transform: translateY(400%) translateX(425%);
        }

        svg:not(.animate) line:nth-of-type(4) {
            transform: translateX(425%);
        }

        svg:not(.animate) line:nth-of-type(5) {
            transform: translateX(425%) translateY(-400%);
        }

        svg:not(.animate) line:nth-of-type(6) {
            transform: translateX(450%) translateY(-450%);
        }

        svg:not(.animate) line:nth-of-type(7) {
            transform: translateY(-450%);
        }

        svg:not(.animate) line:nth-of-type(8) {
            transform: translateX(-450%);
        }

        svg:not(.animate) line:nth-of-type(9) {
            transform: translateX(-425%) translateY(300%);
        }

        svg:not(.animate) line:nth-of-type(10) {
            transform: translateX(-350%) translateY(425%);
        }
        
        @keyframes iconMouseClick {
            0% {
                transform: translateX(0%) translateY(0%);
            }
        
            50% {
                transform: translateX(-50%) translateY(-50%);
            }
        
            100% {
                transform: translateX(0%) translateY(0%);
            }
        }
        
        @keyframes iconHeartBeat {
            0% {
                transform: scale(1);
            }
        
            50% {
                transform: scale(0.75);
                fill: #000;
            }
        
            100% {
                transform: scale(1);
                fill: var(--like-heart-heart-color, #000);
            }
        }        
    </style>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" class="icon"><defs><style>.cls-1{fill:#282d33;}.cls-2{fill:none;stroke:#282d33;stroke-width:5px;}</style></defs><title>Like Heart Icon</title><g id="Layer_2" data-name="Layer 2"><g id="Icons"><line class="cls-2" x1="64.01" x2="64.01" y2="13.4"/><line class="cls-2" x1="31.64" y1="9.2" x2="38.34" y2="20.81"/><line class="cls-2" x1="8.21" y1="33.36" x2="19.81" y2="40.06"/><line class="cls-2" y1="65.99" x2="13.4" y2="65.99"/><line class="cls-2" x1="9.21" y1="98.36" x2="20.81" y2="91.66"/><line class="cls-2" x1="33.36" y1="121.79" x2="40.06" y2="110.18"/><line class="cls-2" x1="65.99" y1="130" x2="65.99" y2="116.6"/><line class="cls-2" x1="130" y1="64" x2="116.6" y2="64"/><line class="cls-2" x1="120.79" y1="31.64" x2="109.19" y2="38.34"/><line class="cls-2" x1="96.64" y1="8.21" x2="89.94" y2="19.81"/><path class="cls-1" d="M92.65,75.12l2-2a19,19,0,0,0,0-26.86l-.28-.28a19,19,0,0,0-26.86,0l-2,2-2-2a19,19,0,0,0-26.86,0l-.28.28a19,19,0,0,0,0,26.86l2,2,27.14,27.14Z"/><polygon class="cls-2" points="119.94 94.02 101.3 87.69 82.65 81.37 88.98 100.02 95.3 118.66 99.8 106.9 112.4 119.5 120.78 111.12 108.18 98.52 119.94 94.02"/></g></g></svg>    
`;

/**
 * This is the class that controls each instance of your custom element.
 */
class LikeHeart extends HTMLElement {
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
        this.shadowRoot.appendChild(template.content.cloneNode(true));

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

customElements.define("icon-like-heart", LikeHeart);
