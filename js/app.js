document.addEventListener('DOMContentLoaded', function () {

    let form = document.getElementById('todo-form');
    let input = document.getElementById('todo-input');
    let errorMsg = document.getElementById('error-msg');
    let list = document.getElementById('todo-list');
    let counter = document.getElementById('counter');
    let filterAll = document.getElementById('filter-all');
    let filterActive = document.getElementById('filter-active');
    let filterDone = document.getElementById('filter-done');

    let currentFilter = 'all'; // remembers which filter button was last presse
    //remember wether its done or active

    function applyFilter() {
        let items = list.children;
        for (let i = 0; i < items.length; i++) {
            let isDone = items[i].classList.contains('completed');
            if (currentFilter === 'active' && isDone) {
                items[i].style.display = 'none';
            } else if (currentFilter === 'done' && !isDone) {
                items[i].style.display = 'none';
            } else {
                items[i].style.display = '';
            }
        }
    }

    function updateCounter() {
        let items = list.children;
        let left = 0;
        for (let i = 0; i < items.length; i++) {
            if (!items[i].classList.contains('completed')) {
                left++;
            }
        }
        if (left === 1) {
            counter.textContent = `${left} item left`;
        } else {
            counter.textContent = `${left} items left`;
        }
    }

    function updatePage() {
        applyFilter();
        updateCounter();
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // question 2 ans
        let text = input.value.trim(); //question 1 ans

        if (text === '') {
            errorMsg.classList.remove('hidden');
            return;
        }
        errorMsg.classList.add('hidden');

        let li = document.createElement('li'); // Q3

        let span = document.createElement('span');
        span.className = 'item-text';
        span.textContent = text;
        let deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
        input.value = '';
        updatePage();
    });

    list.addEventListener('click', function (e) {
        let clicked = e.target;
        if (clicked.classList.contains('delete-btn')) {
            let li = clicked.parentNode;
            list.removeChild(li);
        } else if (clicked.classList.contains('item-text')) {
            let li = clicked.parentNode;
            li.classList.toggle('completed');
        }
        updatePage();
    });

    filterAll.addEventListener('click', () => { currentFilter = 'all'; updatePage(); });
    filterActive.addEventListener('click', () => { currentFilter = 'active'; updatePage(); });
    filterDone.addEventListener('click', () => { currentFilter = 'done'; updatePage(); });

    updatePage();
});