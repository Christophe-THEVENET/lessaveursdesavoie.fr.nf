import React from 'react';
import { createRoot } from 'react-dom/client';

const Test = () => {
    return <div className="test">En construction ...</div>;
};

class TestElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Test />);
    }
}
customElements.define('test-component', TestElement);
