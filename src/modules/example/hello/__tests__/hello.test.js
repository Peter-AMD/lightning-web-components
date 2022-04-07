import { createElement } from 'lwc';
import Hello from 'example/hello';

describe('hello', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays greeting specified by input', () => {
        const EXPECTED = 'Test';

        // Create element
        const element = createElement('example-hello', {
            is: Hello
        });
        document.body.appendChild(element);

        // Verify default greeting
        let h1 = element.shadowRoot.querySelector('h1');
        expect(h1.textContent).not.toBe(`Hello, ${EXPECTED}!`);

        // Trigger new greeting
        const inputEl = element.shadowRoot.querySelector('input');
        inputEl.value = EXPECTED;
        inputEl.dispatchEvent(new CustomEvent('input'));

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Verify displayed greeting
            expect(h1.textContent).toBe(`Hello, ${EXPECTED}!`);
        });
    });
});