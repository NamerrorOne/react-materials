class Observable {
    _observers = [];

    attach(observer) {
        this._observers.push(observer);
    }

    detach(observer) {
        this._observers = this._observers.filter(element =>element !== observer );
    }

    notifyObservers() {
        this._observers.forEach((observer)=>observer.update());
    }
}


class Observer {
    update() {}
}

class Publisher extends Observable{
    _postText = "";
    _textarea = null;

    constructor(name) {
        super();
        this._textarea = document.forms[name].getElementsByTagName('textarea')[0];

        this._textarea.addEventListener('input',() => {
            this.setPostText();
        });
    }

    setPostText() {
        this._postText = this._textarea.value;
        this.notifyObservers();
    }

    getPostText() {
        return this._postText;
    }
}

class Reader extends Observer {
    _contentArea = null;
    _publisher = null;

    constructor(id) {
        super();
        this._contentArea = document.getElementById(id).getElementsByClassName("readers__publisher-content")[0];
    }

  
    update() {
        this._contentArea.innerHTML = this._publisher.getPostText();
        console.log(this._contentArea)
    }

    subscribe(publisher) {
        this._publisher = publisher;
    }

    unsubscribe() {
        this._publisher = null;
    }

}

const mainForm = new Publisher("main-form");
const reader1 = new Reader("Roma");
const reader2 = new Reader("Ivan");
const reader3 = new Reader("Arthur");

mainForm.attach(reader1);
mainForm.attach(reader3);
reader1.subscribe(mainForm);
reader2.subscribe(mainForm);
reader3.subscribe(mainForm);

