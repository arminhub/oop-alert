class Alert {
    constructor(eingabe) {
        this.body = document.querySelector('body');
        this.eingabe = eingabe;
    }

    openModal() {
        const formattedEingabe = this.formatEingabe(this.eingabe.value);

        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        this.modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Alert (${this.typeOfEingabe})</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p></p>
                    </div>
                </div>
            </div>
        `;
        this.body.appendChild(this.modal);

        this.modalBody = this.modal.querySelector('.modal-body p');
        this.closeBtn = this.modal.querySelector('.btn-close');

        this.modalBody.innerHTML = formattedEingabe;
        this.modal.style.display = 'block';

        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
            this.resetHandler();
        });
    }

    closeModal() {
        this.modal.remove();
    }

    resetHandler() {
        this.eingabe.value = '';
    }

    formatEingabe(eingabe) {

        if (eingabe.includes('{')) {

            this.typeOfEingabe = 'Object';

            let properties = eingabe.trim().slice(1, -1);
            properties = properties.split(',');
            let obj = {};
            properties.forEach(function (property) {
                let el = property.split(':');
                obj[el[0]] = el[1];
            });


            let formatted = `
            <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ${eingabe}
            </button>
            <ul class="dropdown-menu">
            `;
            for (const key in obj) {
                const value = obj[key];
                formatted += `<li class="dropdown-item">${key}: ${value}</li>`;
            }

            formatted += `
            </ul>
            </div>`;
            return formatted;

        }
        else if (eingabe.includes('[')) {
            this.typeOfEingabe = 'Array';

            let properties = eingabe.trim().slice(1, -1);
            let arr = properties.split(',');

            let formatted = `
            <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${eingabe} (${arr.length})
            </button>
            <ul class="dropdown-menu">
            `;
            arr.forEach(function (property) {
                formatted += `<li class="dropdown-item">${arr.indexOf(property)}: ${property}</li>`;
            })

            formatted += `
            </ul>
            </div>`;
            return formatted;
        }
        else if (eingabe.includes('<')) {
            this.typeOfEingabe = 'HTML';
            return eingabe;
        }
        else {
            this.typeOfEingabe = 'String';
            return eingabe;
        }
    }
}

// Alert Generieren (eine Instanz von Alert)
document.querySelector('#btn').addEventListener('click', function () {

    let userEingabe = document.querySelector('#eingabe');

    if (userEingabe.value == '') {
        userEingabe.classList.add('is-invalid');
    }
    else {
        userEingabe.classList.remove('is-invalid');
        let meinAlert = new Alert(userEingabe);
        meinAlert.openModal();
    }
});

// PlaceHolders
let placeHolderList = [
    'Beispiel: <b>Hallo Welt.</b>',
    'Beispiel: [1, 2, 3, 4, 5]',
    'Beispiel: { name: "Max", age: 30 }',
    'Beispiel: Hallo Welt.'
];
let inputElement = document.querySelector('#eingabe');
let index = 0;

const placeHolder = () => {
    inputElement.placeholder = placeHolderList[index];
    index = (index + 1) % placeHolderList.length;
}
setInterval(placeHolder, 2000);