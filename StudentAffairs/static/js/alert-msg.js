const Alert = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'OK',
            onok: function () {},
        }, options);
        
        const html = `
            <div class="alert">
                <div class="alert__window">
                    <div class="alert__titlebar">
                        <span class="alert__title">${options.title}</span>
                    </div>
                    <div class="alert__content">${options.message}</div>
                    <div class="alert__buttons">
                        <button class="alert__button alert__button--ok alert__button--fill">${options.okText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;

        // Elements
        const alertEl = template.content.querySelector('.alert');
        const btnOk = template.content.querySelector('.alert__button--ok');

        alertEl.addEventListener('click', e => {
            if (e.target === alertEl) {
                this._close(alertEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(alertEl);
        });

        document.body.appendChild(template.content);
    },

    _close (alertEl) {
        alertEl.classList.add('alert--close');

        alertEl.addEventListener('animationend', () => {
            document.body.removeChild(alertEl);
        });
    }
};
